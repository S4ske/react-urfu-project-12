install:
	npm ci

build:
	rm -rf dist
	npm run build

start:
	npx start-server -s ./dist

develop:
	npm run dev

lint:
	npm run --silent lint
	npm run --silent format:check

lint-fix:
	npm run --silent lint:fix
