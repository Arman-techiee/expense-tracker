import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import categories from '../data/Category.js'

const STORAGE_KEY = 'expense-tracker:v1'
const DEFAULT_MONTHLY_BUDGET = 2000

const buildInitialState = () => ({
  expenses: [],
  monthlyBudget: DEFAULT_MONTHLY_BUDGET,
  categoryBudgets: {},
})

const parseAmount = (value) => {
  const parsed = Number.parseFloat(value)
  if (Number.isNaN(parsed)) return 0
  return Math.round(parsed * 100) / 100
}

const safeParse = (value) => {
  if (!value) return null
  try {
    return JSON.parse(value)
  } catch (error) {
    return null
  }
}

const createId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `exp_${Date.now()}_${Math.random().toString(16).slice(2)}`
}

export const BudgetContext = createContext(null)

export function BudgetProvider({ children }) {
  const [state, setState] = useState(() => {
    const stored = safeParse(localStorage.getItem(STORAGE_KEY))
    if (!stored) return buildInitialState()
    return {
      ...buildInitialState(),
      ...stored,
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const addExpense = useCallback((payload) => {
    const expense = {
      id: createId(),
      title: payload.title?.trim() || 'Untitled',
      amount: parseAmount(payload.amount),
      category: payload.category || categories[0]?.value || 'other',
      date: payload.date || new Date().toISOString().slice(0, 10),
      note: payload.note?.trim() || '',
      type: payload.type === 'income' ? 'income' : 'expense',
      createdAt: new Date().toISOString(),
    }

    setState((prev) => ({
      ...prev,
      expenses: [expense, ...prev.expenses],
    }))

    return expense
  }, [])

  const updateExpense = useCallback((id, updates) => {
    setState((prev) => ({
      ...prev,
      expenses: prev.expenses.map((expense) => {
        if (expense.id !== id) return expense
        return {
          ...expense,
          title: updates.title?.trim() || expense.title,
          amount: parseAmount(updates.amount ?? expense.amount),
          category: updates.category || expense.category,
          date: updates.date || expense.date,
          note: updates.note?.trim() ?? expense.note,
          type: updates.type === 'income' ? 'income' : 'expense',
        }
      }),
    }))
  }, [])

  const deleteExpense = useCallback((id) => {
    setState((prev) => ({
      ...prev,
      expenses: prev.expenses.filter((expense) => expense.id !== id),
    }))
  }, [])

  const setMonthlyBudget = useCallback((value) => {
    setState((prev) => ({
      ...prev,
      monthlyBudget: parseAmount(value),
    }))
  }, [])

  const setCategoryBudget = useCallback((category, value) => {
    setState((prev) => ({
      ...prev,
      categoryBudgets: {
        ...prev.categoryBudgets,
        [category]: parseAmount(value),
      },
    }))
  }, [])

  const stats = useMemo(() => {
    const today = new Date()
    const currentMonth = today.toISOString().slice(0, 7)
    const monthExpenses = state.expenses.filter(
      (expense) => expense.date?.slice(0, 7) === currentMonth,
    )

    const income = monthExpenses
      .filter((expense) => expense.type === 'income')
      .reduce((sum, expense) => sum + expense.amount, 0)
    const spending = monthExpenses
      .filter((expense) => expense.type !== 'income')
      .reduce((sum, expense) => sum + expense.amount, 0)
    const net = income - spending
    const budgetRemaining = state.monthlyBudget - spending

    const byCategory = monthExpenses
      .filter((expense) => expense.type !== 'income')
      .reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount
        return acc
      }, {})

    return {
      income,
      spending,
      net,
      budgetRemaining,
      month: currentMonth,
      byCategory,
    }
  }, [state.expenses, state.monthlyBudget])

  const value = useMemo(
    () => ({
      expenses: state.expenses,
      monthlyBudget: state.monthlyBudget,
      categoryBudgets: state.categoryBudgets,
      addExpense,
      updateExpense,
      deleteExpense,
      setMonthlyBudget,
      setCategoryBudget,
      stats,
    }),
    [
      state.expenses,
      state.monthlyBudget,
      state.categoryBudgets,
      addExpense,
      updateExpense,
      deleteExpense,
      setMonthlyBudget,
      setCategoryBudget,
      stats,
    ],
  )

  return <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>
}
