import categories from '../data/Category.js'
import useSetBudget from '../hooks/setBudget.js'

const formatCurrency = (value) => {
  const formatted = new Intl.NumberFormat('ne-NP', {
    maximumFractionDigits: 0,
  }).format(value)
  return `Rs ${formatted}`
}

function BudgetPage() {
  const {
    monthlyBudget,
    categoryBudgets,
    setMonthlyBudget,
    setCategoryBudget,
    stats,
  } = useSetBudget()

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-stone-200/60">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-stone-900">
            Budget Planning
          </h1>
          <p className="text-sm text-stone-500">
            Set your monthly target and category limits to keep spending on
            track.
          </p>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
            <p className="text-xs uppercase tracking-wide text-stone-400">
              Monthly Budget
            </p>
            <p className="mt-2 text-2xl font-semibold text-stone-900">
              {formatCurrency(monthlyBudget)}
            </p>
            <div className="mt-4 space-y-2">
              <label
                className="text-sm font-medium text-stone-600"
                htmlFor="monthlyBudget"
              >
                Update Monthly Budget
              </label>
              <input
                id="monthlyBudget"
                className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm focus:border-stone-400 focus:outline-none"
                type="number"
                min="0"
                step="10"
                value={monthlyBudget}
                onChange={(event) => setMonthlyBudget(event.target.value)}
              />
            </div>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-5">
            <p className="text-xs uppercase tracking-wide text-stone-400">
              Current Month Status
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-sm text-stone-500">Spent</p>
                <p className="text-lg font-semibold text-rose-600">
                  {formatCurrency(stats.spending)}
                </p>
              </div>
              <div>
                <p className="text-sm text-stone-500">Remaining</p>
                <p
                  className={`text-lg font-semibold ${
                    stats.budgetRemaining < 0
                      ? 'text-rose-600'
                      : 'text-emerald-600'
                  }`}
                >
                  {formatCurrency(stats.budgetRemaining)}
                </p>
              </div>
            </div>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-stone-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-amber-300 to-rose-400"
                style={{
                  width: `${Math.min(
                    (stats.spending / (monthlyBudget || 1)) * 100,
                    100,
                  )}%`,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-stone-200/60">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-stone-900">
              Category Budgets
            </h2>
            <p className="text-sm text-stone-500">
              Review spending per category and assign limits.
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {categories.map((category) => {
            const spent = stats.byCategory[category.value] || 0
            const limit = categoryBudgets[category.value] || 0
            const remaining = limit - spent

            return (
              <div
                key={category.value}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4"
              >
                <div>
                  <p className="text-sm font-medium text-stone-700">
                    {category.label}
                  </p>
                  <p className="text-xs text-stone-500">
                    Spent: {formatCurrency(spent)}
                  </p>
                  <p
                    className={`text-xs font-semibold ${
                      limit > 0 && remaining < 0
                        ? 'text-rose-600'
                        : 'text-emerald-600'
                    }`}
                  >
                    {limit > 0
                      ? `Remaining: ${formatCurrency(remaining)}`
                      : 'No limit set'}
                  </p>
                </div>
                <input
                  className="w-32 rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm focus:border-stone-400 focus:outline-none"
                  type="number"
                  min="0"
                  step="10"
                  value={categoryBudgets[category.value] ?? ''}
                  onChange={(event) =>
                    setCategoryBudget(category.value, event.target.value)
                  }
                  placeholder="Set limit"
                />
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default BudgetPage
