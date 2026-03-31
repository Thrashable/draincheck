# SubScan — Project Context

## What this project is
Gmail subscription checker dashboard. React+Vite frontend, Node/Express backend, SQLite DB. Scans Gmail for receipts/renewals/signups, extracts subscriptions via Anthropic API, displays in a dark fintech-style dashboard.

## Build Phases (update status as you go)
- [x] Phase 1: Project scaffolding & file structure
- [x] Phase 2: Backend — Google OAuth2 + Gmail API search
- [x] Phase 3: Backend — Anthropic API subscription extraction + SQLite
- [x] Phase 4: Frontend — Login screen
- [x] Phase 5: Frontend — Dashboard layout, stats row, category breakdown
- [x] Phase 6: Frontend — Subscription cards, filters, animations
- [x] Phase 7: Frontend — Loading states, error states, empty states
- [x] Phase 8: Self-QA with preview (run app, visually verify, fix issues)
- [x] Phase 9: Final end-to-end pass

## Current Phase
Complete

## Notes / Decisions Made
- Typography: Space Grotesk (display/headers) + JetBrains Mono (numbers) + DM Sans (body)
- Accent color: coral (#FF6B6B) with 8 distinct category colors
- Background: #0B0E11 with subtle SVG noise texture overlay
- Framer Motion for staggered card animations and hover states
- Vite proxy forwards /auth and /api to backend on port 3001
- Session-based auth (express-session), no JWT

## Known Issues
- Google OAuth requires configured credentials in .env to function
- 2FA flow for test account needs manual intervention
