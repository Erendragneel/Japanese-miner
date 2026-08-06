export function requiredEnv(name: string): string {
  const value = Deno.env.get(name)?.trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export function optionalEnv(name: string, fallback = ""): string {
  return Deno.env.get(name)?.trim() || fallback;
}

export function supabaseUrl(): string { return requiredEnv("SUPABASE_URL").replace(/\/$/, ""); }
export function appUrl(): URL { return new URL(requiredEnv("APP_URL")); }
export function patreonCallbackUrl(): string { return `${supabaseUrl()}/functions/v1/patreon-callback`; }
export function offlineGraceDays(): number {
  const value = Number(optionalEnv("PATREON_OFFLINE_GRACE_DAYS", "7"));
  return Number.isFinite(value) ? Math.max(0, Math.min(30, value)) : 7;
}

export function tierMap(): Map<string, number> {
  return new Map([
    [requiredEnv("PATREON_TIER_1_ID"), 1],
    [requiredEnv("PATREON_TIER_2_ID"), 2],
    [requiredEnv("PATREON_TIER_3_ID"), 3],
  ]);
}
