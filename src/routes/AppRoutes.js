import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Verification from '../pages/Verification';
import Dashboard from '../pages/Dashboard';
import RegisteredUsers from '../pages/RegisteredUsers';
import Certificates from '../pages/Certificates'; 
import Schedule from '../pages/Schedule';
import ForgotPassword from '../pages/ForgotPassword';
import { AuthProvider, useAuth } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import Home from '../pages/Complete';

const AppRoutes = () => (
  <AuthProvider>
    <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/verification" element={ <Verification /> } />
      <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
      <Route path="/registerusers" element={<ProtectedRoute> <RegisteredUsers /> </ProtectedRoute>} />
      <Route path="/certificate" element={<ProtectedRoute> <Certificates /> </ProtectedRoute>} />
      <Route path="/schedule" element={<ProtectedRoute> <Schedule /> </ProtectedRoute> } />
      <Route path="/forgotpassword" element={<ProtectedRoute> <ForgotPassword /></ProtectedRoute>} />
      <Route path="/home" element={ <Home />} />
      {/* Assuming ForgotPassword component is defined in src/pages/ForgotPassword.js */}
    </Routes>
   </Router>
    </AuthProvider>
);

export default AppRoutes;