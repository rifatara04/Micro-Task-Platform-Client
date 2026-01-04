import { Outlet, useLocation } from 'react-router'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/shared/Navbar'
import Footer from './components/shared/Footer'
import { useContext } from 'react'
import { AuthContext } from './providers/AuthProvider'
import LoadingSpinner from './components/shared/LoadingSpinner'

function App() {
  const { loading } = useContext(AuthContext);
  const location = useLocation();
  const isDashboard = location.pathname.includes('/dashboard');

  if (loading) {
    return <div className="h-screen w-full flex items-center justify-center"><LoadingSpinner /></div>;
  }

  return (
    <>
      {!isDashboard && <Navbar />}
      <div className="min-h-screen">
        <Outlet />
      </div>
      {!isDashboard && <Footer />}
      <Toaster position="top-center" />

    </>
  )
}

export default App
