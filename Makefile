# Мета-слой для запуска руками. Источник правды — сами сервисы:
# projects/api/package.json, projects/mobile/package.json, projects/montage/README.md.
# Здесь только короткие имена; ничего своего эти цели не делают.

DATABASE_URL ?= postgres://remember:remember@localhost:5432/remember
EXPO_PUBLIC_API_URL ?= http://localhost:3000
PY := projects/montage/.venv/bin/python

.DEFAULT_GOAL := help
.PHONY: help install up down logs _kill db db-stop api migrate worker worker-init mobile test test-api test-mobile test-montage check

help: ## показать этот список
	@grep -hE '^[a-z-]+:.*?## ' $(MAKEFILE_LIST) | awk -F':.*?## ' '{printf "  make %-14s %s\n", $$1, $$2}'

install: ## поставить зависимости всех трёх сервисов
	cd projects/api && npm install
	cd projects/mobile && npm install
	python3 -m venv projects/montage/.venv && $(PY) -m pip install -r projects/montage/requirements.txt

up: _kill db migrate ## поднять всё разом: база, API, воркер, приложение
	@mkdir -p .run
	@set -m; ( cd projects/api && npm run dev ) > .run/api.log 2>&1 & echo $$! > .run/api.pid
	@set -m; ( cd projects/montage && DATABASE_URL='$(DATABASE_URL)' .venv/bin/python worker.py run ) > .run/worker.log 2>&1 & echo $$! > .run/worker.pid
	@set -m; ( cd projects/mobile && EXPO_PUBLIC_API_URL='$(EXPO_PUBLIC_API_URL)' npm start ) > .run/mobile.log 2>&1 & echo $$! > .run/mobile.pid
	@echo 'поднято: api, воркер, приложение. логи — make logs, погасить — make down'

down: _kill db-stop ## погасить всё

logs: ## смотреть логи поднятого (Ctrl-C — выйти)
	tail -f .run/*.log

_kill:
	@for f in .run/*.pid; do [ -f "$$f" ] || continue; kill -- -$$(cat $$f) 2>/dev/null || true; done; rm -f .run/*.pid

db: ## поднять локальный Postgres (общий для api и montage)
	cd projects/api && docker compose up -d --wait

db-stop: ## погасить локальный Postgres
	cd projects/api && docker compose down

migrate: ## накатить миграции API
	cd projects/api && npm run migrate

api: ## запустить API в режиме разработки
	cd projects/api && npm run dev

worker-init: ## создать таблицу задач для воркера
	cd projects/montage && DATABASE_URL='$(DATABASE_URL)' .venv/bin/python worker.py init

worker: ## запустить воркер
	cd projects/montage && DATABASE_URL='$(DATABASE_URL)' .venv/bin/python worker.py run

mobile: ## запустить приложение (Expo)
	cd projects/mobile && EXPO_PUBLIC_API_URL='$(EXPO_PUBLIC_API_URL)' npm start

test: test-api test-mobile test-montage ## прогнать все тесты

test-api: ## тесты API
	cd projects/api && npm test

test-mobile: ## тесты приложения
	cd projects/mobile && npm test

test-montage: ## тесты воркера (чистят таблицу jobs в базе)
	cd projects/montage && DATABASE_URL='$(DATABASE_URL)' .venv/bin/python -m pytest

check: ## линт и типы
	cd projects/api && npm run lint && npm run typecheck
	cd projects/mobile && npm run typecheck
