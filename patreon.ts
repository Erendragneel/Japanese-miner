import { optionalEnv, requiredEnv, tierMap } from "./config.ts";

type JsonApiResource = {
  id?: string;
  type?: string;
  attributes?: Record<string, unknown>;
  relationships?: Record<string, { data?: JsonApiResource | JsonApiResource[] | null }>;
};

type PatreonPayload = { data?: JsonApiResource | JsonApiResource[]; included?: JsonApiResource[] };

export type MembershipSnapshot = {
  patreonUserId: string;
  memberId: string | null;
  campaignId: string;
  tier: number;
  patreonTierId: string | null;
  entitledTierIds: string[];
  patronStatus: string | null;
  lastChargeStatus: string | null;
};

const USER_AGENT = optionalEnv("PATREON_USER_AGENT", "Japanese Miner - Membership Linking");

async function patreonFetch(url: string, token: string): Promise<PatreonPayload> {
  const response = await fetch(url, { headers: { Authorization: `Bearer ${token}`, Accept: "application/json", "User-Agent": USER_AGENT } });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(`Patreon API request failed (${response.status})`);
  return payload as PatreonPayload;
}

export async function exchangeAuthorizationCode(code: string): Promise<string> {
  const body = new URLSearchParams({
    code,
    grant_type: "authorization_code",
    client_id: requiredEnv("PATREON_CLIENT_ID"),
    client_secret: requiredEnv("PATREON_CLIENT_SECRET"),
    redirect_uri: `${requiredEnv("SUPABASE_URL").replace(/\/$/, "")}/functions/v1/patreon-callback`,
  });
  const response = await fetch("https://www.patreon.com/api/oauth2/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json", "User-Agent": USER_AGENT }, body });
  const payload = await response.json().catch(() => ({})) as Record<string, unknown>;
  if (!response.ok || typeof payload.access_token !== "string") throw new Error("Patreon rejected the authorization code");
  return payload.access_token;
}

function resourceArray(value: JsonApiResource | JsonApiResource[] | undefined): JsonApiResource[] {
  return Array.isArray(value) ? value : value ? [value] : [];
}

function relationIds(resource: JsonApiResource, name: string): string[] {
  const data = resource.relationships?.[name]?.data;
  return resourceArray(data as JsonApiResource | JsonApiResource[] | undefined).map((item) => String(item.id || "")).filter(Boolean);
}

function snapshotFrom(payload: PatreonPayload, fallbackUserId = ""): MembershipSnapshot {
  const campaignId = requiredEnv("PATREON_CAMPAIGN_ID");
  const primary = resourceArray(payload.data);
  const included = Array.isArray(payload.included) ? payload.included : [];
  const all = [...primary, ...included];
  const member = all.find((item) => item.type === "member" && relationIds(item, "campaign").includes(campaignId)) || all.find((item) => item.type === "member");
  const identity = primary.find((item) => item.type === "user");
  const patreonUserId = String(identity?.id || relationIds(member || {}, "user")[0] || fallbackUserId || "");
  if (!patreonUserId) throw new Error("Patreon did not return a user identity");
  const entitledTierIds = member ? relationIds(member, "currently_entitled_tiers") : [];
  const mapping = tierMap();
  const mapped = entitledTierIds.map((id) => ({ id, tier: mapping.get(id) || 0 })).sort((a, b) => b.tier - a.tier);
  const patronStatus = typeof member?.attributes?.patron_status === "string" ? member.attributes.patron_status : null;
  const lastChargeStatus = typeof member?.attributes?.last_charge_status === "string" ? member.attributes.last_charge_status : null;
  const chargeRejected = /declin|fraud|fail/i.test(lastChargeStatus || "");
  const tier = patronStatus === "active_patron" && !chargeRejected ? (mapped[0]?.tier || 0) : 0;
  return { patreonUserId, memberId: member?.id ? String(member.id) : null, campaignId, tier, patreonTierId: tier > 0 ? mapped[0]?.id || null : null, entitledTierIds, patronStatus, lastChargeStatus };
}

export async function fetchIdentityMembership(accessToken: string): Promise<MembershipSnapshot> {
  const params = new URLSearchParams({ include: "memberships.currently_entitled_tiers,memberships.campaign", "fields[member]": "patron_status,last_charge_status,currently_entitled_amount_cents", "fields[tier]": "title,amount_cents" });
  const payload = await patreonFetch(`https://www.patreon.com/api/oauth2/v2/identity?${params}`, accessToken);
  return snapshotFrom(payload);
}

export async function fetchCampaignMember(memberId: string): Promise<MembershipSnapshot> {
  const params = new URLSearchParams({ include: "currently_entitled_tiers,user,campaign", "fields[member]": "patron_status,last_charge_status,currently_entitled_amount_cents", "fields[tier]": "title,amount_cents" });
  const payload = await patreonFetch(`https://www.patreon.com/api/oauth2/v2/members/${encodeURIComponent(memberId)}?${params}`, requiredEnv("PATREON_CREATOR_ACCESS_TOKEN"));
  return snapshotFrom(payload);
}

export function connectionRow(userId: string, snapshot: MembershipSnapshot) {
  return { user_id: userId, patreon_user_id: snapshot.patreonUserId, patreon_member_id: snapshot.memberId, campaign_id: snapshot.campaignId, game_tier: snapshot.tier, patreon_tier_id: snapshot.patreonTierId, entitled_tier_ids: snapshot.entitledTierIds, patron_status: snapshot.patronStatus, last_charge_status: snapshot.lastChargeStatus, verified_at: new Date().toISOString(), updated_at: new Date().toISOString() };
}

export function tierName(tier: number): string {
  return ["No active tier", "Supporter", "Companion Keeper", "Settlement Founder"][Math.max(0, Math.min(3, Number(tier) || 0))];
}
