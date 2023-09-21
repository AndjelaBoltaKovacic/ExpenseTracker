import { Navigate, Outlet } from 'react-router-dom';

const AuthRoutes = ({ isAuthenticated }: { isAuthenticated: boolean }) => {

    return !isAuthenticated ? <Outlet /> : <Navigate to='/dashboard' />
};

export default AuthRoutes;