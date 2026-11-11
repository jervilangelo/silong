create table public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 username text not null unique check (username ~ '^[a-z][a-z0-9_]{2,23}$' and username not in ('admin','api','auth','about','dashboard','explore','signin','signup','settings','silong','support','help','www','profile','u','terms','privacy','community-guidelines')),
 pen_name text not null check (char_length(trim(pen_name)) between 1 and 80),
 bio text not null default '' check (char_length(bio)<=500),
 avatar_path text check (avatar_path is null),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
comment on column public.profiles.avatar_path is 'Reserved for a future validated storage upload flow; null only in Phase 1.';
alter table public.profiles enable row level security;
revoke all on public.profiles from anon,authenticated;
grant select on public.profiles to anon,authenticated;
grant insert(id,username,pen_name,bio) on public.profiles to authenticated;
grant update(username,pen_name,bio) on public.profiles to authenticated;
create policy "Public profiles are readable" on public.profiles for select using (true);
create policy "Users create their own profile" on public.profiles for insert to authenticated with check ((select auth.uid())=id);
create policy "Users update their own profile" on public.profiles for update to authenticated using ((select auth.uid())=id) with check ((select auth.uid())=id);
create function public.touch_profile() returns trigger language plpgsql set search_path='' as $$ begin new.updated_at=now(); return new; end; $$;
create trigger profiles_updated before update on public.profiles for each row execute function public.touch_profile();
