
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { ThemeProvider } from '@/contexts/ThemeContext';
import AuthPage from '@/components/AuthPage';
import Dashboard from '@/components/Dashboard';
import FacultyLogin from '@/components/FacultyLogin';
import FacultyDashboard from '@/components/FacultyDashboard';
import ContactSupport from '@/components/ContactSupport';
import Index from '@/pages/Index';
import { useState } from 'react';
import './App.css';

function AppContent() {
  const { user, loading } = useAuth();
  const [showFacultyLogin, setShowFacultyLogin] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Index />
            )
          } 
        />
        <Route 
          path="/auth" 
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <AuthPage onAuthSuccess={() => window.location.href = '/dashboard'} />
            )
          } 
        />
        <Route 
          path="/faculty" 
          element={
            user ? (
              <Navigate to="/faculty-dashboard" replace />
            ) : (
              <FacultyLogin 
                onLogin={() => window.location.href = '/faculty-dashboard'} 
                onBackToStudent={() => window.location.href = '/'}
              />
            )
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            user ? (
              <Dashboard onLogout={() => window.location.href = '/'} />
            ) : (
              <Navigate to="/auth" replace />
            )
          } 
        />
        <Route 
          path="/faculty-dashboard" 
          element={
            user ? (
              <FacultyDashboard onLogout={() => window.location.href = '/'} />
            ) : (
              <Navigate to="/faculty" replace />
            )
          } 
        />
        <Route 
          path="/contact" 
          element={
            <ContactSupport onBack={() => window.history.back()} />
          } 
        />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
