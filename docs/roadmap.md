# Phase 1 Implementation Roadmap

## Foundation

- [x] Define system architecture and security boundaries.
- [x] Define relational data model and indexes.
- [x] Define Phase 1 delivery scope.

## Backend and data

- [ ] Create Prisma schema and database client package.
- [ ] Implement Fastify API with validation, rate limits, health checks, and seed-backed search.
- [ ] Add trust-score module and tests.

## AI service

- [ ] Implement FastAPI agents and deterministic pipeline.
- [ ] Expose analysis endpoint and tests.

## Extension

- [ ] Build Manifest V3 React popup with search, creator profiles, and settings.
- [ ] Add background worker and conservative public-page content-script integration.

## Operations

- [ ] Add Docker Compose for PostgreSQL, Redis, Qdrant, API, and AI service.
- [ ] Verify builds and unit tests, then document local startup.
