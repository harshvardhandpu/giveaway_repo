# Giveaway Intelligence

Research public crypto giveaway posts and view evidence-based creator reputation reports. This project does not automate engagement and never requests private keys or wallet secrets.

## Apps

- `apps/extension`: Manifest V3 Chrome extension popup built with React, TypeScript, Tailwind, shadcn-style UI primitives, and Zustand.
- `apps/api`: Fastify API with input validation and rate limiting.
- `apps/ai-service`: FastAPI public-text analysis pipeline.
- `packages/database`: Prisma data model for PostgreSQL.

## Run locally

```bash
cp .env.example .env
pnpm install
pnpm db:generate
docker compose -f infra/docker-compose.yml up --build
```

For extension development, start the API and then run:

```bash
pnpm --filter @giveaway/api dev
pnpm --filter @giveaway/extension dev
```

Load the extension build from `apps/extension/dist` in Chrome's Extensions page after running `pnpm --filter @giveaway/extension build`.

## API

`POST /api/search`

```json
{ "keyword": "SOL giveaway" }
```

`GET /api/creator/:username` returns a trust score, risk level, public evidence, and giveaway history. Phase 1 uses seeded demo discovery records while external public-data ingestion is added later.

## Verification

```bash
pnpm test
pnpm build
cd apps/ai-service && .venv/bin/pytest -q
```

See `docs/` for architecture, database design, and the implementation roadmap.
