# Мета-слой для запуска руками. Источник правды — сами сервисы:
# projects/api/package.json, projects/mobile/package.json, projects/montage/docs/running.md.
# Здесь только короткие имена; своего эти цели не делают ничего — кроме db и test-montage,
# которые заводят себе базу: их с этим никто больше не сведёт.
#
# Postgres — постоянный контейнер на localhost:5432, поднятый вручную и не входящий в этот
# стенд: make его не поднимает и не гасит, только подключается и заводит в нём базу `remember`.

DATABASE_URL ?= postgres://postgres:postgres@localhost:5432/remember
# Своя база для тестов воркера, на том же Postgres. Они чистят jobs и разбирают очередь целиком,
# так что общая с `make up` база означала бы драку за очередь с живым воркером. Выводится из
# DATABASE_URL, чтобы другой порт или другой стенд уводил за собой и тесты, а не только стенд.
TEST_DATABASE_URL ?= $(DATABASE_URL)_test
# Хост стенда — один и тот же для api и для хранилища. Он уезжает не только в приложение: api
# подписывает им ссылки на медиа, а подпись покрывает адрес — переписать его потом нельзя. С
# localhost телефон не покажет ни кадра и ничего не загрузит, поэтому для телефона тут стоит
# адрес мака в сети: `make phone` подставляет его сам, руками — make up HOST=192.168.1.125
HOST ?= localhost
# Адрес api на стенде один на всех: его получает приложение, по нему же воркер стучится о
# готовом ролике.
API_URL ?= http://$(HOST):3000
EXPO_PUBLIC_API_URL ?= $(API_URL)
PY := projects/montage/.venv/bin/python

# Хранилище стенда — локальный MinIO из docker-compose, значения те же, что в
# projects/montage/.env.example. Их получают оба: воркер (он читает только окружение) и api —
# переданное окружением сильнее его .env. Врозь им нельзя: api подписывает ссылки тем адресом,
# по которому воркер кладёт превью, и разойдись они — ссылки ведут в пустой бакет. Другое
# хранилище — make up R2='R2_ENDPOINT=… R2_BUCKET=… R2_ACCESS_KEY_ID=… R2_SECRET_ACCESS_KEY=…'
R2 ?= R2_ENDPOINT=http://$(HOST):9000 R2_BUCKET=remember R2_ACCESS_KEY_ID=remember R2_SECRET_ACCESS_KEY=remember-secret

# Воркер читает только окружение, а ключ облачной модели и общий секрет стука человек держит в
# .env (файлы в репозиторий не попадают) — вот мы их оттуда и вносим: AI_PROVIDER/GEMINI_*/OPENAI_*
# для модели, API_URL и INTERNAL_WORKER_TOKEN для стука «ролик готов». Сначала
# projects/montage/.env, чего нет там — из projects/api/.env: секрет api читает оттуда сам, значит
# лежит он в одном файле и разойтись двум сторонам нечем. Заданное в окружении сильнее файла;
# адреса нет нигде — берётся API_URL выше; секрета нет нигде — воркер, как и сейчас, пишет в лог,
# что ролик готов и сказать об этом некому (сам ролик собирается в любом случае). Тестов это не
# касается: в сеть они не ходят.
WORKER_ENV = eval "$$(sed -nE 's/^((AI|GEMINI|OPENAI)_[A-Z_]+|API_URL|INTERNAL_WORKER_TOKEN)=(.*)/export \1="$${\1:-\3}"/p' .env ../api/.env 2>/dev/null)" && export API_URL="$${API_URL:-$(API_URL)}" &&

.DEFAULT_GOAL := help
.PHONY: help install up phone down logs _kill db db-stop api migrate worker worker-init mobile sim test test-api test-mobile test-montage check

help: ## показать этот список
	@grep -hE '^[a-z-]+:.*?## ' $(MAKEFILE_LIST) | awk -F':.*?## ' '{printf "  make %-14s %s\n", $$1, $$2}'

install: ## поставить зависимости всех трёх сервисов
	cd projects/api && npm install
	cd projects/mobile && npm install
	python3 -m venv projects/montage/.venv && $(PY) -m pip install -r projects/montage/requirements.txt

# Перед запуском — музыку библиотеки в бакет (`worker.py tracks`): без неё «Послушать» на экране
# музыки молчит. Команда идемпотентна, лежащее не перезаливает; не вышла — говорим, стенд поднимаем.
up: _kill db migrate ## поднять всё разом: база, API, воркер, приложение
	@mkdir -p .run
	@( cd projects/montage && DATABASE_URL='$(DATABASE_URL)' $(R2) .venv/bin/python -m montage tracks ) > .run/tracks.log 2>&1 || echo "!! музыка не выложена в хранилище, «Послушать» не заиграет — смотри .run/tracks.log"
	@set -m; ( cd projects/api && $(R2) npm run dev ) < /dev/null > .run/api.log 2>&1 & echo $$! > .run/api.pid
	@set -m; ( cd projects/montage && $(WORKER_ENV) DATABASE_URL='$(DATABASE_URL)' $(R2) .venv/bin/python -m montage run ) < /dev/null > .run/worker.log 2>&1 & echo $$! > .run/worker.pid
	@set -m; ( cd projects/mobile && EXPO_PUBLIC_API_URL='$(EXPO_PUBLIC_API_URL)' npm start ) < /dev/null > .run/mobile.log 2>&1 & echo $$! > .run/mobile.pid
	@sleep 3; for n in api worker mobile; do \
		kill -0 $$(cat .run/$$n.pid) 2>/dev/null || echo "!! $$n упал сразу после запуска — смотри .run/$$n.log"; \
	done
