# SILONG — Master Product & Technical Blueprint

**Document:** `docs/MASTER_BLUEPRINT.md`  
**Version:** 2.0 — 11 November 2026 (Asia/Manila)  
**Repository:** https://github.com/jervilangelo/silong  
**Status:** Living implementation specification; Phase 1 implemented locally according to repository report, live service verification pending.  
**Product principle:** **Writing is the core product; atmosphere surrounds it.**

> *In a world that never slows down, find your pause in writing.*

## 0. Purpose, authority, and current baseline

Silong is an English-first, Filipino-centered publishing and reading refuge for poems, essays, short stories, long-form writing, journal entries, and everyday reflections in Filipino, English, Taglish, and Philippine regional languages. It is open to international writers. Its emotional range includes joy, humor, hope, faith, love, longing, grief, and ordinary life; it must not reduce writing to sadness. Silong is **not** a chat app, gaming portal, creator-economy contest, or engagement-maximizing feed.

This document is the **product and engineering north star**. Existing code, migrations, and specialized docs are the factual source of implementation state; do not infer that requirements here are already shipped. Where this document conflicts with deployed behavior, record the discrepancy and reconcile it explicitly. Changes in scope, approved visual identity, storage/security model, or paid infrastructure require written decisions in this document and the applicable specialized document.

### Verified repository baseline (at blueprint revision)

- `main` contains a Next.js 16 / React 19 / strict TypeScript / Tailwind CSS v4 app, Supabase SSR client, Zod v4 validation, Playwright, and established `docs/` files; see `package.json`, `README.md`, and `docs/ARCHITECTURE.md`.
- Phase 1 report (`docs/PHASE_1.md`) records a homepage, original CSS/SVG rainy-city hero, accessible responsive shell, signup/signin/recovery and callback flows, a protected dashboard, public profiles under `/u/[handle]`, and a profiles RLS migration (`supabase/migrations/202611110001_profiles.sql`). It records passing local typecheck, lint, build and six Playwright tests, **not** production or live Supabase validation. Do not recharacterize the reported tests as independently rerun by this document's author.
- Real Supabase signup, confirmation, password recovery, two-user RLS checks, SMTP delivery, and session recovery remain **unverified** without configured credentials/test users; they are Phase 1 exit blockers before enabling live writers.
- Brand originals live under **`brand/` (singular, not `brands/`)**. The chosen official **Falling Rain** mark is an outlined lowercase **silong** Fraunces wordmark with a raindrop replacing the `i` dot; its right edge subtly steps across three pixels. There is **no extra full stop after the wordmark**. Reuse the masters rather than rendering a replacement typographic logo.
- `scripts/sync-brand.mjs` copies selected approved assets to `public/brand`; the original `brand/` folder must stay intact. `docs/BRAND_ASSETS.md` lists all variants and usage. Static wordmarks are preferred in navigation; 9-second approved animated versions belong on loading/splash surfaces, with reduced-motion support.
- `docs/ROADMAP.md` currently places editor/publishing in Phase 2, private journal/discovery in Phase 3, environment/audio in Phase 4, social/achievements in Phase 5, and moderation/admin/launch in Phase 6. Preserve that numbering unless an explicit ADR records a change.

### Product invariants (apply to every phase)

1. **Writing before spectacle:** Atmospheric effects never obstruct words, navigation, typing, or reading.
2. **Privacy by default:** Private drafts, journals and unpublished content are invisible to unauthorized clients, indexes, public APIs, analytics payloads, link previews, and caches.
3. **Calm by design:** No streak pressure, addictive infinite feed requirements, public competitive leaderboard, or unsolicited audio autoplay.
4. **Honest data:** Sample publications/users and fake counters are explicitly labeled in any preview. No fake auth, production claims, or simulated success.
5. **Inclusive and accessible:** Keyboard support, WCAG 2.2 AA targets, reduced-motion, screen-reader labels, meaningful focus, text resizing, sufficient contrast, and audio/motion overrides.
6. **Original/rights-cleared creative work:** Pinterest is visual research only; do not copy, scrape, publish or embed unlicensed Pins or music.
7. **Budget-conscious implementation:** No paid cloud resources or irreversible deployments without approval; choose simple infrastructure until measurable need arises.
8. **Security independent of UI:** Database RLS and authorization must work even if buttons or client checks are bypassed.

## 1. Audience, use cases and non-goals

**Primary personas:** (A) a first-time Filipino poet using a pen name; (B) a long-form essayist editing drafts across devices; (C) a private journal writer who may later publish selectively; (D) a quiet reader discovering stories by mood, language, subject or author; (E) a volunteer moderator handling reports fairly. All need readable experiences on budget mobile devices and intermittent connections.

**Critical user journeys:**

