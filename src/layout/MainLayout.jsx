import { Outlet } from 'react-router-dom'
import NavBar from '../components/common/NavBar.jsx'
import Footer from '../components/common/Footer.jsx'

function MainLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-100 to-orange-50 text-stone-900">
      <NavBar />
      <main className="px-5 py-10 sm:px-8 lg:px-14">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
