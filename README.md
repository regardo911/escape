# Just Move to Vegas?

Leaving California is easy. Escaping California taxes is not.

## Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Prisma + SQLite
- Vitest

## Requirements Recap
- Deterministic scoring logic lives in `src/lib/scoring.ts` and is unit-tested.
- Assessment responses are stored as JSON in SQLite via Prisma.

## Getting Started

### 1) Install dependencies
```bash
npm install
```

### 2) Prisma generate + migrate
```bash
npm run prisma:generate
npm run prisma:migrate
```

### 3) Seed data
```bash
npm run seed
```

### 4) Run the app
```bash
npm run dev
```

Open http://localhost:3000

## Tests
```bash
npm run test
```

## Project Structure
- `src/app` — Next.js routes
- `src/lib/scoring.ts` — deterministic scoring engine
- `src/lib/copy.ts` — canonical copy strings
- `prisma/schema.prisma` — data models
- `prisma/migrations` — migration history
- `prisma/seed.ts` — seed data
- `REQUIREMENTS.md` — canonical requirements summary
