# FeaturePulse

Community feedback board and public roadmap built with Next.js 14, Prisma and PostgreSQL.

## Local development

```bash
npm install
cp .env.example .env        # then set DATABASE_URL
npx prisma migrate deploy   # creates the tables
npm run dev
```

## Deploying to Vercel

1. Create a Postgres database (Neon or Supabase) and copy its connection string.
2. Import this repo in Vercel (framework preset: Next.js).
3. Add the environment variable `DATABASE_URL` (Production, Preview and Development).
4. Deploy. Vercel runs `npm run vercel-build`, which generates the Prisma client,
   applies migrations (`prisma migrate deploy`) and builds the app.

Note: with Neon, use the direct (non-pooled) connection string for `DATABASE_URL`
so migrations can take their advisory lock during the build.

The admin dashboard at `/dashboard` is currently unauthenticated; add auth before
exposing it publicly.
