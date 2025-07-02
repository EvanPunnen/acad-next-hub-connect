
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GraduationCap, User, Lock, Home, Eye, EyeOff, Moon, Sun, BookOpen, Users, Calendar } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { localBackend } from "@/utils/localBackend";

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
      // Accept any credentials for login
      if (loginData.identifier && loginData.password) {
        // Create a mock faculty user session
        const mockUser = {
          id: 'faculty-' + Date.now(),
          email: `${loginData.identifier}@faculty.acadnext.com`,
          user_metadata: {
            full_name: 'Dr. ' + loginData.identifier.charAt(0).toUpperCase() + loginData.identifier.slice(1),
            faculty_id: loginData.identifier,
            role: 'faculty',
            department: 'Computer Science',
            subjects: ['Database Systems', 'Software Engineering', 'Data Structures']
          }
        };

        // Store mock session in localStorage
        localStorage.setItem('acadnext_user', JSON.stringify(mockUser));
        localStorage.setItem('acadnext_session', JSON.stringify({ user: mockUser }));
        
        // Initialize sample data for this faculty
        localBackend.initializeSampleData(mockUser.id);
        
        setSuccess('Login successful! Setting up your faculty dashboard...');
        
        // Force immediate redirect
        setTimeout(() => {
          onLogin();
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
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

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Login Card */}
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-full shadow-lg">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Faculty Portal</CardTitle>
            <p className="text-gray-600 dark:text-gray-400">Complete Student Management System</p>
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

              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-sm text-purple-800 dark:text-purple-300">
                  <strong>Demo Access:</strong><br />
                  Enter any Faculty ID and Password to access the full management system
                </p>
              </div>

              {success && (
                <Alert className="border-green-200 bg-green-50 text-green-800">
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                disabled={loading}
              >
                {loading ? 'Setting up Dashboard...' : 'Access Faculty Portal'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/auth">
                <Button 
                  variant="link" 
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600"
                >
                  Switch to Student Login
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Features Overview Card */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-center">Faculty Management Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Users className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100">Student Management</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300">Add, edit, view and manage all your students. Track their progress and details.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Calendar className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-green-900 dark:text-green-100">Attendance System</h3>
                  <p className="text-sm text-green-700 dark:text-green-300">Mark attendance by period, track student presence and generate reports.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <BookOpen className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-purple-900 dark:text-purple-100">Assignment & Grades</h3>
                  <p className="text-sm text-purple-700 dark:text-purple-300">Create assignments, track submissions and manage student grades.</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-3 rounded-lg">
                <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">Additional Features:</h3>
                <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-1">
                  <li>• Fee Management & Payment Tracking</li>
                  <li>• Event Creation & Student Registration</li>
                  <li>• Transport & Bus Route Management</li>
                  <li>• Timetable Scheduling</li>
                  <li>• Notification System</li>
                  <li>• Faculty Communication Chat</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FacultyLogin;
