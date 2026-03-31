# Draincheck

**See what's draining your wallet.** Draincheck connects to your Gmail, scans for subscription receipts and billing emails, and shows you exactly where your money is going each month.

Live at: [draincheck.netlify.app](https://draincheck.netlify.app)

## What It Does

- Signs you in with Google OAuth (read-only Gmail access)
- Searches your inbox for receipts, renewal notices, welcome emails, and billing notifications from the last 12 months
- Separates **recurring subscriptions** from **one-time purchases** automatically
- Shows your total monthly subscription cost, charge history, and payment methods
- Links each charge back to the original email in Gmail
- Sorts by cost, date, total spent, or name

## Privacy & Security

- **No passwords collected.** Authentication is handled entirely through Google's OAuth 2.0 flow.
- **No email data stored.** Draincheck reads your email metadata in real-time during a scan and never saves it to any database or server.
- **No third-party AI APIs.** All subscription detection is done locally using pattern matching — your email content is never sent to any external AI service.
- **Read-only access.** The app only requests `gmail.readonly` permission. It cannot send, delete, or modify any of your emails.
- **Encrypted sessions.** Auth tokens are stored in encrypted HTTP-only cookies that expire in 24 hours.

## How It Works

1. You sign in with Google
2. The app runs 4 targeted Gmail searches for subscription-related emails (receipts, renewals, signups, billing)
3. Each email is classified: subscription receipt, one-time purchase, welcome email, renewal notice, failed payment, or cancellation
4. Emails from the same business are grouped together to build a complete picture — charge count, total spent, payment method, date range
5. Results are split into two sections: recurring subscriptions on top, one-time payments below

## Tech Stack

- **Frontend:** React 18 + Vite + Tailwind CSS + Framer Motion
- **Backend:** Netlify Functions (serverless)
- **Auth:** Google OAuth 2.0 with encrypted cookie sessions
- **Email:** Gmail API (read-only)
- **Hosting:** Netlify

## Local Development

### Prerequisites

- Node.js 18+
- A Google Cloud Console project with the Gmail API enabled

### Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/YOUR_USERNAME/draincheck.git
   cd draincheck
   ```

2. **Set up Google OAuth credentials**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable the **Gmail API**
   - Go to **APIs & Services > Credentials**
   - Create an **OAuth 2.0 Client ID** (Web application)
   - Add `http://localhost:8888/auth/google/callback` as an authorized redirect URI
   - Add `http://localhost:8888` as an authorized JavaScript origin
   - Copy your Client ID and Client Secret

3. **Configure environment**
   ```bash
   cp server/.env.example server/.env
   ```
   Fill in your `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and set a random `SESSION_SECRET`.

4. **Install dependencies**
   ```bash
   npm install
   cd client && npm install && cd ..
   ```

5. **Run with Netlify Dev** (recommended — runs functions + frontend together)
   ```bash
   npx netlify-cli dev
   ```
   Open `http://localhost:8888`

### Project Structure

```
draincheck/
  client/                    # React frontend (Vite + Tailwind)
    src/
      components/            # Dashboard, cards, stats, filters
      utils/                 # Formatters, category colors
  netlify/
    functions/               # Serverless API endpoints
      auth-google.mjs        # OAuth redirect
      auth-callback.mjs      # OAuth callback + cookie
      auth-me.mjs            # Check auth status
      auth-logout.mjs        # Clear session
      scan.mjs               # Gmail scan + extraction
      subscriptions.mjs      # Return cached results
    shared/                  # Shared backend logic
      gmail.mjs              # Gmail API search
      extract.mjs            # Subscription extraction engine
      crypto.mjs             # Cookie encryption
  netlify.toml               # Netlify config + redirects
```

## About This Project

This is v1, built by a non-technical person learning [Claude Code](https://claude.ai/claude-code). The entire app — backend, frontend, deployment, Google OAuth setup, and all the iterative improvements — was built through conversation with Claude. No prior web development experience required.

If you're learning to build with AI tools, this project is proof that you can ship real, functional web apps without writing code yourself.

## License

MIT
