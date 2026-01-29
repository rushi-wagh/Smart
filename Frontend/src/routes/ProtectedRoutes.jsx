import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const ProtectedRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }
  if (user && user.completion <100 && (user.role !== "admin" &&  user.role !== "staff")) {
    return <Navigate to="/update-profile" replace />;
  }

  return children;
};

export default ProtectedRoute;
