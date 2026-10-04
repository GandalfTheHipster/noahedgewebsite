# noahedge.com

Personal site built with Next.js.

Supabase authentication is temporarily disabled. The navigation has no login
control, and `/auth/*` and `/protected/*` redirect to the homepage. Supabase
clients are disabled even when credentials are configured.

To restore authentication, set `supabaseEnabled` to `true` in
`lib/supabase/env.ts` and restore the authentication control in
`components/site-nav.tsx`. The existing integration and dependencies are retained.