1. Visitor reads a featured/sample piece without creating an account → discovers an author → voluntarily signs up.
2. New user confirms email → chooses unique handle/pen name → opens their protected writing room.
3. Writer composes → auto-saves a private draft → previews → explicitly publishes → edits/unpublishes/deletes with accurate visibility.
4. Writer creates a **private** dated journal → searches it privately → optionally copies it into a distinct public article draft and confirms publication.
5. Reader searches/tag-filters published work → reads distraction-free → bookmarks or appreciates once while remaining in control of settings.
6. Writer selects a profile environment → previews it → publishes settings → visitors can choose Quiet Mode and turn sounds off.
7. User reports harmful/abusive content → moderator reviews via least-privileged interface → documented action and appeal path.

**Explicitly out of scope at first launch:** direct messaging, chatrooms, live collaborative editing, payments/tipping, subscriptions, follower leaderboards, aggressive personalized ranking, AI-authored content as a core product, auto-playing music, unrestricted user CSS/JS, and downloadable copies of unlicensed artist media. Reassess only through a scoped product decision.

## 2. Brand, design system, and reference governance

### 2.1 Approved brand asset rules

- **Official assets:** `brand/svg/`, `brand/png/`, `brand/web/`, `brand/brand-guide.html`; consult `brand/README.md` and `docs/BRAND_ASSETS.md` before styling. Use `npm run assets` and the existing runtime sync strategy; avoid duplicating full brand archives into the site bundle.
- **Primary mark:** The Falling Rain, refined Fraunces lettering, subtly stepped raindrop as the `i` dot; keep original outlines, kerning, color balance and clear space. **Do not add `.`**; never swap the drop for a round dot or over-pixelate the letters.
- Dark surfaces: `silong-wordmark-on-dark` + `silong-symbol-neon`; light surfaces: `silong-wordmark-on-light` + `silong-symbol-mist`. Use `silong-symbol-small` under 48 px and a suitable approved favicon from `brand/web/`.
- No gradients, glows, outline strokes, arbitrary recoloring, amber raindrop or brand redesign; the warm amber accent is for UI moments, not the logo. Verify legibility and alignment at 16, 32, 48, 72 and 144 px.
- Animated wordmark may appear as loading/splash decoration only, should not restart during every navigation and must become static when reduced motion is requested.

### 2.2 Visual language

| Token | Hex | Intended usage |
|---|---|---|
| Midnight | `#151D25` | Hero/background and dark theme |
| Rain | `#263640` | Secondary surfaces and borders |
| Mist | `#506D76` | Muted accents (contrast-test before small text) |
| Neon | `#8CC3C7` | Gentle cyan emphasis / rainy reflections |
| Paper | `#D6D5CE` | Main light reading surfaces / dark-theme text |
| Warm amber (optional UI) | `#E3A95C` | Rare comforting light, never logo color |

Editorial and contemporary rather than arcade: roughly 85–90% clean literary UI, 10–15% subtle pixel cues in environmental illustrations and small details. Existing site uses **Fraunces and Newsreader** variable font packages; keep consistency with approved brand rather than introducing Playfair/Inter without design review. Use legible long-form measure (~60–75 characters), comfortable line height, responsive type scale, generous whitespace, semantic headings, and clear hover/focus/disabled/error states.

### 2.3 Environment reference library (inspiration, not deliverable assets)

- Rainy city: https://www.pinterest.com/search/pins/?q=animated%20pixel%20art%20rainy%20city
- Rainy bedroom: https://www.pinterest.com/search/pins/?q=animated%20pixel%20art%20rainy%20bedroom
- Rainy train: https://www.pinterest.com/search/pins/?q=animated%20pixel%20art%20rainy%20train%20station
- Midnight café: https://www.pinterest.com/search/pins/?q=animated%20pixel%20art%20rainy%20cafe
- Window rain loops: https://www.pinterest.com/search/pins/?q=pixel%20art%20rain%20window%20animation

Reference manifest fields: creator, source URL, date inspected, specific motion/lighting insight, license/permission status, permissible usage, original Silong derivative asset, and asset owner. A Pinterest URL is **not** a license. Before adding an environmental scene or sound, record provenance and appropriate commercial/public-web rights.

### 2.4 Animation and sound rules

- CSS/SVG by default; Canvas only where profiling justifies it; avoid heavy libraries without need. Render rain at device-appropriate density; pause offscreen and under reduced-motion, tab inactivity or data-saver preference.
- Prefer transform/opacity for composited motion, avoid frequent layout/reflow, limit simultaneous effects, ensure pointer-events cannot steal controls. Preserve 60 fps where feasible; measure on midrange mobile rather than promising a fixed FPS.
- Provide **Quiet Mode** that disables decorative motion/audio and remembers user choice. Support system `prefers-reduced-motion` and manual override, with visual accessibility maintained.
- Audio is always **off until explicit user gesture**. Independent channel sliders for rain, distant thunder, wind, optional piano/café where properly licensed; clear mute/pause, keyboard-accessible controls, device-wide accessibility and persistent preferences. Do not attempt to circumvent browser autoplay restrictions.

