# Draincheck

Draincheck is a privacy-focused subscription scanner that uses read-only Gmail access to find recurring charges and summarize where money is going each month.

## Live Demo

[draincheck.netlify.app](https://draincheck.netlify.app)

## Features

- Google OAuth sign-in with read-only Gmail permissions
- Gmail search across receipts, renewals, signup notices, and billing emails
- Automatic separation of recurring subscriptions and one-time purchases
- Monthly spend summary, charge history, categories, and payment method hints
- Links back to original Gmail messages for verification
- Sorting and filtering by cost, date, total spend, category, and merchant

## Privacy & Security

- Authentication is handled through Google OAuth 2.0.
- Draincheck requests only the `gmail.readonly` scope.
- Subscription detection runs in app code with pattern matching, not third-party AI APIs.
- Email data is scanned during the session and is not stored in a database.
- Auth tokens are stored in encrypted HTTP-only cookies that expire after 24 hours.

## Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Framer Motion
- **Backend:** Netlify Functions
- **Auth:** Google OAuth 2.0
- **Email:** Gmail API
- **Hosting:** Netlify

## Screenshots

Screenshots are not committed yet. Recommended additions:

- Login screen
- Subscription dashboard
- Category or monthly spend breakdown

## Local Setup

### Prerequisites

- Node.js 18+
- Netlify CLI
- Google Cloud project with the Gmail API enabled

### Setup

1. Clone the repo:

   ```bash
   git clone https://github.com/Thrashable/draincheck.git
   cd draincheck
   ```

2. Create Google OAuth credentials:

   - Enable the Gmail API in Google Cloud Console.
   - Create an OAuth 2.0 Client ID for a web application.
   - Add `http://localhost:8888/auth/google/callback` as an authorized redirect URI.
   - Add `http://localhost:8888` as an authorized JavaScript origin.

3. Configure environment variables:

   ```bash
   cp .env.example .env
   ```

   Fill in `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `SESSION_SECRET`.

4. Install dependencies:

   ```bash
   npm install
   cd client && npm install && cd ..
   ```

5. Run the app with Netlify Dev:

   ```bash
   npx netlify-cli dev
   ```

   Open `http://localhost:8888`.

## Project Structure

```text
draincheck/
  client/             React frontend
  netlify/functions/  Serverless API endpoints
  netlify/shared/     Gmail, extraction, and cookie helpers
  netlify.toml        Netlify build and redirect config
```

## Project Status

Portfolio-ready v1. The app is deployed on Netlify and demonstrates a practical AI-assisted workflow: OAuth setup, serverless functions, Gmail API integration, privacy-first data handling, and a clean React dashboard. Future improvements could include screenshot assets, richer category analytics, and clearer onboarding for Google OAuth verification.

## License

MIT
