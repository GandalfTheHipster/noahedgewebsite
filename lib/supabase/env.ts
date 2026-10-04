// Temporarily disabled while the site runs without authentication.
export const supabaseEnabled = false;

const supabaseUrl =
  process.env.NEXT_PUBLIC_NOAHEDGEDOTCOM_SUPABASE_URL ??
  process.env.NEXT_PUBLIC_SUPABASE_URL;

const supabasePublishableKey =
  process.env.NEXT_PUBLIC_NOAHEDGEDOTCOM_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const hasSupabaseEnv = supabaseEnabled && Boolean(supabaseUrl && supabasePublishableKey);

export function getSupabaseEnv(): {
  supabaseUrl: string;
  supabasePublishableKey: string;
} {
  if (!supabaseEnabled) {
    throw new Error("Supabase is temporarily disabled.");
  }

  const url = supabaseUrl;
  const publishableKey = supabasePublishableKey;
  const missing: string[] = [];

  if (!url) {
    missing.push(
      "NEXT_PUBLIC_NOAHEDGEDOTCOM_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL",
    );
  }

  if (!publishableKey) {
    missing.push(
      "NEXT_PUBLIC_NOAHEDGEDOTCOM_SUPABASE_PUBLISHABLE_KEY, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, or NEXT_PUBLIC_SUPABASE_ANON_KEY",
    );
  }

  if (missing.length > 0) {
    throw new Error(
      `Supabase is not configured. Missing: ${missing.join("; ")}.`,
    );
  }

  if (!url || !publishableKey) {
    throw new Error("Supabase is not configured.");
  }

  return {
    supabaseUrl: url,
    supabasePublishableKey: publishableKey,
  };
}
