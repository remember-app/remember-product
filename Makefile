PUBLIC_HOST ?= localhost

.DEFAULT_GOAL := start-api

.PHONY: start-api start-montage start-montage-mock start-mobile-simulator start-mobile-phone db-fresh db-seed-essentials db-seed-data db-seed-anthropovy

start-api:
	S3_PUBLIC_ENDPOINT=http://$(PUBLIC_HOST):9000 docker compose up -d --build api

start-montage:
	docker compose up -d --build montage

start-montage-mock:
	AI_ENDPOINT=http://mock-ai:8080/v1beta/interactions docker compose up -d --build mock-ai montage

start-mobile-simulator:
	cd projects/mobile && EXPO_PUBLIC_API_URL=http://localhost:3000 npx expo start --dev-client --ios

start-mobile-phone:
	@ip=$${HOST:-$$(ipconfig getifaddr en0 || ipconfig getifaddr en1)}; \
	[ -n "$$ip" ] || { echo "no local network address (en0/en1)"; exit 1; }; \
	$(MAKE) start-api PUBLIC_HOST=$$ip; \
	cd projects/mobile && EXPO_PUBLIC_API_URL=http://$$ip:3000 npx expo start --dev-client --lan

db-fresh:
	docker exec postgres sh -c 'psql -U "$$POSTGRES_USER" -d "$$POSTGRES_DB" -c "drop schema public cascade; create schema public;"'
	docker compose run --rm --build deploy-worker node scripts/cicd/migrations/index.ts

db-seed-essentials:
	docker compose run --rm --build deploy-worker node scripts/cicd/seeds/index.ts

db-seed-data:
	docker compose run --rm --build deploy-worker node scripts/manual/seeds/index.ts

db-seed-anthropovy:
	@[ -n "$(NICK)" ] || { echo "usage: make db-seed-anthropovy NICK=<nickname>"; exit 1; }
	docker compose run --rm --build deploy-worker node scripts/manual/seeds/anthropovy/main.ts "$(NICK)"
