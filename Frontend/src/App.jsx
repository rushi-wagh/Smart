import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoutes";
import RoleRoute from "./routes/RoleRoutes";
import Landing from './pages/landingPage';
import Login from './pages/loginPage';
import Register from './pages/signupPage';
import Profile from './pages/profilePage';
import ProfileView from './pages/profileView';
import LostFoundDashboard from './pages/lostAndFoundPage';
import ReportItem from './pages/reportItemPage';
import LostFoundItemDetail from './pages/lostFoundItemDetail';
import AdminModerationPanel from './pages/lost-foundAdminPage';
import AdminAnnouncementDashboard from './pages/announcementAdminPage';
import Announcements from './pages/announcementPage';
import ReportIssue from './pages/issueReportPage';
import MyIssues from './pages/myIssuePage';
import AdminIssues from './pages/adminIssuePage';
import StaffDashboard from './pages/staffPage';

const App = () => {
  return (
    <Routes>

      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />

      <Route path="/update-profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />

      <Route path="/profile" element={
        <ProtectedRoute>
          <ProfileView />
        </ProtectedRoute>
      } />

      <Route path="/lost-found" element={
        <ProtectedRoute>
          <LostFoundDashboard />
        </ProtectedRoute>
      } />

      <Route path="/lost-found/report" element={
        <ProtectedRoute>
          <ReportItem />
        </ProtectedRoute>
      } />

      <Route path="/lost-found/:id" element={
        <ProtectedRoute>
          <LostFoundItemDetail />
        </ProtectedRoute>
      } />

      <Route path="/lost-found/admin" element={
        <ProtectedRoute>
          <RoleRoute roles={["admin"]}>
            <AdminModerationPanel />
          </RoleRoute>
        </ProtectedRoute>
      } />

      <Route path="/announcements" element={
        <ProtectedRoute>
          <Announcements />
        </ProtectedRoute>
      } />

      <Route path="/announcements-admin" element={
        <ProtectedRoute>
          <RoleRoute roles={["admin"]}>
            <AdminAnnouncementDashboard />
          </RoleRoute>
        </ProtectedRoute>
      } />

      <Route path="/issue" element={
        <ProtectedRoute>
          <ReportIssue />
        </ProtectedRoute>
      } />

      <Route path="/my-issues" element={
        <ProtectedRoute>
          <RoleRoute roles={["student"]}>
            <MyIssues />
          </RoleRoute>
        </ProtectedRoute>
      } />

      <Route path="/admin-issues" element={
        <ProtectedRoute>
          <RoleRoute roles={["admin"]}>
            <AdminIssues />
          </RoleRoute>
        </ProtectedRoute>
      } />

      <Route path="/staff-dashboard" element={
        <ProtectedRoute>
          <RoleRoute roles={["staff"]}>
            <StaffDashboard />
          </RoleRoute>
        </ProtectedRoute>
      } />

    </Routes>
  );
};

export default App;
