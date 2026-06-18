import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useAuthStore();

  // 1. If they aren't logged in at all, kick them to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 2. If the route requires specific roles and the user doesn't have it, kick them back
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    // Redirect based on their actual role safely
    if (user?.role === 'Admin') return <Navigate to="/admin/dashboard" replace />;
    if (user?.role === 'Hospital') return <Navigate to="/hospital/dashboard" replace />;
    if (user?.role === 'Donor') return <Navigate to="/user/dashboard" replace />;
    
    // If they somehow have no role, send them back to login
    return <Navigate to="/login" replace />;
  }

  // 3. If they pass all checks, render the page!
  return <Outlet />;
}; // <--- This was the missing bracket!

export default ProtectedRoute;