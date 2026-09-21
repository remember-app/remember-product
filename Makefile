# Мета-слой для запуска руками. Источник правды — сами сервисы:
# projects/api/package.json, projects/mobile/package.json, projects/montage/README.md.
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
EXPO_PUBLIC_API_URL ?= http://localhost:3000
PY := projects/montage/.venv/bin/python

# Воркер читает только окружение — .env он не открывает. Значения те же, что в
# projects/montage/.env.example: локальный MinIO из docker-compose. Другое хранилище —
# make worker R2='R2_ENDPOINT=… R2_BUCKET=… R2_ACCESS_KEY_ID=… R2_SECRET_ACCESS_KEY=…'
R2 ?= R2_ENDPOINT=http://localhost:9000 R2_BUCKET=remember R2_ACCESS_KEY_ID=remember R2_SECRET_ACCESS_KEY=remember-secret

# Облачная модель: ключ и поставщика человек держит в projects/montage/.env (файл в репозиторий
# не попадает), а воркер читает только окружение — вот мы их оттуда и вносим. Заданное в
# окружении сильнее: из файла берётся лишь то, чего там нет. Нет файла или нет строк — воркер
# идёт без модели, ровно как сейчас. Тестов это не касается: в сеть они не ходят.
AI = eval "$$(sed -nE 's/^((AI|GEMINI|OPENAI)_[A-Z_]+)=(.*)/export \1="$${\1:-\3}"/p' .env 2>/dev/null)" &&

.DEFAULT_GOAL := help
.PHONY: help install up down logs _kill db db-stop api migrate worker worker-init mobile sim test test-api test-mobile test-montage check

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
	@( cd projects/montage && DATABASE_URL='$(DATABASE_URL)' $(R2) .venv/bin/python worker.py tracks ) > .run/tracks.log 2>&1 || echo "!! музыка не выложена в хранилище, «Послушать» не заиграет — смотри .run/tracks.log"
	@set -m; ( cd projects/api && npm run dev ) < /dev/null > .run/api.log 2>&1 & echo $$! > .run/api.pid
	@set -m; ( cd projects/montage && $(AI) DATABASE_URL='$(DATABASE_URL)' $(R2) .venv/bin/python worker.py run ) < /dev/null > .run/worker.log 2>&1 & echo $$! > .run/worker.pid
	@set -m; ( cd projects/mobile && EXPO_PUBLIC_API_URL='$(EXPO_PUBLIC_API_URL)' npm start ) < /dev/null > .run/mobile.log 2>&1 & echo $$! > .run/mobile.pid
	@sleep 3; for n in api worker mobile; do \
		kill -0 $$(cat .run/$$n.pid) 2>/dev/null || echo "!! $$n упал сразу после запуска — смотри .run/$$n.log"; \
	done
	@$(MAKE) sim
	@echo 'поднято: api, воркер, приложение. логи — make logs, погасить — make down'

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
	cd projects/api && npm run dev

worker-init: ## создать таблицу задач для воркера
	cd projects/montage && DATABASE_URL='$(DATABASE_URL)' .venv/bin/python worker.py init

worker: ## запустить воркер
	cd projects/montage && $(AI) DATABASE_URL='$(DATABASE_URL)' $(R2) .venv/bin/python worker.py run

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
	cd projects/mobile && npm run typecheck
