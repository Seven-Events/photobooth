# Seven Events Photobooth Website - Setup Guide

## Project Overview
This is a Next.js 14 application for the Seven Events Photobooth website. It includes:
- Public pages (home, pricing, booking)
- Client login and dashboard
- Admin interface for managing events
- Supabase integration for authentication and data storage
- Resend integration for transactional emails
- Canva integration for photo template design

## Next Steps

### 1. Create GitHub Repository
You need to create a new GitHub repository for this project. This keeps it completely separate from Client Studio.

**Instructions:**
1. Go to https://github.com/new
2. Create a new repository named `seveneventsphotobooth` (or similar)
3. Add description: "Premium photobooth website"
4. Choose "Private" if desired
5. Do NOT initialize with README (we already have files)

**After creating the repo:**
```bash
cd "C:\Users\taylo\OneDrive\Documents\Business Stuff\Seven Events\photobooth-website"
git remote add origin https://github.com/YOUR_USERNAME/seveneventsphotobooth.git
git branch -M main
git push -u origin main
```

### 2. Set Up Supabase Project
Create a new Supabase project (separate from Client Studio):

1. Go to https://supabase.com and create a new project
2. Create project with name "photobooth-website"
3. Get your credentials:
   - `NEXT_PUBLIC_SUPABASE_URL` (API URL)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Anon key)
   - `SUPABASE_SERVICE_ROLE_KEY` (Service role key from Settings > API)

### 3. Create .env.local File
Copy the `.env.local.example` to `.env.local` and fill in your actual credentials:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` with:
- Supabase credentials from step 2
- Resend API key (you already have this)
- Update `NEXT_PUBLIC_SITE_URL` to your production domain once ready

### 4. Set Up Supabase Database Schema
Create the database tables in Supabase:

1. Go to Supabase Dashboard > SQL Editor
2. Run the following SQL script to create all tables:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  role TEXT CHECK (role IN ('client', 'admin')) DEFAULT 'client',
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  event_date DATE NOT NULL,
  event_time TIME NOT NULL,
  event_title TEXT NOT NULL,
  package_type TEXT CHECK (package_type IN ('bronze', 'silver', 'gold')) NOT NULL,
  special_requests TEXT,
  lumabooth_event_id TEXT,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'completed')) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Backdrops table
CREATE TABLE backdrops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  image_url TEXT,
  description TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT now()
);

-- Photo templates table
CREATE TABLE photo_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events (id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  template_name TEXT,
  canva_design_id TEXT,
  custom_data JSONB,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE backdrops ENABLE ROW LEVEL SECURITY;
ALTER TABLE photo_templates ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users
CREATE POLICY "Users can read their own user record" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admin can read all users" ON users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for events
CREATE POLICY "Users can read their own events" ON events
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admin can read all events" ON events
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can create their own events" ON events
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own events" ON events
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for backdrops
CREATE POLICY "Everyone can read backdrops" ON backdrops
  FOR SELECT USING (active = true);

-- RLS Policies for photo_templates
CREATE POLICY "Users can read their own templates" ON photo_templates
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create templates" ON photo_templates
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own templates" ON photo_templates
  FOR UPDATE USING (auth.uid() = user_id);
```

3. Create storage bucket for images:
   - Go to Storage > Buckets
   - Create new bucket named `photobooth-assets` (private)
   - Create folders: `backdrops/`, `templates/`

### 5. Deploy to Vercel
1. Go to https://vercel.com and sign in
2. Click "Add New" > "Project"
3. Import the GitHub repository you created
4. Add Environment Variables:
   - Copy all variables from `.env.local`
5. Click Deploy

### 6. Set Up Domain
Once deployed, point your domain `seveneventsphotobooth.com` to Vercel:
- See Vercel docs for domain setup
- Add DNS records as instructed by Vercel

### 7. Test the Setup
1. Visit your deployed site
2. Try the booking form
3. Test login/dashboard
4. Verify emails are sent via Resend

## Important Notes
- Keep `SUPABASE_SERVICE_ROLE_KEY` secret (only on server)
- Keep `RESEND_API_KEY` secret (only on server)
- Never commit `.env.local` to git
- Make sure to create some admin users in Supabase manually for admin dashboard access

## Next Development Tasks
1. API routes for booking creation (`/api/bookings`)
2. API routes for authentication (`/api/auth/login`, `/api/auth/register`)
3. Build out full client dashboard
4. Build out full admin dashboard
5. Implement Canva integration
6. Add more backdrops via Supabase Storage

## Support
Refer to the implementation plan at `C:\Users\taylo\.claude\plans\mellow-launching-snowflake.md` for full architecture and next steps.
