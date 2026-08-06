import { createClient, type SupabaseClient, type User } from "./deps.ts";
import { requiredEnv, supabaseUrl } from "./config.ts";

export function serviceClient(): SupabaseClient {
  return createClient(supabaseUrl(), requiredEnv("SUPABASE_SERVICE_ROLE_KEY"), { auth: { persistSession: false, autoRefreshToken: false } });
}

export async function requireUser(request: Request): Promise<User> {
  const header = request.headers.get("authorization") || "";
  const token = header.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) throw new Error("Unauthorized");
  const { data, error } = await serviceClient().auth.getUser(token);
  if (error || !data.user) throw new Error("Unauthorized");
  return data.user;
}
