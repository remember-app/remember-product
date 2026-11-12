PUBLIC_HOST ?= localhost
MOCK ?= 0
HOST ?=
API_PORT = $(if $(filter 1,$(MOCK)),7300,3000)

.DEFAULT_GOAL := start

.PHONY: api montage start start-mock start-mobile-local start-mobile-network db-fresh db-seed-essentials

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

start:
	$(MAKE) api montage PUBLIC_HOST=$(or $(HOST),$(PUBLIC_HOST))

start-mock:
	$(MAKE) api montage MOCK=1

start-mobile-local:
	cd projects/mobile && EXPO_PUBLIC_API_URL=http://localhost:$(API_PORT) \
		npx expo start --dev-client --ios

start-mobile-network:
	@ip=$${HOST:-$$(ipconfig getifaddr en0 || ipconfig getifaddr en1)}; \
	[ -n "$$ip" ] || { echo "no local network address (en0/en1)"; exit 1; }; \
	cd projects/mobile && EXPO_PUBLIC_API_URL=http://$$ip:$(API_PORT) \
		EXPO_PUBLIC_API_SERVER_OVERRIDE=$$ip \
		npx expo start --dev-client --lan

db-fresh:
	docker exec postgres sh -c 'psql -U "$$POSTGRES_USER" -d "$$POSTGRES_DB" -c "drop schema public cascade; create schema public;"'
	docker compose run --rm --build deploy-worker node scripts/cicd/migrations/index.ts

db-seed-essentials:
	docker compose run --rm --build deploy-worker node scripts/cicd/seeds/index.ts
