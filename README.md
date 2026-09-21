Bookkeeping App

A simple bookkeeping and finance-tracking web app for small businesses, built with React and Vite. Track income and expenses, manage invoices, and monitor your business finances — all from one dashboard.

Features
Dashboard — overview of starting balance, money in, money out, and current balance
Transactions — record and categorize income and expenses
Categories — organize transactions by custom categories
Invoices — create invoices, track pending/paid status, print or export to PDF
Receipts — manage receipts alongside invoices
Reports — view financial summaries over time
Savings Target — set and track savings goals
Business Registration — capture business details
Authentication — login/sign-up flow with protected routes for dashboard pages
CSV Export — export transaction data
Multi-currency support — NGN, USD, GBP, EUR
Tech Stack
React 19, Vite, React Router, Tailwind CSS, Oxlint (linting)
Data Storage

Currently uses browser localStorage for transactions, invoices, currency, and business name — no backend required to run locally.

Getting Started
bash
npm install
npm run dev       # start dev server
npm run build     # production build
npm run preview   # preview the build
Deployment

Deployed on Vercel, auto-deploying on every push to master.