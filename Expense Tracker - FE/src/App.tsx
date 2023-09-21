import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/login';
import Dashboard from './pages/layout/dashboard/dashboard';
import Transactions from './pages/layout/transactions/transactions';
import NavigationBar from './common/navigation/navigation-bar';
import Register from './pages/auth/register';
import { useUserContext } from './contexts/userContext';
import { Box } from '@mui/material';
import AuthRoutes from './routes/auth-routes';
import ProtectedRoutes from './routes/protected-routes';
import { UserRole } from './values/enums/user';
import PremiumRoutes from './routes/premium-routes';
import Blogs from './pages/layout/blog/blogs';
import BlogPage from './pages/layout/blog/blog';
import { TransactionType } from './values/enums/transactions';

function App() {
  const { user } = useUserContext();

  return (
    <Box sx={{ paddingBottom: '60px' }}>
      <NavigationBar />
      <Routes>
        <Route element={<AuthRoutes isAuthenticated={!!user} />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<ProtectedRoutes isAuthenticated={!!user} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
        </Route>
        <Route element={<PremiumRoutes isPremium={user?.role === UserRole.Premium} />}>
          <Route path="/blog" element={<Blogs />} />
          <Route path="/blog/:id" element={<BlogPage />} />
        </Route>
        <Route path="/*" element={<Navigate to={!!user ? '/dashboard' : '/login'} />} />
      </Routes>
    </Box>
  );
}

export default App;
