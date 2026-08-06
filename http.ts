import { appUrl, optionalEnv } from "./config.ts";

function allowedOrigins(): Set<string> {
  const values = optionalEnv("ALLOWED_ORIGINS", appUrl().origin).split(",").map((value) => value.trim()).filter(Boolean);
  values.push(appUrl().origin);
  return new Set(values);
}

export function corsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get("origin") || appUrl().origin;
  const allowed = allowedOrigins();
  return {
    "Access-Control-Allow-Origin": allowed.has(origin) ? origin : appUrl().origin,
    "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

export function json(request: Request, payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), { status, headers: { ...corsHeaders(request), "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } });
}

export function options(request: Request): Response {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

export function redirectToGame(result: "linked" | "error", detail = ""): Response {
  const target = appUrl();
  target.searchParams.set("patreon", result);
  if (detail) target.searchParams.set("detail", detail.slice(0, 180));
  return Response.redirect(target.toString(), 302);
}

export function publicErrorMessage(error: unknown): string {
  const message = error instanceof Error ? error.message : "Unexpected Patreon connection error";
  if (/already linked/i.test(message)) return message;
  if (/expired|invalid state/i.test(message)) return message;
  return "The Patreon connection could not be completed. Please return to the game and try again.";
}
