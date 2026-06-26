# Screenshots to capture

The demo dashboard's rendering is implemented and the demo code is verified in the production build. These PNGs are a ~5-minute capture for the README/case study. Save them in this `docs/` folder.

Run the app first:
```bash
cd client && npm install && npm run build && npm run preview
# then open http://localhost:4173/?demo=1
```

| File | What to capture | How |
|---|---|---|
| `screenshot-login.png` | Login screen with "Sign in with Google" + "Explore the live demo" | Open `/` |
| `screenshot-dashboard.png` | The demo dashboard: stats row, category breakdown, subscription cards (note the "Demo data" badge) | Open `/?demo=1` |
| `screenshot-card-expanded.png` | One subscription card expanded (status, card, charge history) | Click a card |
| `screenshot-onetime.png` | The expanded "One-Time Payments" section | Click to expand it |
| `screenshot-mobile.png` | The dashboard at phone width (~390px) | Resize / device toolbar |

> Always use the **demo** (`?demo=1`) for screenshots — never a real inbox/account.
