# Architecture

Next.js App Router with strict TypeScript, React Server Components, Tailwind v4 and custom accessible components following a shadcn-compatible alias/configuration structure. Lucide provides interface icons. There is no need for a Radix dependency for the current native forms and links.

Server actions own auth and profile mutation. Zod validates input. Supabase SSR uses cookie sessions, a Next.js proxy for refresh, and auth.getUser for server-side identity verification. The database enforces ownership independently through RLS. No service-role key is used. See https://supabase.com/docs/guides/auth/server-side/creating-a-client for the upstream pattern.

Profile URLs use /u/[handle]; dashboard routes are protected by their shared server layout. Public fields are explicitly selected. User text renders through React escaping. Avatar uploads are not exposed; avatar_path must remain null until a validated storage pipeline is implemented.

Brand sources remain in brand/. npm run assets copies only the runtime subset byte-for-byte to public/brand. Open Graph rendering reads the approved PNG master directly. No external image host is required. Hosting target is Vercel; no Sites deployment was created because this is the explicitly requested repository/Next.js implementation.