## 3. Information architecture and experience map

| Surface | Route pattern (proposed unless already implemented) | Access | Phase |
|---|---|---|---|
| Homepage | `/` | Public | 1, exists |
| Explore | `/explore` | Public | 1 shell, 3 real data |
| About / legal / guidelines | `/about`, `/privacy`, `/terms`, `/community-guidelines` | Public | 1 preliminary |
| Signup / signin / recovery | `/signup`, `/signin`, `/forgot-password`, `/update-password`, `/auth/callback` | Public/auth | 1, integration verification pending |
| User profile | `/u/[handle]` | Public | 1, exists |
| Dashboard and settings | `/dashboard`, `/dashboard/profile`, `/dashboard/settings` | Auth | 1, exists/shell |
| Writing library / drafts | `/dashboard/writing`, `/dashboard/drafts` (validate actual path) | Auth | 2 |
| Composer | `/write`, `/write/[id]` (proposed) | Auth | 2 |
| Published piece | `/read/[slug]` (proposed, stable ID or slug policy required) | Public | 2 |
| Journal | `/dashboard/journal`, `/dashboard/journal/[id]` | Auth | 3 |
| Search/topics/bookmarks | `/search`, `/topics/[slug]`, `/dashboard/bookmarks` | Mixed | 3/5 |
| Theme studio | `/dashboard/customize` | Auth | 4 |
| Moderator/admin console | `/admin/...` | Authorized roles only | 6 |

The exact routes of later phases require a route inventory before coding. Do not break existing route contracts without redirects and tests. Anonymous readers must not be redirected to login for public posts; protected draft/journal/editor routes must authenticate server-side.

## 4. Functional specifications and acceptance criteria

### F1 — Accounts, sessions, pen names (Phase 1 existing; harden before external launch)

- Email/password via Supabase Auth; email verification; recovery; correct cookie refresh; CSRF-safe mutation flow; errors must not leak whether unrelated accounts exist. Google OAuth is optional and deferred until provider setup and consent details are ready.
- Unique case-normalized handle, 3–24 lowercase ASCII letters/digits/underscore, starts with letter; reserved names excluded; human-readable pen name (1–80 chars), optional bio (<=500), optional avatar once secure upload is implemented.
- Keep internal `auth.users.id` and public pen name separate; no public email exposure. Account deletion/export flows must be completed before launch.
- **AC:** two real verified test users cannot edit or impersonate each other; duplicate or reserved handles fail both validation and DB constraints; logout invalidates access; password recovery cannot bypass identity; unavailable backend shows honest error rather than fake success.

### F2 — Article editor, draft lifecycle, publishing (Phase 2)

- Tiptap or comparably maintained structured rich-text editor; title, subtitle, cover, headings, inline images/captions, bold/italic, quotes, lists, dividers, tags, category, language, reading time, word count, preview, fullscreen distraction-free mode, mobile/keyboard access.
- Status state machine: `draft` → `published` → `unpublished` (optionally back to draft); soft-delete/trash policy defined before shipping; never treat a save as publish.
- Autosave after debounced edits with visible states (`Saving`, `Saved`, `Offline`, `Failed`), idempotent writes, mutation version/ETag optimistic concurrency to prevent silent cross-tab overwrites; explicit recovery from network disconnects. Server-side content schema, sanitation and image validation; safe HTML rendering and CSP.
- Stable URL design, SEO and canonical metadata for published pieces only; noindex/not-found for drafts. Revisions retained with reasonable cap and retention policy; publishing/unpublishing invalidates relevant public cache.
- **AC:** author can create/edit/preview/publish/unpublish; unauthorized users cannot read/edit draft via URL, search, API or OG metadata; data survives refresh; automated cross-account tests and XSS payload tests pass; user sees recoverable errors.

### F3 — Reading and curation (Phase 2 then 3)

- Readable page with author, published/updated timestamps, estimated reading time, anchored share link, responsive imagery, progress indicator, clean quotations/headings, accessible images, and printing support.
- Reader overrides for font scale/spacing, light/dark or system theme, Quiet Mode and motion; persist locally (and to account preferences optionally), without changing author's published text.
- Related articles initially from tags/language/editorial curation; never use private drafts or journal content in recommendations.
- **AC:** readable at 320px with 200% zoom and keyboard; no background motion obscures text; public-only feed, RSS/OG/search indexing respect publication status.

### F4 — Private journal (Phase 3)

- Private date-organized entries, editable titles/body, search restricted to owner, autosave, archive/delete/export. Never index publicly or include journal data in public statistics.
- Conversion to a published article is **copy-to-draft + explicit review/publish**, not changing original journal visibility. Journal original remains private by default.
- **AC:** anonymous and second signed-in accounts get no rows via direct API/SQL; no sensitive preview in notifications, logs or thumbnails; backup/export and deletion tested.

### F5 — Search, discovery and languages (Phase 3)

- Editorial home/explore; search by published title/author and optionally indexed article body; tags, genre/category, language, publication date. Writer lookup by handle and pen name. Curated thematic collections.
- PostgreSQL full-text search initially; language-aware normalization and sensible fallbacks for Filipino/Taglish/regional languages (English stemming alone is insufficient). Rate limit and paginate searches; index only published and eligible moderated content.
- **AC:** results are deterministic, accessible, paginated, and free of unpublished/private/restricted material; empty states and search typo handling are considerate, not addictive.

### F6 — Atmospheric profiles / reader preferences (Phase 4)

- First-party curated environments: Midnight Alley, Window at 2 AM, Last Train Home, Rooftop Rain; café may be a later addition. Preview and save chosen scene, optional rain intensity, lighting, accent and featured article. Controlled config only; never execute user-provided HTML, CSS or JS.
- Separate content layer from environment layer; background art must not interfere with legibility. Visitors override motion/audio regardless of profile owner's choice.
- **AC:** profile works without animation, on low-power mobile, with inaccessible assets or no JS enhancement; saved preference persists and degrades gracefully; only owner can update theme.

### F7 — Ambient audio mixer (Phase 4)

- Optional sound layers with independent volume and master mute; play/pause, presets and optional sleep timer; original/cleared sound files and documented licenses; low-bandwidth loading.
- Audio starts only after user interaction, stops when requested, doesn't surprise users in navigation, and respects accessibility/Quiet Mode. Avoid storing privacy-sensitive listening activity.
- **AC:** zero audio on initial render; pause/mute works across scenes and tabs where applicable; controls keyboard and screen-reader accessible; reduced-motion is independent from user-initiated sound.

### F8 — Bookmarks, hearts, achievements, notifications (Phase 5)

- One heart per user per published article; reversible; atomic, idempotent counters or calculated aggregates; private bookmark library; report on user-facing aggregate semantics.
- Milestone badges are restrained and optional to show: e.g. `Manunulat`, `Tagapagsalaysay`, `Tinig ng Panulat`, `Makata`, `Nakaantig ng Puso`, `Liwanag`, `Haligi`. Name/threshold/rules **provisional** until editorial review; do not derive badges from easily spoofed page views.
- Optional minimal notifications for hearts, curator feature and badge, off by default where appropriate, user can mute. No push spam, competitive leaderboard or mandatory streaks.
- **AC:** duplicate hearts blocked at database layer; no hearts on unpublished content; deletion of articles removes/inactivates related counts; badges cannot be assigned client-side; notification preferences enforced.

### F9 — Moderation, governance and admin (baseline throughout; completed Phase 6)

- Report content/user with reason and optional details; visible policy, moderation queue, adjudication, temporary restriction, takedown/unpublish, appeal/review and abuse case notes. Protect reporters and personal details; anti-spam and rate controls from early phases.
- Least-privilege roles (reader/writer, moderator, admin); server-side claims/role table controlled by trusted admin workflows, not editable profile fields. Audit moderation decisions and sensitive admin actions with actor, target, timestamp, reason, redacted metadata. Explicit retention, privacy compliance and emergency escalation.
- **AC:** normal users cannot access admin routes, RPCs or storage; moderators cannot elevate their own role; reported content not automatically exposed; audit events cannot be rewritten by ordinary users; appeals workflow and abuse response tested.

## 5. Data architecture: proposed future extensions

**Existing authoritative table:** `public.profiles` in `supabase/migrations/202611110001_profiles.sql`. Verify current DDL in the migration before changing columns. Preserve current handle constraints, safe profile field grants and RLS. The following are **proposed**, not already created:

| Table | Core fields | Access / rule |
|---|---|---|
| `articles` | id UUID, author_id UUID, slug, title, subtitle, body_json, status, language, cover_path, published_at, created_at, updated_at, version | Owner can edit draft/unpublished; public read only published and allowed; moderation overrides server-side |
| `article_revisions` | id, article_id, editor_id, snapshot, version, created_at | Owner + authorized support as needed; never exposed publicly for unpublished content |
| `article_tags`, `tags` | article_id/tag_id, tag slug/label | Public on published articles; curated/validated tags |
| `journals` | id, user_id, title, body_json, entry_date, created_at, updated_at | **Owner-only SELECT/INSERT/UPDATE/DELETE**; no public policy |
| `bookmarks` | user_id, article_id, created_at | Owner-only read/write; article publication checked |
| `article_hearts` | user_id, article_id, created_at; PK(user_id,article_id) | Signed-in, one active heart, published-only guard |
| `profile_themes` | user_id, scene_id, lighting, rain_intensity, accent, featured_article_id | Owner-write, bounded allowed keys/values; public-read safe subset |
| `scenes`, `ambient_tracks` | id, slug, version, asset path, license metadata, enabled | Catalog managed by trusted roles; public-read approved assets |
| `achievements`, `user_achievements` | rule key, threshold, assigned_at, visibility | Trusted calculation server-side; user may hide badge |
| `reports` | id, reporter_id, target_type/id, reason, status, created_at | Reporter sees own submission status if desired; moderators see queue; never public |
| `moderation_actions`, `audit_events` | actor, target, action, reason, timestamp, metadata | Moderator/admin least privilege; immutable audit append path |
| `notification_preferences`, `notifications` | user_id, event_type, read_at, enabled | Owner-only; muted settings enforced |

Data conventions: UUID PKs, `timestamptz` UTC, explicit FK `ON DELETE` choices, SQL constraints, per-table RLS with least privilege, uniqueness/idempotency indexes, safe search views/functions, migrations committed in order and tested with fixtures. Avoid arbitrary PII in event logs or analytics; never persist raw passwords or auth tokens. Establish policies for export, retention, suspension, deletion and backup restores before launch.

### Suggested article lifecycle and concurrency

`draft` → `published` → `unpublished` / `archived` → `published` (subject to review). Publication requires validated title/content, immutable author ownership and an explicit user action. Revision writes must check `version` (optimistic locking); if a competing editor/tab has changed content, show merge/conflict recovery rather than clobbering. Prefer stable IDs with human slugs; reserve slug/history or redirects so title edits don't break old links.

### Media storage

- Public covers/avatars: allowlisted MIME and actual-byte verification, dimensions/file size caps, in-browser compression where useful, randomized object names and authenticated ownership before mutation; no SVG uploads from arbitrary authors unless sanitized/isolated.
- Private journal/attachment media: **private buckets** with validated short-lived signed access, never public URLs. Public content media can use a public bucket only after validation and explicit publication.
- Block executable files/polyglots, prevent cross-tenant file access, remove orphaned media after grace/retention policy, and strip unnecessary metadata. Image variants and alt-text required at publication.

## 6. Architecture and delivery boundaries

**Current baseline:** Next.js App Router / React Server Components, TypeScript strict, Tailwind, Supabase Auth/Postgres/Storage, Zod, Playwright, Vercel target. SSR cookie clients and `src/proxy.ts` session refresh pattern; protected server layouts use verified user identity and database RLS. Check the repository's **`AGENTS.md` and installed Next.js 16 docs** before changing framework-specific APIs.

Proposed domains/modules: `identity`, `profiles`, `writing`, `publishing`, `reading`, `discovery`, `journal`, `atmosphere`, `audio`, `engagement`, `trust-safety`, `admin`. Modules expose typed server-side services / queries rather than calling privileged DB operations from client UI. Start with a modular monolith; do not create microservices or queues without observed need.

**Request path (read):** Browser → Next.js route/server component → verified public/authorized query → RLS-protected Postgres / approved CDN media → HTML/cache. **Request path (write):** Browser → Zod-validated server action/route → authenticated Supabase context → RLS + DB constraints → mutation → scoped cache revalidation → UI state. **No privileged service role key on the client**; special admin actions require narrowly isolated trusted server paths with explicit role checks and audit trails.

**Cache constraints:** Public published content may use tagged revalidation; user-specific dashboard, drafts, private journals, bookmarks, notifications and signed URLs must never land in shared public caches. Force private/no-store where necessary. On unpublish or moderation, invalidate article, list, profile, search and open-graph surfaces; test for stale leakage.

**Search and analytics:** Start with Postgres indexes and server-side constrained queries. Adopt external search only on measured quality/performance limits. Privacy-friendly event counting; no invasive behavioral tracking by default. Store only consented, purposeful data with retention controls.

## 7. Development roadmap and exit gates

Phases are **dependencies, not calendar commitments**. Existing Phase 1 work is a baseline, not a guarantee of deployment or production readiness.

### Phase 1 — Foundation, identity & visual system (implemented locally; verify live)

**Deliverables already documented:** approved `brand/` assets and sync flow; polished responsive home; original SVG/CSS rain; app shell and public informational pages; Supabase Auth wiring and callbacks; protected dashboard shell; profiles and SQL migration; tests and current docs.

**To close the phase for live usage:**

