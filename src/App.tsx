import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { ThemeProvider } from "@/contexts/ThemeContext";
import UnifiedLogin from "@/components/UnifiedLogin";
import Dashboard from "@/components/Dashboard";
import FacultyDashboard from "@/components/FacultyDashboard";
import ContactSupport from "@/components/ContactSupport";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import SplashScreen from "@/components/SplashScreen";
import { useState } from "react";
import "./App.css";

function AppContent() {
  const { user, loading } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Show splash screen only when no user is logged in
  if (showSplash && !user) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  const handleAuthSuccess = () => {
    // Instead of reloading, just update the state
    setShowSplash(false);
  };

  const handleLogout = () => {
    // Clear localStorage and force reload
    localStorage.removeItem("acadnext_user");
    localStorage.removeItem("acadnext_session");
    window.location.href = "/";
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              user.user_metadata?.role === "faculty" ? (
                <Navigate to="/faculty-dashboard" replace />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            ) : (
              <Index />
            )
          }
        />
        <Route
          path="/login"
          element={
            user ? (
              user.user_metadata?.role === "faculty" ? (
                <Navigate to="/faculty-dashboard" replace />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            ) : (
              <UnifiedLogin onAuthSuccess={handleAuthSuccess} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/faculty-dashboard"
          element={
            user ? (
              <FacultyDashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/contact"
          element={<ContactSupport onBack={() => window.history.back()} />}
        />
        <Route path="*" element={<NotFound />} />
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
