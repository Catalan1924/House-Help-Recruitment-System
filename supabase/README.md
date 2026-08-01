# Supabase Infrastructure — HouseConnect Kenya

This directory contains everything needed to set up the Supabase backend for HouseConnect Kenya.

## 📁 Directory Structure

```
supabase/
├── config.toml                          # Supabase CLI configuration for local dev
├── migrations/
│   ├── 00001_initial_schema.sql         # All tables, indexes, relationships
│   ├── 00002_rls_policies.sql           # Row Level Security for every table
│   ├── 00003_triggers_functions.sql     # DB triggers, functions, auto-notifications
│   ├── 00004_seed_data.sql              # Sample data for development
│   └── 00005_storage_policies.sql       # Storage bucket RLS policies
└── functions/
    ├── emergency-alert/
    │   └── index.ts                     # Deno edge function for SOS alerts
    └── send-notification/
        └── index.ts                     # Deno edge function for admin notifications
```

## 🚀 Quick Start

### Option 1: Local Development (Supabase CLI)

```bash
# Install Supabase CLI
npm install -g supabase

# Start local Supabase
supabase start

# Apply migrations
supabase db reset

# Deploy edge functions locally
supabase functions serve

# Generate types for your frontend
supabase gen types typescript --local > ../houseconnect/src/types/supabase.ts
```

### Option 2: Cloud Project (Supabase.com)

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** in the dashboard
3. Run migrations in order:
   - `00001_initial_schema.sql`
   - `00002_rls_policies.sql`
   - `00003_triggers_functions.sql`
   - `00005_storage_policies.sql`
4. Create storage buckets: "avatars" (public) and "documents" (private)
5. Deploy edge functions:
   ```bash
   supabase functions deploy emergency-alert --project-ref YOUR_PROJECT_REF
   supabase functions deploy send-notification --project-ref YOUR_PROJECT_REF
   ```
6. Copy your project URL and anon key to `../houseconnect/.env`

## 📊 Database Schema

### Core Tables
| Table | Purpose |
|-------|---------|
| `profiles` | Base user profile (1:1 with auth.users) |
| `house_help_profiles` | Worker-specific profile data |
| `employer_profiles` | Employer-specific profile data |
| `jobs` | Job listings posted by employers |
| `applications` | Worker applications to jobs |
| `conversations` | Private chat between two users |
| `messages` | Individual messages in conversations |
| `reviews` | Worker ratings and reviews |

### Operations Tables
| Table | Purpose |
|-------|---------|
| `emergency_alerts` | Worker SOS alerts |
| `notifications` | User notification inbox |
| `verification_documents` | ID cards, certificates, etc. |
| `payments` | Payment records (future M-Pesa integration) |

### Database Functions
| Function | Called By | Purpose |
|----------|-----------|---------|
| `handle_new_user()` | Trigger | Auto-creates profile on signup |
| `get_admin_stats()` | Admin dashboard | Returns platform-wide counts |
| `get_employer_stats(id)` | Employer dashboard | Returns employer-specific counts |
| `get_worker_stats(id)` | Worker dashboard | Returns worker-specific counts |
| `search_jobs(...)` | Job search page | Full-text job search with filters |
| `increment_job_view(id)` | Job detail page | Tracks job view counts |

### Database Triggers
| Trigger | When | What |
|---------|------|------|
| `on_auth_user_created` | User signup | Creates profile + role-specific profile |
| `trg_*_updated` | Row update | Auto-updates `updated_at` timestamp |
| `trg_review_rating` | Review insert/update/delete | Recalculates worker average rating |
| `trg_application_status_notify` | Application status change | Notifies worker |
| `trg_new_application_notify` | New application | Notifies employer |
| `trg_new_message_notify` | New message | Notifies recipient |
| `trg_emergency_notify` | Emergency alert created | Notifies all admins |

## 🔐 Row Level Security (RLS)

Every table has granular RLS policies:

- **Workers** can only read/modify their own data
- **Employers** can create jobs and review applications
- **Admins** have full access to all tables
- Public can read open jobs and public profiles
- Messages only visible to conversation participants

See `00002_rls_policies.sql` for the complete policy set.

## 📦 Storage Buckets

1. **avatars** (`public`) — Profile pictures, publicly readable
2. **documents** (`private`) — ID cards, certificates, only owner + admin access

Set these up via SQL Editor or Supabase Dashboard > Storage.

## 🔧 Edge Functions

| Function | Trigger | Auth Required |
|----------|---------|---------------|
| `emergency-alert` | Worker SOS button | Yes (worker) |
| `send-notification` | Admin sends notification | Yes (admin) |

Deploy with:
```bash
supabase functions deploy emergency-alert
supabase functions deploy send-notification
```

## 🛡️ Security Notes

1. **Service role key** must NEVER be exposed to the frontend — it bypasses RLS
2. **Anon key** is safe for the frontend — it respects RLS
3. All edge functions verify JWT before executing
4. Email confirmations are enabled by default (`enable_confirmations = true`)
5. Password minimum length is 8 characters
6. File uploads are limited to 5 MB
