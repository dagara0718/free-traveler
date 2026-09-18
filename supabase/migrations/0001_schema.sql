-- Free Traveler base schema — 6 tables only (user_profile, mate_post,
-- mate_application, user_block, report, admin_setting). No audit log,
-- media, or CMS content tables (destinations/safety/profile stay in
-- src/data as static content).

create table if not exists user_profile (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null,
  role text not null default 'member' check (role in ('member', 'moderator', 'admin')),
  is_adult boolean not null default false,
  is_adult_confirmed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists mate_post (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references user_profile (id) on delete cascade,
  title text not null,
  country_code text not null,
  region text not null,
  start_date date not null,
  end_date date not null,
  headcount integer not null check (headcount >= 1),
  style text,
  description text not null,
  status text not null default 'recruiting' check (status in ('recruiting', 'closing_soon', 'closed')),
  safety_ack boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_date >= start_date)
);

create table if not exists mate_application (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references mate_post (id) on delete cascade,
  applicant_id uuid not null references user_profile (id) on delete cascade,
  message text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (post_id, applicant_id)
);

create table if not exists user_block (
  id uuid primary key default gen_random_uuid(),
  blocker_id uuid not null references user_profile (id) on delete cascade,
  blocked_id uuid not null references user_profile (id) on delete cascade,
  created_at timestamptz not null default now(),
  check (blocker_id <> blocked_id),
  unique (blocker_id, blocked_id)
);

create table if not exists report (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references user_profile (id) on delete cascade,
  target_type text not null check (target_type in ('mate_post', 'mate_application', 'user_profile')),
  target_id uuid not null,
  reason text not null,
  status text not null default 'open' check (status in ('open', 'reviewing', 'resolved')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists admin_setting (
  key text primary key,
  value jsonb not null,
  updated_by uuid references user_profile (id),
  updated_at timestamptz not null default now()
);
