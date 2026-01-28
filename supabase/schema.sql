-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES (Extends auth.users, similar to User model)
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  company_name text,
  contact_name text,
  phone text,
  role text default 'client', -- client, admin, sales
  is_franchise boolean default false,
  franchise_locations int,
  created_at timestamptz default now()
);

-- Enable RLS for profiles
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

create policy "Users can insert their own profile." on public.profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on public.profiles
  for update using (auth.uid() = id);

-- ADDRESSES (Linked to Profiles)
create table public.addresses (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  label text,
  street text,
  city text,
  postal_code text,
  country text default 'France',
  is_default_shipping boolean default false,
  is_default_billing boolean default false
);

alter table public.addresses enable row level security;

create policy "Users can see their own addresses" on public.addresses
  for select using (auth.uid() = user_id);

create policy "Users can insert their own addresses" on public.addresses
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own addresses" on public.addresses
  for update using (auth.uid() = user_id);

create policy "Users can delete their own addresses" on public.addresses
  for delete using (auth.uid() = user_id);


-- PRODUCTS
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  category text not null,
  description text,
  min_quantity int default 500,
  base_prices jsonb, -- Store pricing dict
  image_url text,
  specs jsonb, -- Store specs dict
  available_sizes jsonb, -- List of sizes
  available_prints jsonb, -- List of print types
  is_active boolean default true,
  created_at timestamptz default now()
);

-- RLS for Products (Public Read, Admin Write)
alter table public.products enable row level security;
create policy "Products are viewable by everyone" on public.products
  for select using (true);

-- ORDERS
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  status text default 'draft',
  items jsonb not null, -- Store order items as JSON
  total_price float not null,
  design_file_url text,
  notes text,
  shipping_address jsonb,
  billing_address jsonb,
  tracking_number text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS for Orders
alter table public.orders enable row level security;
create policy "Users can see their own orders" on public.orders
  for select using (auth.uid() = user_id);
create policy "Users can create their own orders" on public.orders
  for insert with check (auth.uid() = user_id);


-- QUOTE REQUESTS
create table public.quote_requests (
  id uuid default uuid_generate_v4() primary key,
  company_name text,
  contact_name text,
  email text,
  phone text,
  product_type text,
  size text,
  quantity int,
  print_type text,
  estimated_price float,
  message text,
  design_file_url text,
  is_franchise boolean,
  franchise_locations int,
  annual_consumption int,
  status text default 'pending',
  created_at timestamptz default now()
);

-- AI DESIGNS
create table public.ai_designs (
  id uuid default uuid_generate_v4() primary key,
  business_type text,
  product_type text,
  volume_estimate text,
  brand_style text,
  text_on_bag text,
  business_name text,
  prompt_generated text,
  strategic_advice text,
  image_url text,
  lead_score text,
  created_at timestamptz default now()
);

-- RLS for AI Designs (Public create/read for demo purposes, or linked to user?)
-- For now, allow public insert/read as per current app flow (pre-login)
alter table public.ai_designs enable row level security;
create policy "Anyone can create designs" on public.ai_designs for insert with check (true);
create policy "Anyone can read designs" on public.ai_designs for select using (true);


-- VISIO REQUESTS (Gros Profil)
create table public.visio_requests (
  id uuid default uuid_generate_v4() primary key,
  ai_design_id uuid references public.ai_designs(id),
  nom_entreprise text,
  nom_contact text,
  email text,
  telephone text,
  notes text,
  status text default 'pending',
  created_at timestamptz default now()
);

alter table public.visio_requests enable row level security;
create policy "Anyone can create visio requests" on public.visio_requests for insert with check (true);

-- QUOTE REQUESTS V2 (Petit Profil)
create table public.quote_requests_v2 (
  id uuid default uuid_generate_v4() primary key,
  ai_design_id uuid references public.ai_designs(id),
  nom_entreprise text,
  nom_contact text,
  email text,
  telephone text,
  notes text,
  status text default 'pending',
  created_at timestamptz default now()
);

alter table public.quote_requests_v2 enable row level security;
create policy "Anyone can create quote requests v2" on public.quote_requests_v2 for insert with check (true);
