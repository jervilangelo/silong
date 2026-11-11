# Security

No secrets belong in Git. Configure only the public Supabase URL/publishable key and canonical site URL. No privileged key is required. Empty URL/key means backend unavailable; partial/invalid configuration fails validation rather than fabricating a service.

Server identity uses Supabase getUser; protected layouts and mutation actions both check identity. RLS is the final ownership boundary. Callback destinations are allowlisted to dashboard or password update, avoiding open redirects. PKCE confirmation/recovery links must be opened in the browser initiating the request.

React escapes profile text; no raw user HTML is rendered. Input is length-limited in forms, Zod and SQL. Avatar uploads remain disabled, with a null-only schema check. Future uploads require ownership paths, MIME and byte limits, image decoding/re-encoding, bucket policies and malware handling as appropriate.

Before production: run the two-user RLS matrix, configure Supabase auth rate limits and SMTP, verify recovery/verification paths, configure HTTPS and domain redirect allowlists, review legal notices, add security headers and operational monitoring. Dependency audit results are recorded in PHASE_1.md.
