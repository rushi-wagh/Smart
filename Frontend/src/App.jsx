import { useState } from 'react'
import Navbar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/landingPage'

const App = () => {
  return(
    <>
    <Routes>
      <Route path="/" element={<Landing />} />

    </Routes>
    </>
  )
}

export default App
