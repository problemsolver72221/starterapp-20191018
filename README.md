# starter app

- PostgresSQL - database
- React and Node - webapp
- FetchQ - queue system

## required enviorment

- docker
- node
- npm/yarn

### Starting project

- Run database to make it accessable by webapp and queue system
```bash=
# start postgres
make dev-pg
```
- Run webapp and queue system
```bash=
# client
make dev-app

# server
make dev-api

# queue system workers
make dev-workers
```
- To RESET the project
```bash=
# will cleanout database, node_modules and builds
make reset-all
```