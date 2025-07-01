
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
    identifier: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');

    try {
      // Simple authentication - accept any credentials
      if (loginData.identifier && loginData.password) {
        // Create a mock user session
        const mockUser = {
          id: 'faculty-' + Date.now(),
          email: `${loginData.identifier}@faculty.acadnext.com`,
          user_metadata: {
            full_name: 'Faculty User',
            faculty_id: loginData.identifier,
            role: 'faculty'
          }
        };

        // Store mock session in localStorage
        localStorage.setItem('acadnext_user', JSON.stringify(mockUser));
        localStorage.setItem('acadnext_session', JSON.stringify({ user: mockUser }));
        
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          onLogin();
          navigate('/faculty-dashboard');
        }, 1000);
        return;
      }
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      {/* Top Navigation */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
        <Link to="/">
          <Button variant="ghost" size="sm" className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all">
            <div className="bg-blue-600 p-1.5 rounded-full">
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

      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full shadow-lg">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Faculty Login</CardTitle>
          <p className="text-gray-600 dark:text-gray-400">Access your faculty management portal</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="identifier">Faculty ID or Email</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="identifier"
                  type="text"
                  placeholder="Enter Faculty ID or Email"
                  value={loginData.identifier}
                  onChange={(e) => setLoginData(prev => ({ ...prev, identifier: e.target.value }))}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                  className="pl-10 pr-10"
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

            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <strong>Quick Access:</strong><br />
                Enter any Faculty ID and Password to login
              </p>
            </div>

            {success && (
              <Alert className="border-green-200 bg-green-50 text-green-800">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Login'}
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
