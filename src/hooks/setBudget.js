import useExpense from './useExpense.js'

export default function useSetBudget() {
  const {
    monthlyBudget,
    categoryBudgets,
    setMonthlyBudget,
    setCategoryBudget,
    stats,
  } = useExpense()

  return {
    monthlyBudget,
    categoryBudgets,
    setMonthlyBudget,
    setCategoryBudget,
    stats,
  }
}
