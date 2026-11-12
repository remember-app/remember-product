PUBLIC_HOST ?= localhost
MOCK ?= 0
HOST ?=
API_HOST = $(if $(HOST),$(HOST),localhost)
API_PORT = $(if $(filter 1,$(MOCK)),7300,3000)

.DEFAULT_GOAL := start

.PHONY: api montage mobile start start-mock db-fresh db-seed-essentials

api:
	@if [ "$(MOCK)" = "1" ]; then \
		docker compose up -d --build mock-api; \
	else \
		S3_PUBLIC_ENDPOINT=http://$(PUBLIC_HOST):9000 docker compose up -d --build api; \
	fi

montage:
	@if [ "$(MOCK)" = "1" ]; then \
		AI_ENDPOINT=http://mock-ai:8080/v1beta/interactions docker compose up -d --build mock-ai montage; \
	else \
		docker compose up -d --build montage; \
	fi

mobile:
	cd projects/mobile && EXPO_PUBLIC_API_URL=http://$(API_HOST):$(API_PORT) \
		npx expo start --dev-client $(if $(HOST),--lan,--ios)

start:
	$(MAKE) api montage PUBLIC_HOST=$(or $(HOST),$(PUBLIC_HOST))
	$(MAKE) mobile

start-mock:
	$(MAKE) api montage mobile MOCK=1 HOST=$(HOST)

db-fresh:
	docker exec postgres sh -c 'psql -U "$$POSTGRES_USER" -d "$$POSTGRES_DB" -c "drop schema public cascade; create schema public;"'
	docker compose run --rm --build deploy-worker node scripts/cicd/migrations/index.ts

db-seed-essentials:
	docker compose run --rm --build deploy-worker node scripts/cicd/seeds/index.ts
