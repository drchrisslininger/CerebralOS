# Cerebral Staff Dashboard — live web app

This folder is the standalone, installable version of the staff dashboard (checklists + daily stats).
It runs in any browser, works on desktop and phone, and can be "installed" so it gets its own icon.
It reads and writes the same Supabase database as everything else.

There are **two one-time setup steps** before it goes live. Neither requires coding.

The app uses **one gate: a login.** Sign in once and you land on the role tabs — tap your role and work. It remembers your last role, so most days it opens right where you left off.

---

## Step 1 — Turn on login and create a staff account (Supabase)

1. Go to **supabase.com** → open the **cerebral-os** project.
2. Left sidebar → **Authentication** → **Sign In / Providers** → make sure **Email** is enabled.
   - Turn **OFF** "Confirm email" (so the account works immediately without an email link), or leave it on and confirm the email — your choice.
3. Left sidebar → **Authentication** → **Users** → **Add user** → **Create new user**.
   - Use a shared clinic login, e.g. **staff@cerebralchiropractic.com**, and a password the team will use.
   - (You can create one shared account for the front-desk computer, or one account per person — either works.)

That email + password is what staff type on the first screen.

## Step 2 — Put it online with GitHub Pages

1. Create a free account at **github.com** if you don't have one.
2. Create a **new repository** (e.g. `cerebral-staff`). Make it **Private** if you prefer; Pages still works.
3. Upload **all the files in this folder** (index.html, manifest.webmanifest, service-worker.js, logo.png, and the `icons` folder) to the repository — drag and drop them into the "Add file → Upload files" page.
4. In the repo: **Settings → Pages → Build and deployment → Source = "Deploy from a branch"**, branch = `main`, folder = `/ (root)`, **Save**.
5. Wait ~1 minute. GitHub shows a URL like `https://YOURNAME.github.io/cerebral-staff/`. That's the live app.

---

## Install it as an app (the icon)

- **Desktop (Chrome/Edge):** open the URL, click the **install icon** in the address bar (or the app's "Install app" button). It gets a dock/desktop icon and opens in its own window.
- **iPhone (Safari):** open the URL → **Share** → **Add to Home Screen**.
- **Android (Chrome):** open the URL → menu → **Install app / Add to Home screen**.

## What works here
- Sign in → station PIN → role board.
- All three roles (Front Desk, Chiropractic Assistant, Office Manager) with Checklist + Stats.
- Checklist completions and daily stats save to the shared database in real time.
- Light/dark toggle, full calendar, responsive on any screen size.

## Notes
- The **owner command center** (email triage, calendar, AI drafting) is **not** in this app yet — those features need a small backend and are the next phase.
- The Supabase address and public key are already filled into `index.html`. The public key is safe to publish; the database security rules (already set) require a valid login to read or write anything.
- If you ever rotate the Supabase key, update `SUPABASE_KEY` in the `CONFIG` block of `index.html`.
