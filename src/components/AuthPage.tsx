
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, GraduationCap, Lock, User, Home, Moon, Sun } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";

interface AuthPageProps {
  onAuthSuccess: () => void;
}

const AuthPage = ({ onAuthSuccess }: AuthPageProps) => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  // Login form state
  const [loginData, setLoginData] = useState({
    identifier: '',
    password: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');

    try {
      // Simple authentication - accept any credentials
      if (loginData.identifier && loginData.password) {
        // Create a mock user session
        const mockUser = {
          id: 'student-' + Date.now(),
          email: `${loginData.identifier}@acadnext.com`,
          user_metadata: {
            full_name: 'Student User',
            student_id: loginData.identifier,
            role: 'student'
          }
        };

        // Store mock session in localStorage
        localStorage.setItem('acadnext_user', JSON.stringify(mockUser));
        localStorage.setItem('acadnext_session', JSON.stringify({ user: mockUser }));
        
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          onAuthSuccess();
          navigate('/dashboard');
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

      <Card className="w-full max-w-md relative shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full shadow-lg">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome to AcadNext</CardTitle>
          <p className="text-gray-600 dark:text-gray-400">Student Portal Access</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="identifier">Student ID or Email</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="identifier"
                  type="text"
                  placeholder="Enter Student ID or Email"
                  className="pl-10"
                  value={loginData.identifier}
                  onChange={(e) => setLoginData({...loginData, identifier: e.target.value})}
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
                  className="pl-10 pr-10"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
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

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
              {loading ? 'Signing In...' : 'Login'}
            </Button>
          </form>

          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>Quick Access:</strong><br />
              Enter any Student ID and Password to login
            </p>
          </div>

          {success && (
            <Alert className="mt-4 border-green-200 bg-green-50 text-green-800">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <div className="mt-6 text-center">
            <Link to="/faculty">
              <Button 
                variant="link" 
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600"
              >
                Faculty Login
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
