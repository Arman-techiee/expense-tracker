import { Link, NavLink } from 'react-router-dom'
import { Home, PiggyBank, Receipt, Wallet } from 'lucide-react'
import useExpense from '../../hooks/useExpense.js'

const formatCurrency = (value) => {
  const formatted = new Intl.NumberFormat('ne-NP', {
    maximumFractionDigits: 0,
  }).format(value)
  return `Rs ${formatted}`
}

function NavBar() {
  const { stats } = useExpense()

  return (
    <header className="sticky top-0 z-20 border-b border-stone-200/70 bg-white/90 shadow-sm backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-red-500 to-orange-400 text-base font-semibold text-white shadow-lg shadow-orange-200/60">
            <Wallet size={20} strokeWidth={2.2} />
          </span>
          <div>
            <p className="text-lg font-semibold tracking-tight text-stone-900">
              Expense Tracker
            </p>
            <p className="text-xs font-medium uppercase tracking-wide text-stone-400">
              {stats.month} • Personal Finance
            </p>
          </div>
        </Link>
        <nav className="flex flex-wrap gap-2 rounded-full bg-stone-100/80 p-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:bg-white/70'
              }`
            }
          >
            <Home size={16} />
            Overview
          </NavLink>
          <NavLink
            to="/expenses"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:bg-white/70'
              }`
            }
          >
            <Receipt size={16} />
            Expenses
          </NavLink>
          <NavLink
            to="/budget"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:bg-white/70'
              }`
            }
          >
            <PiggyBank size={16} />
            Budget
          </NavLink>
        </nav>
        <div className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white px-4 py-2 shadow-sm">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-400">
              Net This Month
            </p>
            <p
              className={`text-base font-semibold ${
                stats.net >= 0 ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {formatCurrency(stats.net)}
            </p>
          </div>
          <div className="hidden text-right sm:block">
            <p className="text-[10px] uppercase tracking-widest text-stone-400">
              Spending
            </p>
            <p className="text-sm font-semibold text-stone-700">
              {formatCurrency(stats.spending)}
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default NavBar
