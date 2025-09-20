.PHONY: dev build preview install clean lint typecheck test test-run

SHELL := /bin/bash

install:
	@echo "Installing web dependencies with npm ci..."
	npm ci

dev:
	@echo "Starting Vite dev server on http://localhost:5173 ..."
	npm run dev

build:
	@echo "Building production bundle..."
	npm run build

preview:
	@echo "Previewing production build on http://localhost:5173 ..."
	npm run preview

clean:
	@echo "Removing build artifacts..."
	rm -rf node_modules dist

lint:
	@echo "Linting..."
	npm run lint

typecheck:
	@echo "Typechecking..."
	npm run typecheck

test:
	@echo "Running tests (watch)..."
	npm run test

test-run:
	@echo "Running tests (CI mode)..."
	npm run test:run
