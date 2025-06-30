
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { GraduationCap, User, Lock, Home, Eye, EyeOff, Moon, Sun } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";

interface FacultyLoginProps {
  onLogin: () => void;
  onBackToStudent: () => void;
}

const FacultyLogin = ({ onLogin, onBackToStudent }: FacultyLoginProps) => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [loginData, setLoginData] = useState({ 
    identifier: 'FAC001', // Pre-filled for easy testing
    password: 'faculty123' // Pre-filled for easy testing
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Direct login with test credentials
      if (loginData.identifier === 'FAC001' && loginData.password === 'faculty123') {
        // Create a mock user session for testing
        const mockUser = {
          id: 'test-faculty-id',
          email: 'fac001@faculty.acadnext.com',
          user_metadata: {
            full_name: 'Test Faculty',
            faculty_id: 'FAC001',
            role: 'faculty'
          }
        };

        // Store mock session in localStorage for testing
        localStorage.setItem('acadnext_user', JSON.stringify(mockUser));
        localStorage.setItem('acadnext_session', JSON.stringify({ user: mockUser }));
        
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          onLogin();
          navigate('/faculty-dashboard');
        }, 1000);
        return;
      }

      // Try regular Supabase login
      let email = loginData.identifier;
      if (!loginData.identifier.includes('@')) {
        email = `${loginData.identifier}@faculty.acadnext.com`;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: loginData.password,
      });

      if (error) {
        setError('Invalid credentials. Use: FAC001 / faculty123 for testing');
      } else if (data.user) {
        setSuccess('Login successful!');
        onLogin();
        navigate('/faculty-dashboard');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      {/* Top Navigation */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
        <Link to="/">
          <Button variant="ghost" size="sm" className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all">
            <div className="bg-purple-600 p-1.5 rounded-full">
              <Home className="h-4 w-4 text-white" />
            </div>
            <span className="font-medium">Home</span>
          </Button>
        </Link>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all"
        >
          {theme === "light" ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </Button>
      </div>

      <Card className="w-full max-w-md shadow-xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
        <CardHeader className="text-center pb-4">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-full inline-block mb-4 shadow-lg">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Faculty Login</CardTitle>
          <p className="text-gray-600 dark:text-gray-400">Access your faculty management portal</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="identifier" className="text-sm font-medium">Faculty ID or Email</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="identifier"
                  type="text"
                  placeholder="Enter Faculty ID or Email"
                  value={loginData.identifier}
                  onChange={(e) => setLoginData(prev => ({ ...prev, identifier: e.target.value }))}
                  className="h-12 pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                  className="h-12 pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <p className="text-sm text-purple-800 dark:text-purple-300">
                <strong>Test Credentials (Ready to use):</strong><br />
                Faculty ID: FAC001<br />
                Password: faculty123
              </p>
            </div>

            {error && (
              <Alert className="border-red-200 bg-red-50 text-red-800">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-green-200 bg-green-50 text-green-800">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium text-lg"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In to Faculty Portal'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/auth">
              <Button 
                variant="link" 
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600"
              >
                Switch to Student Login
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyLogin;
