# Phase 1 — Infrastructure & Bootstrap

## Purpose
Phase 1 establishes a clean, production-ready backend foundation before implementing any business logic.

The focus is on:
- Project structure
- Environment configuration
- Database connectivity
- Tooling stability

No domain logic is implemented in this phase.

---

## Tech Stack
- NestJS (TypeScript)
- PostgreSQL (Dockerized)
- Prisma ORM
- Docker Compose

---

## Application Bootstrap
- NestJS initialized with ESLint and Prettier
- Default demo controllers removed
- Global API prefix set to `/api`
- Global validation enabled using `ValidationPipe`:
  - whitelist
  - forbidNonWhitelisted
  - transform

---

## Environment Configuration
- `.env` for local development
- `.env.example` committed for reference
- Environment variables used:
  - `DATABASE_URL`
  - `JWT_SECRET`
  - `JWT_EXPIRES_IN`
  - `PORT`

---

## Database Setup
- PostgreSQL runs via Docker Compose
- Database is isolated from host services using a non-default port
- Persistent volume configured for data storage

### Docker Services
- postgres (PostgreSQL 15)

---

## Prisma Integration
- Prisma initialized with PostgreSQL datasource
- Prisma Client generated via CLI
- `PrismaService` created to manage PrismaClient lifecycle
- `PrismaModule` marked as global for DI access across modules

---

## Key Decisions
- Prisma is treated as infrastructure, not feature logic
- Database connection handled centrally
- Docker used to avoid local environment inconsistencies
- Windows-specific Docker/Postgres conflicts resolved via port isolation

---

## Outcome
At the end of Phase 1:
- Application starts cleanly without errors
- Prisma successfully connects to PostgreSQL
- Project is ready for schema design and domain implementation

---

## Next Phase
Phase 2 focuses on:
- Prisma schema design
- Database migrations
- Domain entities and relationships
