# Giveaway Intelligence Architecture

## Purpose

Giveaway Intelligence is a research and verification product for publicly available giveaway posts. It does not automate likes, reposts, follows, messages, or any other platform engagement.

## Components

| Component | Responsibility |
| --- | --- |
| Chrome extension | Search topics, present creator reputation reports, and retain local UI preferences. |
| API | Validates requests, applies rate limits, exposes search and creator-report endpoints, and orchestrates persistence. |
| AI service | Parses supplied public post text, evaluates evidence, calculates trust signals, and produces a report. |
| PostgreSQL | Durable source of truth for creators, giveaways, evidence, winners, and reports. |
| Redis + BullMQ | Queues asynchronous analysis work. |
| Qdrant | Stores evidence embeddings for semantic retrieval when an embedding provider is configured. |

## Request flow

1. The extension sends a keyword to `POST /api/search`.
2. The API validates and rate-limits the request, then returns matching public giveaway records.
3. The extension opens `GET /api/creator/:username` for a reputation report.
4. Analysis jobs send public text to the AI service pipeline: parser, evidence retrieval, scoring, report generation.
5. The API stores the returned report and evidence with Prisma.
6. Phase 2 classifies related public posts, stores evidence embeddings in Qdrant, and maps evidence graph edges for report reasoning.
7. Phase 3 discovery providers normalize authorized public data, BullMQ workers refresh evidence and scores, and watchlists drive notifications.
8. Phase 4 investigates evidence chronology, confidence, contradictions, narratives, and creator similarity clusters.

## Security boundaries

- Secrets are loaded only from environment variables and are excluded from version control.
- API input is schema-validated; rate limiting is enabled on public routes.
- The product never requests, stores, or processes private keys, seed phrases, or wallet secrets.
- Evidence links are public references. Human review remains required for consequential decisions.

## MVP scope

The MVP includes seeded/demo discovery data and an analysis-ready pipeline. External social-platform scraping and automated engagement are intentionally excluded.
