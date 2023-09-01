import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/login';
import Dashboard from './pages/layout/dashboard/dashboard';
import Transactions from './pages/layout/transactions/transactions';
import NavigationBar from './common/navigation/navigation-bar';
import Register from './pages/auth/register';
import { useUserContext } from './contexts/userContext';
import Blogs from './pages/layout/blog/blogs';
import BlogPage from './pages/layout/blog/blog';
import { Box } from '@mui/material';

function App() {
  const { user } = useUserContext();

  return (
    <Box sx={{ paddingBottom: '60px' }}>
      <NavigationBar />
      <Routes>
        {!user ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        ) : (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/blog" element={<Blogs />} />
            <Route path="blog/:id" element={<BlogPage />} />
          </>
        )}
        <Route path="/*" element={<Navigate to={!!user ? '/dashboard' : '/login'} />}></Route>
      </Routes>
    </Box>
  );
}

export default App;
