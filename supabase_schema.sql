-- Run this in your Supabase project's SQL Editor (Database > SQL Editor > New query)

create table crewmates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  character_class text not null,
  race text not null,
  weapon text not null,
  alignment text not null,
  level int not null default 1,
  backstory text,
  created_at timestamp with time zone default now()
);

-- Optional but recommended: allow public read/write for this class project.
-- (Do NOT do this for a real production app with sensitive data!)
alter table crewmates enable row level security;

create policy "Public can do anything"
on crewmates
for all
using (true)
with check (true);
