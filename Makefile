DC = docker compose
EXEC = $(DC) exec app

.PHONY: help build up down restart logs shell \
        composer-install composer-update \
        migrate migrate-fresh migrate-rollback seed \
        key-generate storage-link cache-clear config-clear route-clear view-clear optimize \
        npm-install npm-build npm-dev \
        test tinker queue-work

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-22s\033[0m %s\n", $$1, $$2}'

# ─── Docker ──────────────────────────────────────────────────────────────────

build: ## Build Docker images
	$(DC) build

up: ## Start all containers (detached)
	$(DC) up -d

down: ## Stop and remove containers
	$(DC) down

restart: ## Restart all containers
	$(DC) restart

logs: ## Tail logs for all containers
	$(DC) logs -f

logs-app: ## Tail app container logs
	$(DC) logs -f app

logs-nginx: ## Tail nginx container logs
	$(DC) logs -f nginx

shell: ## Open a shell inside the app container
	$(EXEC) bash

# ─── Setup ───────────────────────────────────────────────────────────────────
setup: ## Initial setup (for first time)
	@echo "${BLUE}Setting up the application...${NC}"
	@if [ ! -f .env ]; then \
		cp .env.example .env; \
		echo "${GREEN}.env file created from .env.example${NC}"; \
	fi
	@echo "${BLUE}Building containers...${NC}"
	docker compose build
	@echo "${BLUE}Starting containers...${NC}"
	docker compose up -d
	@echo "${BLUE}Installing dependencies...${NC}"
	docker compose exec app composer install
	@echo "${BLUE}Generating application key...${NC}"
	docker compose exec app php artisan key:generate
	@echo "${BLUE}Running migrations...${NC}"
	docker compose exec app php artisan migrate
	@echo "${BLUE}Creating storage link...${NC}"
	docker compose exec app php artisan storage:link
	@echo "${BLUE}Installing Node dependencies and building assets...${NC}"
	npm install && npm run build
	@echo "${GREEN}Setup complete! Access the app at http://localhost:8000${NC}"

# ─── Composer ────────────────────────────────────────────────────────────────

composer-install: ## Install PHP dependencies
	$(EXEC) composer install

composer-update: ## Update PHP dependencies
	$(EXEC) composer update

composer-dump: ## Regenerate autoload files
	$(EXEC) composer dump-autoload -o

# ─── Artisan ─────────────────────────────────────────────────────────────────

migrate: ## Run database migrations
	$(EXEC) php artisan migrate

migrate-fresh: ## Drop all tables and re-run migrations
	$(EXEC) php artisan migrate:fresh

migrate-rollback: ## Rollback the last migration batch
	$(EXEC) php artisan migrate:rollback

seed: ## Run database seeders
	$(EXEC) php artisan db:seed

migrate-seed: ## Fresh migration with seeding
	$(EXEC) php artisan migrate:fresh --seed

key-generate: ## Generate application key
	$(EXEC) php artisan key:generate

storage-link: ## Create storage symlink
	$(EXEC) php artisan storage:link

cache-clear: ## Clear application cache
	$(EXEC) php artisan cache:clear

config-clear: ## Clear config cache
	$(EXEC) php artisan config:clear

route-clear: ## Clear route cache
	$(EXEC) php artisan route:clear

view-clear: ## Clear compiled views
	$(EXEC) php artisan view:clear

optimize: ## Cache config, routes, and views
	$(EXEC) php artisan optimize

clear-all: cache-clear config-clear route-clear view-clear ## Clear all caches

tinker: ## Start Laravel Tinker REPL
	$(EXEC) php artisan tinker

queue-work: ## Start the queue worker
	$(EXEC) php artisan queue:work

# ─── Node / Frontend ─────────────────────────────────────────────────────────

npm-install: ## Install Node dependencies (on host)
	npm install

npm-build: ## Build frontend assets for production
	npm run build

npm-dev: ## Start Vite dev server
	npm run dev

# ─── Testing ─────────────────────────────────────────────────────────────────

test: ## Run PHPUnit tests
	$(EXEC) php artisan test

test-filter: ## Run a specific test (usage: make test-filter TEST=MyTest)
	$(EXEC) php artisan test --filter=$(TEST)
