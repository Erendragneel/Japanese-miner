create table if not exists public.app_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'owner' check (role in ('owner', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.app_admins enable row level security;

drop policy if exists "Administrators can verify their own access" on public.app_admins;
create policy "Administrators can verify their own access"
  on public.app_admins
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

revoke all on table public.app_admins from anon;
revoke insert, update, delete on table public.app_admins from authenticated;
grant select on table public.app_admins to authenticated;

comment on table public.app_admins is
  'Server-owned Language Miner administrator identities. Rows are managed only from trusted Supabase administration.';
