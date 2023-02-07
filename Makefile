DOCKER_BUILD_IMAGE_NAME = chinmayi-test
DOCKER_BUILD_IMAGE_NAME_FRONTEND = chinmayi-test/app-frontend
DOCKER_BUILD_IMAGE_NAME_BACKEND = chinmayi-test/app-backend
DOCKER_BUILDER_BUILD_IMAGE_BACKEND_NAME = $(DOCKER_BUILD_IMAGE_NAME_BACKEND)-builder

# Get override file name
ifdef SECUREDEV
OVERRIDE_FILE_NAME = deployment/docker-compose.secure.development.yml
else ifdef PRODUCTION
OVERRIDE_FILE_NAME = deployment/docker-compose.production.yml
else
OVERRIDE_FILE_NAME = development/docker-compose.development.yml
endif

PROJECT_ROOT_PATH := $(abspath $(patsubst %/,%,$(dir $(lastword $(MAKEFILE_LIST)))))
export DOCKER_BUILDKIT ?= 1

# Main functions
all: install
install: down-then-install
hard-install: destroy-then-install


run: docker-build-backend docker-migrate-database docker-run-all
run-secure-dev: docker-build-backend docker-migrate-database docker-run-secure-dev

test: docker-build-backend docker-run-test-backend docker-run-test-frontend
# Main functions


server-install: docker-build-backend docker-migrate-database post-install-setup
post-install-setup: docker-setup-superuser docker-prefill
stop-server: docker-down
destroy: docker-down-w-volumes
down-then-install: stop-server server-install
destroy-then-install: destroy server-install


docker-build-backend:
	docker build \
    		--progress=plain \
    		--target=builder \
    		-t $(DOCKER_BUILDER_BUILD_IMAGE_BACKEND_NAME) \
    		backend
	docker build \
		--progress=plain \
		--target=app \
		-t $(DOCKER_BUILD_IMAGE_NAME_BACKEND) \
		backend

docker-run-all:
	docker compose -f docker-compose.yml -f $(OVERRIDE_FILE_NAME) up --remove-orphans

docker-run-secure-dev:
	docker compose -f docker-compose.yml -f $(OVERRIDE_FILE_NAME) up --remove-orphans frontend db api admin nginx celery redis_queue

docker-down-w-volumes:
	docker compose -f docker-compose.yml -f $(OVERRIDE_FILE_NAME) down --volumes --remove-orphans

docker-down:
	docker compose -f docker-compose.yml -f $(OVERRIDE_FILE_NAME) down --remove-orphans

docker-migrate-database:
	docker compose -f docker-compose.yml -f $(OVERRIDE_FILE_NAME) run --rm -e LOAD_ADMIN_APP=1 api python manage.py migrate

docker-setup-superuser:
	docker compose -f docker-compose.yml -f $(OVERRIDE_FILE_NAME) run --rm api python manage.py createsuperuser --noinput

docker-run-test-backend:
	docker compose -f docker-compose.yml -f $(OVERRIDE_FILE_NAME) run --rm api python manage.py test

docker-run-test-frontend:
	docker compose -f docker-compose.yml -f $(OVERRIDE_FILE_NAME) run --rm frontend bash -c "yarn test --watchAll=false && yarn typecheck && yarn lint"

docker-prefill:
	docker compose -f docker-compose.yml -f $(OVERRIDE_FILE_NAME) run --rm api python manage.py fillcurrencydata
