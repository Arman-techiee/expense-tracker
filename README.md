# Expense Tracker

A modern, responsive expense tracker built with React, Vite, Tailwind CSS, and React Router. Track income and expenses, manage monthly and category budgets, and review monthly summaries with data stored locally in your browser.

## Features
- Add, edit, and delete expense or income entries
- Monthly snapshot with income, spending, and remaining budget
- Budget planning page for monthly and category limits
- Filters for search, category, type, and month
- Local persistence via browser `localStorage`
- Nepal currency display using `Rs`

## Tech Stack
- React 19 + Vite
- Tailwind CSS
- React Router
- Lucide React icons

## Getting Started
1. Install dependencies.
   ```bash
   npm install
   ```
2. Start the dev server.
   ```bash
   npm run dev
   ```
3. Open the URL shown in the terminal.

## Scripts
1. `npm run dev` - start the dev server
2. `npm run build` - build for production
3. `npm run preview` - preview the production build
4. `npm run lint` - run ESLint

## Project Structure
- `src/App.jsx` - routes and providers
- `src/layout/MainLayout.jsx` - app shell layout
- `src/pages/Home.jsx` - dashboard overview
- `src/pages/ExpensePage.jsx` - add and manage entries
- `src/pages/BudgetPage.jsx` - monthly and category budgeting
- `src/context/BudgetContext.jsx` - state and persistence
- `src/hooks/useExpense.js` - context consumer
- `src/hooks/setBudget.js` - budget helpers
- `src/data/Category.js` - expense categories

## Notes
- Data is stored locally in your browser. Clearing site data will reset the app.
- Month-based stats use the current system date.
