PUBLIC_HOST ?= localhost
MOCK ?= 0
HOST ?=
EMAIL ?= dev@noxlabs.xyz
USERNAME ?= owner
NAME ?=
SONG ?=
API_PORT = $(if $(filter 1,$(MOCK)),7300,3000)

.DEFAULT_GOAL := start

.PHONY: api montage start start-mock start-mobile-local start-mobile-network db-fresh db-seed-essentials seed-first-user analyze-song analyze-songs

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

seed-first-user:
	docker compose run --rm --build \
		-e EMAIL="$(EMAIL)" -e USERNAME="$(USERNAME)" -e NAME="$(NAME)" \
		deploy-worker node scripts/dev/first-user.ts

analyze-song:
	@test -n "$(SONG)" || { echo "usage: make analyze-song SONG=<song-id>"; exit 1; }
	docker compose run --rm --build deploy-worker node scripts/dev/analyze-song.ts "$(SONG)"

analyze-songs:
	docker compose run --rm --build deploy-worker node scripts/dev/analyze-song.ts --all
