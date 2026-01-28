import { Route, Routes } from 'react-router-dom'
import Landing from './pages/landingPage'
import Login from './pages/loginPage'
import Register from './pages/signupPage'
import Profile from './pages/profilePage'
import ProfileView from './pages/profileView'
import LostFoundDashboard from './pages/lostAndFoundPage'
import ReportItem from './pages/reportItemPage'
import LostFoundItemDetail from './pages/lostFoundItemDetail'
import AdminModerationPanel from './pages/lost-foundAdminPage'
import AdminAnnouncementDashboard from './pages/announcementAdminPage'
import Announcements from './pages/announcementPage'
import ReportIssue from './pages/issueReportPage'
import MyIssues from './pages/myIssuePage'

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
      <Route path ="/lost-found/detail" element={<LostFoundItemDetail />} />
      <Route path="/lost-found/admin" element={<AdminModerationPanel />} /> 
      <Route path='/announcements-admin' element={<AdminAnnouncementDashboard />} />
      <Route path='/announcements' element={<Announcements />} />  
      <Route path ='/issue' element ={<ReportIssue />} />
      <Route path ='/my-issues' element ={<MyIssues />} />

    </Routes>
    </>
  )
}

export default App
