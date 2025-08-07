import './App.css'

import LandingPage from './components/landing/LandingPage'
import { useState } from 'react'

function App() {
  const [page, setPage] = useState("landing")

  return (
    page === "landing" && <LandingPage setPage={setPage} />
  )

}

export default App
