import './App.css'

import Dashboard from './components/dashboard/Dashboard'
import LandingPage from './components/landing/LandingPage'
import { useState } from 'react'

function App() {
  const [page, setPage] = useState("landing")

  return (
    <>
      {page === "landing" && <LandingPage setPage={setPage} />}
      {page === "dashboard" && <Dashboard />}
    </>
  )

}

export default App
