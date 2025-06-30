
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { ThemeProvider } from '@/contexts/ThemeContext';
import AuthPage from '@/components/AuthPage';
import Dashboard from '@/components/Dashboard';
import FacultyLogin from '@/components/FacultyLogin';
import FacultyDashboard from '@/components/FacultyDashboard';
import ContactSupport from '@/components/ContactSupport';
import SplashScreen from '@/components/SplashScreen';
import Index from '@/pages/Index';
import { useState } from 'react';
import './App.css';

function AppContent() {
  const { user, loading } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (showSplash && !user) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
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
              <AuthPage onAuthSuccess={() => {}} />
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
                onLogin={() => {}} 
                onBackToStudent={() => {}}
              />
            )
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            user ? (
              <Dashboard onLogout={() => {}} />
            ) : (
              <Navigate to="/auth" replace />
            )
          } 
        />
        <Route 
          path="/faculty-dashboard" 
          element={
            user ? (
              <FacultyDashboard onLogout={() => {}} />
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