# Симулятор — только когда стенд на localhost: для телефона он лишний, приложение открывают на нём.
	@[ '$(HOST)' = localhost ] && $(MAKE) sim || true
	@echo 'поднято: api, воркер, приложение. логи — make logs, погасить — make down'

# Телефон не знает слова localhost — ни для сервера, ни для хранилища. Адрес мака в сети берётся
# с Wi-Fi (en0) или с кабеля (en1), а не зашивается: сеть у мака меняется. Свой — make phone
# HOST=192.168.1.125. Приложение с телефона открывается по адресу, который эта цель печатает.
phone: ## то же, что up, но стенд виден с телефона в той же сети
	@ip=$${HOST:-$$(ipconfig getifaddr en0 || ipconfig getifaddr en1)}; \
	[ -n "$$ip" ] || { echo "!! мака нет в локальной сети (en0/en1) — включи Wi-Fi или задай make phone HOST=адрес"; exit 1; }; \
	$(MAKE) up HOST=$$ip && echo "с телефона: приложение — exp://$$ip:8081 (Expo Go) или http://$$ip:8081 (dev-билд), сервер — http://$$ip:3000"

down: _kill db-stop ## погасить всё

logs: ## смотреть логи поднятого (Ctrl-C — выйти)
	tail -f .run/*.log

_kill:
	@for f in .run/*.pid; do [ -f "$$f" ] || continue; kill -- -$$(cat $$f) 2>/dev/null || true; done; rm -f .run/*.pid

db: ## поднять локальное хранилище, завести базу в постоянном Postgres
	cd projects/api && docker compose up -d --wait
	@DB_URL='$(DATABASE_URL)' $(PY) -c 'import os,psycopg,urllib.parse as u;from psycopg import sql;p=u.urlparse(os.environ["DB_URL"]);n=p.path.lstrip("/");c=psycopg.connect(u.urlunparse(p._replace(path="/postgres")),autocommit=True);c.execute("SELECT 1 FROM pg_database WHERE datname=%s",(n,)).fetchone() or c.execute(sql.SQL("CREATE DATABASE {}").format(sql.Identifier(n)))'

db-stop: ## погасить локальное хранилище (Postgres — свой, постоянный, его не трогаем)
	cd projects/api && docker compose down

migrate: ## накатить миграции API
	cd projects/api && npm run migrate

api: ## запустить API в режиме разработки
	cd projects/api && $(R2) npm run dev

worker-init: ## создать таблицу задач для воркера
	cd projects/montage && DATABASE_URL='$(DATABASE_URL)' .venv/bin/python -m montage init

worker: ## запустить воркер
	cd projects/montage && $(WORKER_ENV) DATABASE_URL='$(DATABASE_URL)' $(R2) .venv/bin/python -m montage run

mobile: ## запустить приложение (Expo)
	cd projects/mobile && EXPO_PUBLIC_API_URL='$(EXPO_PUBLIC_API_URL)' npm start

sim: ## открыть симулятор iOS (если ещё не запущен) и открыть в нём приложение
	@xcrun simctl list devices booted | grep -q Booted || xcrun simctl boot "$$(xcrun simctl list devices available | grep -m1 iPhone | grep -oE '[0-9A-F-]{36}')"
	@open -a Simulator 2>/dev/null || open "$$(dirname "$$(xcode-select -p)")/Applications/DeviceHub.app"
	@sleep 2; xcrun simctl openurl booted "exp://127.0.0.1:8081" 2>/dev/null || true

test: test-api test-mobile test-montage ## прогнать все тесты

test-api: ## тесты API
	cd projects/api && npm test

test-mobile: ## тесты приложения
	cd projects/mobile && npm test

test-montage: ## тесты воркера (в своей базе, поднятому стенду не мешают)
	@DB_URL='$(DATABASE_URL)' TEST_DB_URL='$(TEST_DATABASE_URL)' $(PY) -c 'import os,psycopg,urllib.parse as u;from psycopg import sql;n=u.urlparse(os.environ["TEST_DB_URL"]).path.lstrip("/");c=psycopg.connect(os.environ["DB_URL"],autocommit=True);c.execute("SELECT 1 FROM pg_database WHERE datname=%s",(n,)).fetchone() or c.execute(sql.SQL("CREATE DATABASE {}").format(sql.Identifier(n)))'
	cd projects/api && DATABASE_URL='$(TEST_DATABASE_URL)' npm run migrate
	cd projects/montage && DATABASE_URL='$(TEST_DATABASE_URL)' $(R2) .venv/bin/python -m pytest

check: ## линт и типы
	cd projects/api && npm run lint && npm run typecheck
	cd projects/mobile && npm run lint && npm run typecheck
	cd projects/montage && .venv/bin/ruff check . && .venv/bin/ruff format --check .
