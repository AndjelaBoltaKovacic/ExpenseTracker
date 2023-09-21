import { Navigate, Outlet } from 'react-router-dom';

const PremiumRoutes = ({ isPremium }: { isPremium: boolean }) => {

    return isPremium ? <Outlet /> : <Navigate to='/dashboard' />
};

export default PremiumRoutes;
