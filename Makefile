PUBLIC_HOST ?= localhost

.DEFAULT_GOAL := api-up
.PHONY: api-up api-down sim phone fresh seed-test

api-up:
	S3_PUBLIC_ENDPOINT=http://$(PUBLIC_HOST):9000 docker compose up -d --build api

api-down:
	docker compose down

fresh:
	docker exec postgres sh -c 'psql -U "$$POSTGRES_USER" -d "$$POSTGRES_DB" -c "drop schema public cascade; create schema public;"'
	docker compose run --rm --build deploy-worker

seed-test:
	cd projects/api && API_URL=$${API_URL:-http://localhost:3000} node --env-file-if-exists=.env scripts/seed-test.ts

sim:
	cd projects/mobile && EXPO_PUBLIC_API_URL=http://localhost:3000 npm run ios

phone:
	@ip=$${HOST:-$$(ipconfig getifaddr en0 || ipconfig getifaddr en1)}; \
	[ -n "$$ip" ] || { echo "no local network address (en0/en1)"; exit 1; }; \
	$(MAKE) api-up PUBLIC_HOST=$$ip; \
	cd projects/mobile && EXPO_PUBLIC_API_URL=http://$$ip:3000 npx expo start --dev-client --lan
