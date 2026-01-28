import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const RoleRoute = ({ roles, children }) => {
  const { user } = useAuthStore();

  if (!roles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleRoute;
