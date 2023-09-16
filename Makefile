build-dev:
	cd client && $(MAKE) build-dev
	cd server && $(MAKE) build

run-dev:
	docker compose -f docker-compose-dev.yml up

###

build-local:
	cd client && $(MAKE) build-local
	cd server && $(MAKE) build

run-local:
	ENV=local docker compose -f docker-compose-production.yml up

###
 
build-production:
	cd client && $(MAKE) build-production
	cd server && $(MAKE) build

run-production:
	ENV=production docker compose -f docker-compose-production.yml up -d

SSH_STRING:=root@146.190.9.151

ssh:
	ssh $(SSH_STRING)

copy-files:
	scp -r ./* $(SSH_STRING):/root/

tag-images:
	docker tag react-app-production:production mrbhat007/react-app-production:production
	docker tag api-server:latest mrbhat007/api-server:latest

push-images:
	docker push mrbhat007/react-app-production:production
	docker push mrbhat007/api-server:latest
