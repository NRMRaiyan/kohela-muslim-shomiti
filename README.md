# Kohela Muslim Shomitti — Website

The official website for **Kohela Muslim Shomitti (কোহেলা মুসলিম সমিতি)** — news,
notices, events, committee, gallery, and history, with a full admin dashboard so
you can keep everything up to date yourself, no developer needed after setup.

Built with Next.js, PostgreSQL (via Drizzle ORM), and Tailwind CSS.

---

## 1. What you're getting

- **Public website**: Home, About, Committee, News, Notices, Events, Gallery, Contact
- **English / Bangla toggle** on every page
- **Admin dashboard** at `/admin` — add/edit/delete news, notices, events, committee
  members, and gallery photos; edit all site text (history, mission, contact info,
  social links) from one Settings page; read messages sent through the Contact form
- **Photo uploads** straight from the admin panel (or paste an image URL instead)

You don't need to touch any code to run the site day-to-day. Everything below is a
**one-time setup** — after that, you just log into `/admin` whenever you want to
publish something.

---

## 2. One-time setup (about 20–30 minutes)

You said you don't have hosting or a domain yet, so here's the full path using
**free tiers** for everything except the domain name itself.

### Step 1 — Create a free database (Neon)

1. Go to **[neon.tech](https://neon.tech)** and sign up (free).
2. Create a new project (any name, e.g. "kohela-shomitti").
3. On the project dashboard, copy the **connection string** — it looks like
   `postgres://user:password@ep-xxxx.neon.tech/dbname?sslmode=require`.
   Keep this safe, you'll need it twice below.

*(Supabase.com is a fine alternative if you prefer it — same idea, copy the
Postgres connection string from Project Settings → Database.)*

### Step 2 — Put the code on GitHub

1. Create a free account at **[github.com](https://github.com)** if you don't have one.
2. Create a new repository (e.g. `kohela-shomitti-website`).
3. Upload the contents of this project folder to that repository (GitHub's
   "upload files" button works, or ask any developer friend to `git push` it —
   takes 2 minutes for someone familiar with git).

### Step 3 — Deploy to Vercel

1. Go to **[vercel.com](https://vercel.com)** and sign up with your GitHub account (free).
2. Click **Add New → Project**, select the repository you just created.
3. Before clicking Deploy, open **Environment Variables** and add:

   | Name | Value |
   |---|---|
   | `DATABASE_URL` | the Neon connection string from Step 1 |
   | `SESSION_SECRET` | any long random text — e.g. generate one at generate-secret.vercel.app/32 |

4. Click **Deploy**. In about a minute you'll get a live URL like
   `kohela-shomitti.vercel.app`.

### Step 4 — Create the database tables

You need to run this once so the database has the right structure.

1. On your own computer, install [Node.js](https://nodejs.org) if you don't have it.
2. Download this project folder, open a terminal inside it, and run:
   ```bash
   npm install
   ```
3. Create a file named `.env.local` in the project folder (copy `.env.example`
   and fill in the same `DATABASE_URL` and `SESSION_SECRET` you used on Vercel).
4. Run:
   ```bash
   npm run db:push
   ```
   This creates all the tables in your Neon database.

### Step 5 — Seed your admin account and starter content

Still in the same terminal:

```bash
npm run db:seed
```

This creates your first admin login. By default it's:

- **Email:** `admin@kohelashomitti.org`
- **Password:** `ChangeMe123!`

To use your own instead, add these two lines to `.env.local` before seeding:

```
SEED_ADMIN_EMAIL="your-email@example.com"
SEED_ADMIN_PASSWORD="a-strong-password"
```

**Log in at `your-site.vercel.app/admin/login`.** There's no in-app
password-change form yet — if you want one added, or want to add more admin
accounts for other committee members, re-run the seed script with different
values, or ask a developer to add a row to the `admin_users` table.

### Step 6 (optional) — Enable direct photo uploads

Without this step, the admin panel still works — you just paste an image URL
(e.g. from Facebook or Google Photos) instead of uploading a file directly.
To enable direct uploads:

1. In your Vercel project, go to **Storage → Create Database → Blob**.
2. Vercel automatically adds a `BLOB_READ_WRITE_TOKEN` environment variable —
   no need to copy anything manually.
3. Redeploy (Vercel does this automatically when you add a storage integration).

### Step 7 (optional) — Connect your own domain

1. Buy a domain (e.g. from Namecheap, GoDaddy, or a local Bangladeshi registrar).
2. In your Vercel project, go to **Settings → Domains**, add your domain, and
   follow the DNS instructions Vercel shows you.

---

## 3. Using the site day-to-day

- Go to `your-site.com/admin`, log in.
- **News** — full articles with an optional image and PDF attachment.
- **Notices** — short official announcements (meeting schedules, Zakat
  collection info, etc.), with an option to show on the homepage.
- **Events** — anything with a date; automatically sorts into "Upcoming" and
  "Previous" on the public Events page.
- **Committee** — add members with photos, positions, and contact info.
- **Gallery** — upload photos, organize by category (e.g. "Eid Program", "Mosque").
- **Messages** — anything submitted through the public Contact form shows up here.
- **Site Settings** — edit the history, mission, vision, address, phone, email,
  and social media links shown across the site. Every text field has an English
  and a Bangla version — fill in whichever you have; if Bangla is left blank,
  English is shown instead.

Everything you publish appears on the live site within a few seconds — no manual
"deploy" step needed for content changes.

---

## 4. Local development (for a developer working on the code)

```bash
npm install
cp .env.example .env.local   # fill in DATABASE_URL and SESSION_SECRET
npm run db:push              # create tables
npm run db:seed              # create admin user + sample content
npm run dev                  # http://localhost:3000
```

Useful scripts:

| Command | What it does |
|---|---|
| `npm run dev` | Start the local dev server |
| `npm run build` | Production build (what Vercel runs) |
| `npm run db:push` | Sync the database schema (use during setup / after schema changes) |
| `npm run db:seed` | Create the first admin user and sample content |
| `npm run db:studio` | Opens a visual browser for your database (Drizzle Studio) |

## 5. Project structure

```
src/
  app/            Pages (App Router) — one folder per route
    admin/        Admin dashboard (protected by login)
    api/upload/   Image upload endpoint (Vercel Blob)
  components/     Reusable UI pieces
  db/             Database schema (schema.ts) and client (index.ts)
  lib/            Auth, i18n dictionary, data-fetching helpers
scripts/seed.ts   Creates the first admin user + starter content
```

---

If anything in this setup doesn't make sense, any web developer will be able to
follow Steps 1–7 above in well under an hour — it's a fairly standard Next.js +
Postgres deployment.