- [ ] Provision/configure an approved test Supabase project; apply tracked migration; configure email verification/redirect allowlist/SMTP without exposing secrets.
- [ ] Verify actual signup, confirmation, signin, refresh, logout, recovery and expired/invalid token cases on mobile/desktop.
- [ ] Execute two-user profile RLS matrix (own vs cross-user reads/mutations; reserved and duplicate handles; spoofed IDs).
- [ ] Review legal placeholders and support contact; validate accessibility against WCAG 2.2 AA targets.
- [ ] Profile page sizes, reduced-motion/Quiet UI behavior, image rights, and production configuration; inspect security headers and errors.
- [ ] Preserve existing brand masters; use official static marks appropriately and animated mark only where specified.

**Gate:** verified auth and RLS; no leaked secrets; reviewed accessible homepage; build, lint, typecheck and Playwright green; manual smoke test on configured service. If absent, mark **Phase 1 implemented but not production-verified**, not complete.

### Phase 2 — Editor, drafts, publishing & reader (core product)

1. Design article schema + migrations + policies, draft/version state machine, upload rules and text sanitization.
2. Build rich editor, recoverable autosave, preview, upload/caption/alt text, language/tag selection, publish/unpublish.
3. Build article reader (mobile first), author backlinks, canonical metadata, reader settings, print/share, safe OG.
4. Write unit tests for validators, version conflicts and visibility; integration tests for RLS; browser journeys for full writer/reader lifecycle.

**Gate:** real author can safely publish and unpublish an article; different user cannot access drafts; autosave conflict/failure recovery works; accessible reader; no script injection; no unpublished leak via sitemap/search/OG/cache.

### Phase 3 — Private journaling & discovery

1. Private journal CRUD with owner-only RLS and dated organization; explicit journal-to-draft copy.
2. Search only published articles; filters for topics/category/language; author search; curated discovery layout.
3. Performance/index tuning and privacy tests; zero results, blocked content and localized text handled gracefully.

**Gate:** two-user journal privacy matrix passes; no accidental publish; writer and story discovery useful without engagement pressure.

### Phase 4 — Curated environments & audio

1. Produce original/licensed scenes: Midnight Alley, Window at 2 AM, Last Train Home, Rooftop Rain (café later if ready).
2. Scene asset pipeline, mobile fallback, lazy load and environmental preview; preferences and theme storage.
3. Opt-in licensed audio mixer, Quiet Mode, animation-off settings, accessibility and performance budget.

**Gate:** scene theme is decorative only; mobile remains readable; no initial audio; motion/sound override works; license records are complete.

### Phase 5 — Community appreciation

1. Bookmarks, heart idempotency and aggregate consistency; achievement rule evaluation and optional badge display.
2. Optional muted-by-design notification center and preference controls; avoid socially coercive UI.
3. Rate limiting, anti-manipulation, safe reporting entry point integrated.

**Gate:** no duplicate hearts, private bookmarks stay private, users can disable notifications and hide achievements, no private content reflected in stats.

### Phase 6 — Trust, admin, operations & launch

1. Moderation queues/action logs/appeals, policy enforcement, least-privileged roles.
2. Account data export, deletion and retention, backup/restore exercises, rate limiting and abuse responses.
3. Audited production setup: DNS, secrets, migrations, email deliverability, security/SEO, uptime/error monitoring, accessibility and mobile testing, cost alerts.
4. Pilot with small consenting writer group; fix high-priority issues; then launch gates reviewed explicitly.

**Gate:** documented and rehearsed incidents, working report/appeal, tested data export/deletion, verified operational owner and deployment rollback, privacy/security review, and budget sign-off.

## 8. Testing matrix & measurable quality

| Type | Minimum verification | Execution phase |
|---|---|---|
| Static quality | `npm run typecheck`, `npm run lint`, `npm run build`, dependency/security review | Every PR |
| Browser | `npm test` (Playwright), desktop 1440px / tablet 768px / mobile 390px; keyboard, errors and reduced-motion | Every feature |
| Auth | Signup/confirm/login/recovery/logout/session refresh; token failure paths | 1 then regression |
| Authorization | Two-user profile/article/journal/media matrix, ID spoofing and direct API requests | Every data module |
| Editor | Debounced autosave, network loss, multi-tab version conflict, publish/unpublish, malformed input | 2 |
| Security | XSS, CSRF, SQL/RLS bypass, signed-media scope, upload polyglots, rate limit, admin escalation | 2–6 |
| Accessibility | Screen reader, focus, labels, zoom, contrast, motion/audio disable, touch target | Every UI phase |
| Performance | Lighthouse/Web Vitals on real network profile, image sizes, animation CPU, hydration and bundle audit | Every UI phase |
| Operations | Schema rollback, backup restore, SMTP delivery, observability alerts, moderation workflows | 6 |

