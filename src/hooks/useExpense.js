import { useContext } from 'react'
import { BudgetContext } from '../context/BudgetContext.jsx'

export default function useExpense() {
  const context = useContext(BudgetContext)
  if (!context) {
    throw new Error('useExpense must be used within BudgetProvider')
  }
  return context
}
