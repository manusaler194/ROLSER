import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
    const { token, role } = useAuth();

    if (!token) return <Navigate to="/login" />;
    return <Outlet />;
};

export default ProtectedRoute;