**Recommended performance targets (provisional):** Core Web Vitals at the 75th percentile on mobile: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1, measured on representative environments; do not claim targets without measured results. Track image/audio bytes and animation load for low-end Android. Establish automated thresholds only after collecting credible baselines.

**Definition of done for any feature:** linked requirement + acceptance criteria; appropriate auth/RLS policy; responsive and accessible UI; error/loading/empty states; tests green; privacy/security review; migration and rollback documented; observability; README/docs updated; no unexplained console errors; no unlicensed assets; completion report separates verified from assumed behavior.

## 9. Privacy, policy, safety, and ethical constraints

- **Local compliance review:** Philippine Data Privacy Act and related NPC guidance, appropriate international considerations where applicable. Prepare plain-language privacy notice, lawful purposes, data retention and deletion, contact, breach response, children's access policy, and publishing/reporting terms. Legal review required before launch; do not claim this blueprint is legal advice.
- **Sensitive writing:** Assume stories may contain sensitive disclosures. Never repurpose text for model training/analytics without explicit lawful basis and informed consent. Journal drafts should be excluded from ordinary observability/event payloads.
- **Moderation and expression:** Clear behavior rules, anti-harassment and privacy protections, human-review escalation, fair appeals, emergency threat procedures, and carefully limited restrictions.
- **Licenses:** Every font, artwork, sound and third-party dependency needs provenance and compatible license. Existing approved brand fonts Fraunces and Newsreader use OFL; verify licenses for any additions.
- **Secrets:** `.env.local` ignored, `.env.example` placeholder-only; no service role keys in client bundles, logs, screenshots or commits; rotate on suspected leak.
- **Data handling:** Minimize collection and retention; avoid public read permissions on drafts/journals; use safe redacted logging, separate test/prod datasets, account deletion and restore procedures.

## 10. Operations, environments and finances

**Environments:** local, test/staging Supabase + preview deployment, production. Separate projects/credentials and migrations. Document data seeding restricted to non-real sample identities. Test all migrations on staging and back up before production changes.

**Deployment approach:** GitHub `main` protected where possible, preview checks on PRs, Vercel or equivalent hosted Next runtime, Supabase Postgres/Auth/Storage; monitor build, error rate, route uptime and auth failures. Use cost caps/alerts, storage/egress review and free-tier checks; avoid paid external asset/CDN/AI APIs without explicit approval. Define rollback steps for code and forward-safe DB migrations.

**Telemetry (privacy-conscious):** page performance, server exceptions with redacted context, availability, storage/error budgets and manual editorial reporting; no private article bodies in error events. Alert for elevated 5xx, email failures, auth callback errors, DB storage and unauthorized-access anomalies.

## 11. Suggested modular repo layout (future, not a mandate to refactor current Phase 1)

```text
brand/                        # Official immutable source masters
public/brand/                 # Synced runtime subset, generated by npm run assets
src/app/                      # Existing Next.js 16 App Router routes
src/components/               # Reusable accessible UI and environment shells
src/lib/                      # Supabase clients, auth, validation and utilities
src/features/writing/         # Proposed domain grouping, Phase 2
src/features/journal/         # Proposed domain grouping, Phase 3
src/features/discovery/       # Proposed domain grouping, Phase 3
src/features/atmosphere/      # Proposed domain grouping, Phase 4
src/features/moderation/      # Proposed domain grouping, Phase 6
supabase/migrations/          # Immutable ordered SQL migrations
tests/                        # Playwright + auth/RLS/integration fixtures
docs/MASTER_BLUEPRINT.md      # This source of truth
docs/ADR/                      # Proposed architecture decisions, only when needed
```

Before changing routes or folder names, inspect current implementation and preserve working links. Avoid speculative architecture abstraction until use cases require it.

## 12. Key risks, tradeoffs and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Phase 1 auth wired but not live-verified | Account failure, cross-user exposure | Test Supabase and 2-user RLS gate before real signups |
| Pixel scene rendering too heavy | Poor mobile reading and battery drain | Curated compressed layers, lazy assets, reduced motion, measured fallbacks |
| Borrowed Pinterest artwork/audio | Copyright and takedown exposure | Original or permission-cleared assets, provenance registry |
| Autosave overwrites writing | High-trust user harm | Versioned server writes, conflict recovery, local draft rescue, integration tests |
| Draft/journal/search leak | Severe privacy breach | RLS + no-store + search/OG/sitemap isolation + adversarial tests |
| Abuse/spam/moderation burden | User safety and operating cost | Report/rate-limit early, staged pilot, least-privilege admin + appeals |
| Overbuilding aesthetics before editor | Delayed core value | Phase 2 editor and reading before deep environment customization |
| Unexpected hosted-service cost | Budget overrun | Approvals, free-tier limits/alerts, low-cost baseline, monitor egress |
| Premature gamification | Undermines peaceful mission | Optional badges, no streaks/leaderboards, user-controlled notifications |

