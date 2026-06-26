# Draincheck

> See what's draining your wallet. A privacy-first web app that uses **read-only** Gmail access to find your recurring subscriptions and summarize monthly spend — without storing your email.

**🔗 Live demo (no login):** https://draincheck-demo-kp.netlify.app/?demo=1

**One-sentence description:** Draincheck scans Gmail (read-only) for receipts and renewals, identifies recurring subscriptions vs. one-time purchases across 90+ known services, and shows a clean dashboard of monthly spend by category.

## ▶ Try it now — no login required

**Open the app and click "Explore the live demo"** (or visit `/?demo=1`). The full dashboard loads with **fictional sample data** — no Google account, no backend, nothing to install. This is the fastest way to see what Draincheck does.

> The demo is clearly badged **"Demo data"** and uses made-up subscriptions (Netflix, Adobe, Spotify, a gym with a failed payment, a cancelled Disney+, two one-time purchases…). No real personal data is involved.

## The problem
People quietly leak money to forgotten or creeping subscriptions and have no single view of them. Tools that promise this often demand broad access or upload your inbox to their servers.

## The solution
- **Read-only** Google OAuth (`gmail.readonly`) — Draincheck can read, never modify or send.
- Serverless functions search Gmail for receipts/renewals and run them through an extraction engine (90+ service dictionary + price/recurrence/card detection).
- A dashboard groups results into **recurring subscriptions** vs. **one-time payments**, with category breakdown, sorting, and monthly totals.
- **Nothing is stored** — auth tokens live in encrypted, expiring, HTTP-only cookies; email bodies are never persisted.

## Verified features
- **Subscription extraction engine** (`netlify/shared/extract.mjs`) — classifies emails (welcome/renewal/receipt/failed/cancellation), groups by service, detects price, frequency, card, charge history, and recurring-vs-one-time. ✅ real implementation (code-reviewed).
- **Read-only OAuth + serverless API** (`netlify/functions/*`) — Google OAuth flow, Gmail search, encrypted cookie sessions. ✅ real implementation (code-reviewed; live Gmail flow requires your own Google credentials — not exercised in the portfolio pass).
- **Dashboard** — stats row, category breakdown, category filter, sort, expandable subscription cards (status, card, charge history, "View in Gmail"), collapsible one-time payments. ✅ renders.
- **Demo mode** (added in this pass) — `/?demo=1` or the "Explore the live demo" button loads fictional data so the whole dashboard is explorable with no account/backend. ✅ verified in the production build and serving.

## My role
Solo, self-directed project built with AI-assisted development (Codex). I designed the privacy model (read-only scope, no stored email, data in cookies), built the OAuth + serverless API, wrote the subscription-extraction engine, and built the React dashboard. **In this portfolio polish pass I added a full demo mode** (fictional dataset + `?demo=1` shareable link + login-screen entry + simulated scan + "Demo data" badge) so recruiters can experience the product without connecting a real inbox.

## Technology stack
- **Frontend:** React 18, Vite, Tailwind CSS, Framer Motion
- **Backend:** Netlify Functions (serverless, Node 20), `googleapis` (Gmail API, read-only scope)
- **Auth/session:** Google OAuth 2.0, encrypted HTTP-only cookies
- **Hosting target:** Netlify (client + functions); the demo also runs as pure static

## Architecture overview
```
client/ (React SPA)
  └─ App → /auth/me → LoginScreen | Dashboard
              Dashboard → /api/subscriptions, /api/scan
              (demo mode bypasses the network and uses fictional data)
netlify/functions/  auth-google · auth-callback · auth-me · auth-logout · scan · subscriptions
netlify/shared/     gmail.mjs (search) · extract.mjs (engine) · crypto.mjs (cookie encryption)
```
- `netlify.toml` maps `/auth/*` and `/api/*` to functions and adds a SPA fallback.

## Local setup
**Prerequisites:** Node 18+. For the **real Gmail flow**, a Google Cloud OAuth client.

```bash
# Frontend only (demo works with no backend):
cd client && npm install && npm run build && npm run preview
# then open  http://localhost:4173/?demo=1

# Full app (real Gmail) with Netlify Dev:
npm install && cd client && npm install && cd ..
cp .env.example .env   # fill in your Google credentials
npx netlify-cli dev    # http://localhost:8888
```

## Environment variables
Only needed for the **real** Gmail flow (the demo needs none). Names only — never commit real values:
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REDIRECT_URI`
- `SESSION_SECRET` (long random string)
- `URL`

## Demo instructions
1. Open the app.
2. Click **"Explore the live demo"** (or go to `/?demo=1`).
3. Explore: filter by category, sort, expand a card, click **"Scan Again"** (simulated), open **One-Time Payments**.

## Current status
**Working v1, polished for portfolio.** Real OAuth + extraction engine implemented; **public demo mode added** so the product is explorable without an account. Client production build verified.

## Known limitations
- The real Google sign-in shows an **"unverified app"** consent screen until the OAuth app is verified by Google (expected for a personal project).
- Extraction is **heuristic** (dictionary + regex) — unusual receipt formats may be missed or mis-priced.
- The live Gmail flow was **not exercised** in this portfolio pass (it needs your Google credentials); it's verified by code review.

## Security & privacy notes
- **Read-only** Gmail scope (`gmail.readonly`) — enforced in `netlify/shared/gmail.mjs`.
- Tokens stored in **encrypted, expiring HTTP-only cookies**; **no email bodies stored**.
- No secrets in the repo — only `.env.example` (placeholder names). Real values go in Netlify env vars.
- Demo data is **fictional**; the demo makes no network calls.

## Planned improvements
- A clearly-labeled "sample report" link from the marketing/login screen (done via demo mode).
- Richer category analytics and trend-over-time.
- Google app verification to remove the consent warning.

## STAR summary
- **Situation:** Forgotten subscriptions quietly drain money, and the tools that find them often want to upload your whole inbox.
- **Task:** Build a tool that surfaces recurring charges from Gmail while touching as little data as possible.
- **Action:** Chose Google's read-only scope on purpose, built the OAuth + serverless API and an extraction engine that classifies receipts and groups them by service, and kept tokens in encrypted, expiring cookies with no stored email. For the portfolio I added a full demo mode so anyone can explore the dashboard with fictional data and no login.
- **Result & current outcome:** A working, privacy-first app with a real OAuth/Gmail pipeline and a public demo. The dashboard renders categorized monthly spend; the demo (fictional data) is verified in the production build. Real-Gmail use needs your own Google credentials.

## License
MIT
