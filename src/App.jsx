import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';
import AdminLayout from './components/layout/AdminLayout';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import LoginForm from './components/auth/LoginForm';
import Dashboard from './pages/admin/Dashboard';
import JobManagement from './pages/admin/JobManagement';
import UserManagement from './pages/admin/UserManagement';
import Reports from './pages/admin/Reports';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/admin" element={
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="jobs" element={<JobManagement />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="reports" element={<Reports />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;