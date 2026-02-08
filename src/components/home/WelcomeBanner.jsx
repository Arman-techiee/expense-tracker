import useExpense from '../../hooks/useExpense.js'

const formatCurrency = (value) => {
  const formatted = new Intl.NumberFormat('ne-NP', {
    maximumFractionDigits: 0,
  }).format(value)
  return `Rs ${formatted}`
}

function WelcomeBanner() {
  const { stats, monthlyBudget } = useExpense()
  const budgetUsed = monthlyBudget ? (stats.spending / monthlyBudget) * 100 : 0

  return (
    <section className="grid gap-8 rounded-3xl bg-white/70 p-8 shadow-xl ring-1 ring-stone-200/60 md:grid-cols-[1.3fr_1fr]">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
          Personal Finance Hub
        </p>
        <h1 className="text-3xl font-semibold text-stone-900 sm:text-4xl lg:text-5xl">
          Track spending, savings, and budget health in one place.
        </h1>
        <p className="text-base text-stone-600">
          See monthly inflow and outflow, category trends, and how close you are
          to your targets.
        </p>
      </div>
      <div className="grid gap-4 rounded-2xl bg-white p-6 shadow-lg">
        <div>
          <p className="text-xs uppercase tracking-wide text-stone-400">
            This Month
          </p>
          <p className="text-2xl font-semibold text-stone-900">
            {formatCurrency(stats.spending)}
          </p>
          <p className="text-sm text-stone-500">
            Budget: {formatCurrency(monthlyBudget)}
          </p>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-stone-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-red-500 via-orange-400 to-amber-300"
            style={{ width: `${Math.min(budgetUsed, 100)}%` }}
          />
        </div>
        <p className="text-sm text-stone-500">
          {budgetUsed > 100
            ? 'Over budget - time to tighten up.'
            : 'On track for a steady month.'}
        </p>
      </div>
    </section>
  )
}

export default WelcomeBanner
