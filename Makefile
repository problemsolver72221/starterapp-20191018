
#
# DEV
#
dev-app:
	cd ./services/webapp && yarn install && yarn start:app

dev-api:
	cd ./services/webapp && yarn install && yarn start:dev:api

dev-workers:
	cd ./services/workers && yarn install && yarn start:dev

dev-pg:
	humble stop postgres
	humble rm -f postgres
	humble up -d postgres
	humble logs -f postgres

#
# PROD
#

#
# Reset
#
reset-all:
	rm -rf data
	rm -rf node_modules
	cd ./services/webapp && yarn reset
	cd ./services/workers && yarn reset
	
