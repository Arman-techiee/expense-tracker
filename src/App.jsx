import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './layout/MainLayout.jsx'
import Home from './pages/Home.jsx'
import ExpensePage from './pages/ExpensePage.jsx'
import BudgetPage from './pages/BudgetPage.jsx'
import { BudgetProvider } from './context/BudgetContext.jsx'

function App() {
  return (
    <BudgetProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/expenses" element={<ExpensePage />} />
            <Route path="/budget" element={<BudgetPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </BudgetProvider>
  )
}

export default App
