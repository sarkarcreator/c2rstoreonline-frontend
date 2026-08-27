# C2R Store Online Frontend

The public Next.js application for C2R Store Online. It contains UI, routes, SEO, client validation, and an HTTP API client only. Database, Prisma, AI secrets, authentication enforcement, affiliate tracking, and all API handlers live in the separate backend repository.

## Setup

1. Copy `.env.example` to `.env.local`.
2. Set `NEXT_PUBLIC_API_URL=http://localhost:4000` and `NEXT_PUBLIC_SITE_URL=http://localhost:3000` for local development.
3. Run `npm install`, then `npm run dev`.

Production should set `NEXT_PUBLIC_API_URL=https://api.c2rstore.online`. No `DATABASE_`, `JWT_`, `GEMINI_`, or affiliate secret may be exposed here.

## Verification

Run `npm run lint` and `npm run build`. The application needs the backend running and seeded before content pages can render.
