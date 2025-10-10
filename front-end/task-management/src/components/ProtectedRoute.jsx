import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/login" replace />;

  // If a specific role is required, check if the user has that role
  if (role && user.role !== role) return <Navigate to="/unauthorized" replace />;

  return children;
}
