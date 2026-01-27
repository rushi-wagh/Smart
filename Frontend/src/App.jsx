import { Route, Routes } from 'react-router-dom'
import Landing from './pages/landingPage'
import Login from './pages/loginPage'
import Register from './pages/signupPage'
import Profile from './pages/profilePage'
import ProfileView from './pages/profileView'
import LostFoundDashboard from './pages/lostAndFoundPage'
import ReportItem from './pages/reportItemPage'

const App = () => {
  return(
    <>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/update-profile" element={<Profile />} />
      <Route path="/profile" element={<ProfileView />} />
      <Route path="/lost-found" element={<LostFoundDashboard />} />
      <Route path="/lost-found/report" element={<ReportItem />} />

    </Routes>
    </>
  )
}

export default App
