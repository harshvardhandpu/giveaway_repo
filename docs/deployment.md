# Production Deployment

# Free Deployment

Giveaway Intelligence is self-hosted with only open-source software: PostgreSQL, Redis, Qdrant, Nginx, BullMQ/Bull Board, Fastify, and FastAPI. No cloud account or paid provider is required.

## Local Docker

Copy `.env.example` to `.env`, set `JWT_SECRET` to a random 32+ character value, then run:

```bash
docker compose -f infra/docker-compose.prod.yml up --build
```

Nginx serves the API at `http://localhost`. Queue monitoring is at `/admin/queues`; liveness, readiness, and Prometheus-format metrics are `/live`, `/ready`, and `/metrics`.

## VPS Docker

Install Docker Compose on any VPS, clone this repository, create a protected `.env`, run the command above, then put TLS certificates in front of Nginx (for example, a free Let's Encrypt certificate). Keep PostgreSQL, Redis, and Qdrant volumes backed up.

## Migrations

Before upgrading a running deployment, execute `pnpm --filter @giveaway/database exec prisma migrate deploy --schema prisma/schema.prisma`. All secrets remain in `.env`; no paid secret manager is required.

Railway or Fly.io free tiers can be used optionally, but the standard deployment has no cloud dependency.
