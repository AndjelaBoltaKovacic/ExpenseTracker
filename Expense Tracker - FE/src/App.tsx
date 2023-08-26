import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/login';
import Blog from './pages/layout/blog/blog';
import Dashboard from './pages/layout/dashboard/dashboard';
import Transactions from './pages/layout/transactions/transactions';
import NavigationBar from './common/navigation/navigation-bar';
import Register from './pages/auth/register';
import { useUserContext } from './contexts/userContext';

function App() {
  const { user } = useUserContext();
  return (
    <>
      <NavigationBar />
      <Routes>
        {!user ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        ) : (
          <>
            <Route path="/dashboard" element={<Dashboard user={user.firstname} />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/blog" element={<Blog />} />
          </>
        )}
        <Route path="/*" element={<Navigate to={!!user ? '/dashboard' : '/login'} />}></Route>
      </Routes>
    </>
  );
}

export default App;
