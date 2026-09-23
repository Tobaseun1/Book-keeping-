# Bookkeeping App

A bookkeeping and finance-tracking web app for small businesses, built with React, Vite, and Firebase. Track income and expenses, manage invoices, and monitor your business finances — all from one dashboard, synced to your account across devices.

## Features

- **Dashboard** — overview of starting balance, money in, money out, and current balance, plus a 30-day cash flow chart
- **Transactions** — record and categorize income and expenses
- **Categories** — organize transactions by custom categories, with built-in suggestions (Sales, Salary, Utility, Transport, Energy)
- **Invoices** — create invoices, track pending/paid status, print or export to PDF
- **Receipts** — auto-generated receipts for paid invoices
- **Reports** — financial summaries over time, with CSV export
- **Savings Target** — set and track savings goals
- **Business Registration** — capture business details on first sign-up
- **Authentication** — email/password login and sign-up via Firebase Auth, with protected routes for all dashboard pages
- **Multi-currency support** — NGN, USD, GBP, EUR

## Tech Stack

- **Frontend**: React 19, Vite, React Router, Tailwind CSS
- **Backend**: Firebase Authentication (email/password) and Firestore (database)
- **Linting**: Oxlint

## Data & Storage

All data is stored in Firestore, scoped to the signed-in user:

- `users/{uid}` — business profile (name, description, currency, starting balance, categories, savings target)
- `users/{uid}/transactions/{id}` — one document per transaction
- `users/{uid}/invoices/{id}` — one document per invoice

Firestore security rules restrict every document under `users/{uid}` to that user's own account, so data is private per user.

## Getting Started

1. Clone the repo and install dependencies:
   ```bash
   npm install
   ```

2. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com), then enable:
   - **Authentication** → Sign-in method → Email/Password
   - **Firestore Database** → Create database (production mode)

3. Copy your Firebase web app config into a `.env` file at the project root:
   ```
   VITE_FIREBASE_API_KEY=
   VITE_FIREBASE_AUTH_DOMAIN=
   VITE_FIREBASE_PROJECT_ID=
   VITE_FIREBASE_STORAGE_BUCKET=
   VITE_FIREBASE_MESSAGING_SENDER_ID=
   VITE_FIREBASE_APP_ID=
   ```

4. Publish the Firestore security rules from `firestore.rules` (Firebase console → Firestore Database → Rules).

5. Run the app:
   ```bash
   npm run dev       # start dev server
   npm run build     # production build
   npm run preview   # preview the build
   ```

## Deployment

Deployed on Vercel, auto-deploying on every push to `master`. The same six `VITE_FIREBASE_*` environment variables must be added in the Vercel project's Environment Variables settings, and the deployed domain must be added to Firebase's Authentication → Settings → Authorized domains.
