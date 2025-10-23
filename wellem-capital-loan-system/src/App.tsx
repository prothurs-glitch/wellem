import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useApp } from './contexts/AppContext';

// Layout Components
import PublicLayout from './components/layouts/PublicLayout';
import PrivateLayout from './components/layouts/PrivateLayout';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';

// Private Pages
import DashboardPage from './pages/private/DashboardPage';
import LoanApplicationPage from './pages/private/LoanApplicationPage';
import LoanDetailsPage from './pages/private/LoanDetailsPage';
import ProfilePage from './pages/private/ProfilePage';
import DocumentsPage from './pages/private/DocumentsPage';

// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminCompaniesPage from './pages/admin/AdminCompaniesPage';
import AdminLoansPage from './pages/admin/AdminLoansPage';
import AdminReportsPage from './pages/admin/AdminReportsPage';

// Components
import LoadingSpinner from './components/ui/LoadingSpinner';
import NotificationContainer from './components/ui/NotificationContainer';

const App: React.FC = () => {
  const { state } = useApp();
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Show loading spinner during initial load
  if (state.isLoading && !state.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        {/* Protected Routes */}
        <Route path="/app" element={<PrivateLayout />}>
          <Route 
            index 
            element={
              state.user?.role === 'admin' ? 
                <Navigate to="/app/admin/dashboard" replace /> : 
                <Navigate to="/app/dashboard" replace />
            } 
          />
          
          {/* Borrower Routes */}
          {state.user?.role === 'borrower' && (
            <>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="apply" element={<LoanApplicationPage />} />
              <Route path="loans/:loanId" element={<LoanDetailsPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="documents" element={<DocumentsPage />} />
            </>
          )}

          {/* Admin Routes */}
          {state.user?.role === 'admin' && (
            <>
              <Route path="admin/dashboard" element={<AdminDashboardPage />} />
              <Route path="admin/companies" element={<AdminCompaniesPage />} />
              <Route path="admin/loans" element={<AdminLoansPage />} />
              <Route path="admin/reports" element={<AdminReportsPage />} />
            </>
          )}

          {/* Fallback for unauthorized access */}
          <Route 
            path="*" 
            element={
              state.user?.role === 'admin' ? 
                <Navigate to="/app/admin/dashboard" replace /> : 
                <Navigate to="/app/dashboard" replace />
            } 
          />
        </Route>

        {/* Fallback to landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global Notification Container */}
      <NotificationContainer />
    </div>
  );
};

export default App;