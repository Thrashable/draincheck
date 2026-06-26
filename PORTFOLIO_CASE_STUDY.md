# Draincheck — Case Study

## Overview
Draincheck is a privacy-first web app that uses **read-only** Gmail access to find a user's recurring subscriptions and summarize monthly spend by category. It pairs a real Google OAuth + serverless backend with a polished dashboard — and a public **demo mode** so anyone can explore it without connecting an inbox.

## Problem
Subscriptions accumulate and creep, and most people have no single view of what recurs each month. Existing tools often ask for broad access or upload your inbox to their servers — a privacy trade-off.

## Solution
- Authenticate with Google using the **read-only** `gmail.readonly` scope (can read, never modify or send).
- Search Gmail for receipts/renewals via serverless functions; run them through an extraction engine that classifies emails and groups them by service.
- Present a dashboard of recurring subscriptions vs. one-time purchases, with category breakdown and monthly totals.
- Store **nothing** server-side: tokens live in encrypted, expiring HTTP-only cookies; email bodies are never persisted.

## Intended user
Budget-conscious people who want to find and cut recurring charges without handing their inbox to a third party.

## My role
Solo, self-directed project built with AI-assisted development (Codex). I owned the privacy model, the OAuth + serverless API, the extraction engine, and the dashboard UI. **In this portfolio pass I designed and implemented the demo mode** — a fictional dataset matching the real extractor's output shape, a `?demo=1` shareable link, a login-screen entry point, a simulated scan, and a "Demo data" badge — so the product is fully explorable with no account and no backend.

## Key features
- Read-only Google OAuth + encrypted cookie sessions.
- Gmail search + a 90+ service extraction engine (price, frequency, card, charge history, recurring vs. one-time, status).
- Dashboard: stats, category breakdown, filter, sort, expandable cards, collapsible one-time payments.
- Public demo mode (no login).

## Technical approach
- **Serverless** Netlify Functions for the OAuth flow (`auth-google`, `auth-callback`, `auth-me`, `auth-logout`) and data (`scan`, `subscriptions`).
- **Extraction engine** (`extract.mjs`): per-email classification (welcome/renewal/receipt/failed/cancellation) → group by service → derive best price, frequency, card display, charge totals, date range, and recurring/one-time with status.
- **Cookie encryption** (`crypto.mjs`) keeps auth state without a database.
- **Demo mode** is a clean client-side branch: when `?demo=1` (or the demo button) is active, `App` injects a demo user and `Dashboard` reads a fictional dataset instead of calling the API, including a simulated scan.

## Architecture
```
React SPA (client/)
  App → GET /auth/me → LoginScreen | Dashboard
  Dashboard → GET /api/subscriptions, POST /api/scan
  Demo: App sets demo user; Dashboard uses DEMO_SUBSCRIPTIONS (no network)
Netlify Functions (netlify/functions/) + shared engine (netlify/shared/)
netlify.toml maps /auth/* and /api/* to functions; SPA fallback last
```

## Challenges
- **Privacy vs. usefulness:** solved by choosing the read-only scope and never storing email — the extraction happens per-request and only the derived summary is shown.
- **Turning messy receipts into structured data:** the engine uses layered heuristics (service dictionary, price regex with fallbacks, card/frequency/date detection) and groups multiple emails per service to infer recurrence and charge history.
- **Letting recruiters try it safely:** real OAuth can't be exposed publicly (consent screens, credentials, rate limits), so I built a faithful demo mode that mirrors the real data shape exactly.

## STAR story (≈60s spoken)
- **Situation:** Forgotten subscriptions quietly drain money, and the tools that find them often want to upload your whole inbox.
- **Task:** Build a tool that surfaces recurring charges from Gmail while touching as little data as possible.
- **Action:** I chose Google's read-only scope deliberately, built the OAuth flow and serverless functions, and wrote an extraction engine that classifies receipts and groups them by service to infer price, recurrence, and charge history — keeping tokens in encrypted, expiring cookies with no stored email. For the portfolio I added a demo mode so anyone can explore the dashboard with fictional data and no login.
- **Result & current outcome:** A working, privacy-first app with a real OAuth/Gmail pipeline and a public demo. The dashboard renders categorized monthly spend; the demo is verified in the production build. The biggest lesson was designing around least-privilege access instead of asking for everything.

## Verified outcome (what was actually tested in this pass)
- ✅ Client production build compiles (exit 0).
- ✅ Demo code (dataset, badge, demo entry, simulated scan) confirmed present in the production bundle and served at `/` and `/?demo=1`.
- ✅ Extraction engine + OAuth functions reviewed as real implementations.
- ⚠️ The live Google/Gmail flow was **not** exercised (needs your Google credentials) — verified by code review only.
- ⚠️ A live render screenshot was blocked by preview-tool instability; render verified indirectly (build + bundle content + serving).

## Current limitations
- Real sign-in shows Google's "unverified app" screen until the OAuth app is verified.
- Heuristic extraction can miss unusual receipt formats.
- No trend-over-time analytics yet.

## Future improvements
- Google app verification (removes the consent warning).
- Richer category/trend analytics.
- Optional CSV export of the summary.
