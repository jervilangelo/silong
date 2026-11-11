# Silong

A Filipino literary refuge for poetry, stories, reflections, and everything left unsaid.

> In a world that never slows down, find your pause in writing.

## Local development

Node 22 or newer. Run `npm ci`, `npm run assets`, copy `.env.example` to `.env.local`, then `npm run dev`. With no Supabase settings the public website works and account forms report unavailable service; no fake accounts are created.

Build before browser tests. Run `npm run typecheck`, `npm run lint`, `npm run build`, and `npm test`. Browser tests currently target installed Chrome on Windows; adjust playwright.config.ts for another system.

## Supabase setup

1. Create or select a project; no resources are provisioned by this repository.
2. Apply `supabase/migrations/202611110001_profiles.sql` through Supabase CLI (`supabase db push` after linking) or the SQL editor.
3. Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, and `NEXT_PUBLIC_SITE_URL` in `.env.local` and Vercel, then rebuild after changing configuration.
4. Enable email confirmation. Set Site URL to the canonical site and allow `http://localhost:3000/auth/callback`, the production callback, and their password-recovery callback query destination. Use the standard confirmation URL/PKCE email flow; test with the same initiating browser.
5. Configure SMTP for production. Verify signup, confirmation, sign-in, sign-out, password recovery and session refresh. Run the two-user ownership matrix in docs/DATABASE_SCHEMA.md before launch.

The original brand package is in [brand/](brand/). See [design system](docs/DESIGN_SYSTEM.md), [Phase 1 report](docs/PHASE_1.md), and [master blueprint](docs/MASTER_BLUEPRINT.md).