## 13. Open decisions register

| ID | Question | Recommended default | Decision timing |
|---|---|---|---|
| D-01 | Supabase project/region and deployment environment | Approved test project first; separate production project | Phase 1 verification |
| D-02 | Public article slugs and route shape | Stable article ID plus SEO slug, preserve redirects | Phase 2 schema |
| D-03 | Editor payload representation | Validated Tiptap JSON with safe server renderer | Phase 2 |
| D-04 | Draft history retention + offline recovery | Bounded revisions and conflict prompts; local rescue only with clear privacy warning | Phase 2 |
| D-05 | Image size/MIME and storage policies | Strict allowlist, private until publish, test ACL | Phase 2 |
| D-06 | Journal export/backups/retention | Owner-only download, deletion policy, no public search | Phase 3 |
| D-07 | Language search behavior for Taglish/regional languages | Test corpus + simple normalized match fallback | Phase 3 |
| D-08 | Profile scenes and soundtrack licensing | Original/licensed curated catalog, no user uploads initially | Phase 4 |
| D-09 | Achievement names/thresholds | Optional, culturally sensitive, noncompetitive editorial review | Phase 5 |
| D-10 | Moderator process, appeal time, governance | Human review and logged action, proportional response | Phase 6 |
| D-11 | Domain, trademark, email sender and privacy contact | Validate before public registration; do not assume availability | Prelaunch |
| D-12 | Monetization / sponsorship | None at MVP; protect product integrity | Postpilot |

## 14. Codex execution protocol

When implementing from this blueprint:

1. Inspect `AGENTS.md`, `README.md`, `docs/PHASE_1.md`, current code and existing migrations; **do not reinitialize** or overwrite completed Phase 1.
2. Discover available skills such as **TasteSkill**, **UI/UX Pro Max**, **Superpowers**, **Playwright CLI** and other UI/design skills; read instructions and actually invoke only those accessible in Codex. The `.taste-skill/` directory is present; other skills are not guaranteed. Record real usage honestly.
3. Inspect `brand/README.md`, `brand/brand-guide.html`, `brand/svg/`, and `docs/BRAND_ASSETS.md`; **reuse official Falling Rain masters**, not substitute wordmarks. Preserve `brand/` originals and use `npm run assets` for runtime copies.
4. Read current Next.js 16 guidance under installed `node_modules/next/dist/docs/` before changing its routing/SSR conventions, per project `AGENTS.md`.
5. Start next work with Phase 1 **live verification** if blocked; otherwise implement **Phase 2** incrementally: migration + RLS → domain validation → editor autosave → publication → reader → tests.
6. Keep `docs/MASTER_BLUEPRINT.md`, phase report, schema, security and roadmap synchronized with real implementation. Record decisions and exact test outputs; never mark untested production services as passing.
7. Run `npm run typecheck`, `npm run lint`, `npm run build`, `npm test` (plus new integration/RLS tests) and browser review on meaningful desktop/tablet/mobile sizes. Fix regressions before commit.
8. Review diff, avoid committing secrets/assets without rights, commit descriptive changes and push to `main` only when expected remote state and permissions are confirmed; never force push.
9. End each phase with shipped features, incomplete items, screenshots, test outcomes, open risks and the next gated phase.

## 15. Release readiness checklist

- [ ] Phase 1 auth and DB verified with real test users and production-appropriate email settings.
- [ ] Official brand applied correctly; original assets unchanged and attribution/licensing documented.
- [ ] Phase 2 complete: reliable autosaved drafts, secure publishing and readable article pages.
- [ ] Phase 3 complete: isolated private journals and published-only discovery.
- [ ] Phase 4 complete: licensed atmospheric scenes, optional audio, Quiet Mode and reduced-motion.
- [ ] Phase 5 complete: bookmarks, hearts and optional achievements without coercive ranking.
- [ ] Phase 6 complete: moderation/admin, audit, deletion/export, backup/restore and incidents.
- [ ] Security assessment, two-user RLS matrix and storage authorization tests passing.
- [ ] Mobile accessibility, keyboard/screen-reader and performance measurements reviewed.
- [ ] Privacy/terms/guidelines and operational contacts approved; domains/brand checks completed.
- [ ] Cost monitoring, secret rotation process, release rollback and production observability ready.
- [ ] Pilot feedback reviewed; critical issues closed; explicit launch approval recorded.

---

### Maintenance and change control

Every substantive product/architecture change should include an issue or ADR reference, affected phases/routes/schema/policies, user-facing impact, tests, migration/rollback and asset/license implications. Update version and last-reviewed date when this blueprint changes. Do **not** silently equate a completed repository commit with a verified live launch.

**Silong's promise: the world can keep moving; writing can be a place to pause.**