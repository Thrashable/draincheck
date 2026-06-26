# Draincheck — Portfolio Polish Changelog

**Date:** 2026-06-25

## Original baseline
- Source: `C:\Users\kelle\Desktop\codextest\github-polish-work\draincheck` (preserved, untouched).
- React (Vite) client + Netlify Functions; real read-only Google OAuth + Gmail extraction engine. Clean repo (only `.env.example`, no committed secrets, no `.env` in git history). README claimed a live demo URL but had no in-app way to explore without a real Google login.

## Working copy created
- Clean public-ready copy at `C:\Users\kelle\newClaude\portfolio-ready\draincheck` — source only (no `node_modules`, `.git`, `.env`, build output). This copy is the deployable artifact.

## Files changed / added (in the copy only)
- **Added** `client/src/data/demoSubscriptions.js` — fictional sample dataset matching the live extractor's exact 24-field output shape (11 recurring + 2 one-time; varied categories, a `payment_issue`, a `cancelled`, realistic charge histories). `gmail_message_id: null` so no broken Gmail deep links.
- `client/src/App.jsx` — demo mode: honors `?demo=1` (shareable), a `startDemo()` entry, a demo user, and a logout that clears the demo param.
- `client/src/components/Dashboard.jsx` — `demo` prop: loads the fictional dataset instead of fetching, runs a **simulated scan** (progress animation → data), skips the logout network call, and shows a **"Demo data"** badge.
- `client/src/components/LoginScreen.jsx` — added an **"Explore the live demo →"** button and clarified the read-only / demo distinction.
- `README.md` — rewritten (honest, recruiter-facing, demo-first, 17 sections).
- Added `PORTFOLIO_CASE_STUDY.md`, `PORTFOLIO_CHANGELOG.md`, `docs/SCREENSHOTS.md`.

## Bugs fixed / robustness
- The app previously had **no way to explore without a real Google login**, which made it un-demoable for recruiters. The demo mode fixes that and also makes the app degrade gracefully on a pure-static host (no functions): the initial `/auth/me` fetch fails → login screen → demo button still works.

## UI / UX improvements
- Login screen now offers a no-login path; clearer read-only privacy copy.
- Dashboard clearly badges demo data; "Scan Again" works (simulated) in demo.
- Preserved the project's existing coral/dark visual identity (not reskinned).

## Documentation improvements
- Demo-first README with verified-features list, architecture, env-var names, deploy options, limitations, security notes, STAR.
- Full case study; screenshot capture checklist.

## Security changes
- Confirmed clean: no `.env`, no secrets, no PII in the copy; only `.env.example` (placeholder variable names). Demo data is fictional and makes no network calls. No private keys reach the frontend bundle.

## Tests performed (actually run in this pass)
- `npm install` (client) ✅, `npm run build` (client) ✅ (exit 0, 295 KB / 93 KB gzip).
- Verified the **demo code compiled into the production bundle** (grep for `Netflix`, `Adobe Creative Cloud`, `Demo data`, `demo@draincheck.app`, `Explore the live demo`, `Planet Fitness`, `One-time` — all present).
- Served the production build; HTTP-verified `/` and `/?demo=1` return the app shell (200).
- **Not performed:** the live Google OAuth / Gmail flow (needs real Google credentials); a live render screenshot (blocked by preview-tool instability this session — render verified indirectly via build + bundle content + serving).

## Remaining limitations
- Live Gmail flow unverified this pass (code-reviewed only).
- Screenshot PNGs not committed (steps in `docs/SCREENSHOTS.md`).
- Not yet deployed to a public URL (prepared; awaiting owner approval — see PORTFOLIO_PROGRESS.md).
