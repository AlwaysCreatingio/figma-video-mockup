# Supabase setup (cloud demos)

Demos are stored in the browser's local IndexedDB by default. To make them **persist across
devices and show on the deployed site**, point the app at a Supabase project. It runs fully
client-side (anon key + row-level security + Storage) — no separate backend.

## 1. Create a project
[supabase.com](https://supabase.com) → New project (free tier is fine).

## 2. Create the table + policies
SQL Editor → New query → run:

```sql
create table if not exists public.demos (
  id          text primary key,
  name        text,
  template_id text,
  thumb       text,       -- small jpeg data-URL thumbnail
  payload     jsonb,      -- vids (storage URLs), logos, boxText, showPlus, hiddenLogos, overrides
  created_at  timestamptz default now()
);
alter table public.demos enable row level security;

-- OPEN policies: anyone can read/write. Fine for a single-user / MVP setup.
-- ⚠️ If your site is public, lock these down later (see bottom).
create policy "demos read"   on public.demos for select using (true);
create policy "demos insert" on public.demos for insert with check (true);
create policy "demos delete" on public.demos for delete using (true);
```

## 3. Create the Storage bucket (for the videos)
Storage → **New bucket** → name it exactly `demo-media` → toggle **Public** → create.

Then allow uploads/deletes (SQL Editor):

```sql
create policy "demo-media read"   on storage.objects for select using (bucket_id = 'demo-media');
create policy "demo-media insert" on storage.objects for insert with check (bucket_id = 'demo-media');
create policy "demo-media delete" on storage.objects for delete using (bucket_id = 'demo-media');
```

## 4. Wire the keys
Project Settings → API. Copy **Project URL** and the **anon public** key into `_supabase.js`:

```js
window.__SUPABASE = {
  url: "https://YOURPROJECT.supabase.co",
  anonKey: "eyJ...your-anon-public-key...",
};
```

The anon key is meant to be public (it's shipped to the browser); access is gated by the RLS
policies above. Rebuild (`npm run build`) / redeploy and demos now sync to Supabase. On Vercel,
`_supabase.js` is served from `public/` by the build.

## Locking it down later (recommended for a public site)
Open policies let anyone write. To restrict to signed-in users, add Supabase Auth and replace the
`insert`/`delete` policies with `to authenticated`, and add a `user_id uuid default auth.uid()`
column with `using (auth.uid() = user_id)`. Ask and I'll wire the auth UI.
