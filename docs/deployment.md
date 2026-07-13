# Production Deployment

Set a 32+ character `JWT_SECRET`, configure database and Redis secrets through your deployment secret store, then run `docker compose -f infra/docker-compose.prod.yml up -d --build`. Nginx exposes the API on port 80. Run Prisma migrations before serving traffic.
