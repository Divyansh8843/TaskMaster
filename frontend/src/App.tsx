import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import { useAuth } from './context/AuthContext';
import Register from './pages/Register';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Loading from './components/Loading';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { token, isLoading } = useAuth();
    
    if (isLoading) return <Loading />;
    if (!token) return <Navigate to="/login" />;
    
    return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
