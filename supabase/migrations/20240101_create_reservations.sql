-- Create reservations table
create table public.reservations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  date date not null,
  time time not null,
  guests integer not null,
  name text not null,
  email text not null,
  phone text,
  special_requests text,
  status text default 'Confirmed' check (status in ('Confirmed', 'Cancelled', 'Pending')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.reservations enable row level security;

-- Create policies
create policy "Users can view their own reservations" on public.reservations
  for select using (auth.uid() = user_id);

create policy "Users can insert their own reservations" on public.reservations
  for insert with check (auth.uid() = user_id);

create policy "Admins can view all reservations" on public.reservations
  for select using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

create policy "Admins can update reservations" on public.reservations
  for update using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );
