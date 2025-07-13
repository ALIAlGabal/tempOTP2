import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Public Pages
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ResetPassword from './pages/auth/ResetPassword';
import VerifyEmail from './pages/auth/VerifyEmail';
import Pricing from './pages/Pricing';

// Dashboard Pages
import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import SendOTP from './pages/dashboard/SendOTP';
import TemplateList from './pages/dashboard/TemplateList';
import TemplateEdit from './pages/dashboard/TemplateEdit';
import APIIntegration from './pages/dashboard/APIIntegration';
import APIKeys from './pages/dashboard/APIKeys';
import Logs from './pages/dashboard/Logs';
import Profile from './pages/dashboard/Profile';
import Settings from './pages/dashboard/Settings';

// Admin Pages
import AdminLayout from './layouts/AdminLayout';
import AdminUsers from './pages/admin/AdminUsers';
import AdminUsage from './pages/admin/AdminUsage';
import AdminTemplates from './pages/admin/AdminTemplates';
import AdminPlans from './pages/admin/AdminPlans';
import AdminLogs from './pages/admin/AdminLogs';

// Support Pages
import HelpCenter from './pages/support/HelpCenter';
import SupportTicket from './pages/support/SupportTicket';
import SystemStatus from './pages/support/SystemStatus';

// Utility Pages
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />

            {/* Dashboard Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<DashboardHome />} />
              <Route path="send" element={<SendOTP />} />
              <Route path="templates" element={<TemplateList />} />
              <Route path="templates/:id" element={<TemplateEdit />} />
              <Route path="api" element={<APIIntegration />} />
              <Route path="api-keys" element={<APIKeys />} />
              <Route path="logs" element={<Logs />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute adminOnly>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route path="users" element={<AdminUsers />} />
              <Route path="usage" element={<AdminUsage />} />
              <Route path="templates" element={<AdminTemplates />} />
              <Route path="plans" element={<AdminPlans />} />
              <Route path="logs" element={<AdminLogs />} />
            </Route>

            {/* Support Routes */}
            <Route path="/support/help" element={<HelpCenter />} />
            <Route path="/support/ticket" element={<SupportTicket />} />
            <Route path="/support/status" element={<SystemStatus />} />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;