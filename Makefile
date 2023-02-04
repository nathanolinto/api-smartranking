up:
	docker-compose up -d

down:
	docker-compose down

restart-app:
	docker-compose restart smartranking-api

logs:
	docker-compose logs -f smartranking-api