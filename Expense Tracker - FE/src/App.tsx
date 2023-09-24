import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/login';
import Dashboard from './pages/content/dashboard/dashboard';
import Transactions from './pages/content/transactions/transactions';
import NavigationBar from './common/navigation/navigation-bar';
import Register from './pages/auth/register';
import { useUserContext } from './contexts/user.context';
import { Box } from '@mui/material';
import AuthRoutes from './routes/auth-routes';
import ProtectedRoutes from './routes/protected-routes';
import { UserRole } from './values/enums/user';
import PremiumRoutes from './routes/premium-routes';
import Blogs from './pages/content/blog/blogs';
import BlogPage from './pages/content/blog/blog';
import TransactionsContainer from './pages/content/transactions/transactions-container';
import AddTransactionModal from './modals/add-transaction-modal';
import ManageCategoriesModal from './modals/manage-categories-modal';
import EditTransactionModal from './modals/edit-transaction-modal';
import DeleteTransactionModal from './modals/delete-transaction-modal';


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
          <Route path="/transactions" element={<TransactionsContainer />}>
            <Route path="incomes" element={<Transactions />} />
            <Route path="expenses" element={<Transactions />} />
          </Route>
        </Route>
        <Route element={<PremiumRoutes isPremium={user?.role === UserRole.Premium} />}>
          <Route path="/blog" element={<Blogs />} />
          <Route path="/blog/:id" element={<BlogPage />} />
        </Route>
        <Route path="/*" element={<Navigate to={!!user ? '/dashboard' : '/login'} />} />
      </Routes>

      <AddTransactionModal />
      <ManageCategoriesModal />
      <EditTransactionModal />
      <DeleteTransactionModal />
    </Box>
  );
}

export default App;
