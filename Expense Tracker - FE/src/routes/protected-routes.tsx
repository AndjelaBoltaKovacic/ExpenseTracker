import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = ({ isAuthenticated }: { isAuthenticated: boolean }) => {

    return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
};

export default ProtectedRoutes;