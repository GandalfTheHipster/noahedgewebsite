# noahedge.com

Personal site built with Next.js.

Supabase authentication is temporarily disabled. The navigation has no login
control, and `/auth/*` and `/protected/*` redirect to the homepage. Supabase
clients are disabled even when credentials are configured.

### Bape portrait history

Click a portrait in a person's profile modal to view their current and previous
portraits. Portrait data lives in `lib/data/BapeProfiles.ts`.

When replacing `avatarUrl`, first copy the old image into `portraitHistory`
(newest first), including its `addedOn`, `isAiGenerated`, and `swappedOutOn`
date. Then update `avatarUrl`, `avatarAddedOn`, and `avatarIsAiGenerated` for
the new portrait. Added dates can use `YYYY` or `YYYY-MM-DD`; swapped-out dates
use `YYYY-MM-DD`. Leave unknown added dates and AI
status unset, and use `swappedOutOn: null` for unknown replacement dates.
Only portraits explicitly marked `isAiGenerated: true` (or
`avatarIsAiGenerated: true` for the current image) receive an AI label.

Example historical entry:

```ts
portraitHistory: [
  {
    imageUrl: "/images/players/previous-portrait.webp",
    addedOn: "2025-01-15",
    swappedOutOn: "2026-10-06",
    isAiGenerated: true,
  },
],
```

To restore authentication, set `supabaseEnabled` to `true` in
`lib/supabase/env.ts` and restore the authentication control in
`components/site-nav.tsx`. The existing integration and dependencies are retained.
