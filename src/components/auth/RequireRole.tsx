// routes/RequireRole.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


const RequireRole = ({ allowedRoles }) => {
  const { role, loading } = useAuth();

  if (loading) return null;

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default RequireRole;
