import { useState } from 'react'
import Navbar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/landingPage'
import Login from './pages/loginPage'
import Register from './pages/signupPage'

const App = () => {
  return(
    <>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />

    </Routes>
    </>
  )
}

export default App
