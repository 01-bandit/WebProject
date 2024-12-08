import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function PrivateRoute({ children }) {
  const { auth } = useAuth();

  if (!auth?.token || auth.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  return children;
}