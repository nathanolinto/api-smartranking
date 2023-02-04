up-app:
	docker-compose up -d
up-db:
	docker-compose --file docker-compose.db.yml up -d
up-all:
	make up-app; make up-db

down-app:
	docker-compose down
down-db:
	docker-compose --file docker-compose.db.yml down
down-all:
	make down-app; make down-db

restart-app:
	docker-compose restart

logs:
	docker-compose logs -f smartranking-api