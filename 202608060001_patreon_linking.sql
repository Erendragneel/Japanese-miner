create extension if not exists pgcrypto;

create table if not exists public.patreon_connections (
  user_id uuid primary key references auth.users(id) on delete cascade,
  patreon_user_id text not null unique,
  patreon_member_id text unique,
  campaign_id text not null,
  game_tier smallint not null default 0 check (game_tier between 0 and 3),
  patreon_tier_id text,
  entitled_tier_ids jsonb not null default '[]'::jsonb,
  patron_status text,
  last_charge_status text,
  connected_at timestamptz not null default now(),
  verified_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.patreon_oauth_states (
  state_digest text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create index if not exists patreon_connections_member_id_idx
  on public.patreon_connections (patreon_member_id);
create index if not exists patreon_oauth_states_user_id_idx
  on public.patreon_oauth_states (user_id);
create index if not exists patreon_oauth_states_expires_at_idx
  on public.patreon_oauth_states (expires_at);

alter table public.patreon_connections enable row level security;
alter table public.patreon_oauth_states enable row level security;

drop policy if exists "Supporters can read their own Patreon connection" on public.patreon_connections;
create policy "Supporters can read their own Patreon connection"
  on public.patreon_connections
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

revoke all on table public.patreon_oauth_states from anon, authenticated;
revoke insert, update, delete on table public.patreon_connections from anon, authenticated;
grant select on table public.patreon_connections to authenticated;
