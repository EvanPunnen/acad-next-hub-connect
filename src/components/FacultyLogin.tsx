
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GraduationCap, User, Lock, Home, Eye, EyeOff, Moon, Sun, BookOpen, Users, Calendar, Shield } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 flex items-center justify-center p-4">
      {/* Top Navigation */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
        <Link to="/">
          <Button variant="ghost" size="sm" className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg hover:bg-white/20 transition-all border border-white/20">
            <div className="bg-white/20 p-1.5 rounded-full">
              <Home className="h-4 w-4 text-white" />
            </div>
            <span className="font-medium text-white">Home</span>
          </Button>
        </Link>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="bg-white/10 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white/20 transition-all border border-white/20"
        >
          {theme === "light" ? (
            <Moon className="h-4 w-4 text-white" />
          ) : (
            <Sun className="h-4 w-4 text-white" />
          )}
        </Button>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Login Card */}
        <Card className="shadow-2xl bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-4 rounded-2xl shadow-xl">
                <GraduationCap className="h-10 w-10 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-white">Faculty Portal</CardTitle>
            <p className="text-white/80 text-lg">Complete Student Management System</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="identifier" className="text-white font-medium">Faculty ID or Email</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-white/60" />
                  <Input
                    id="identifier"
                    type="text"
                    placeholder="Enter Faculty ID or Email"
                    value={loginData.identifier}
                    onChange={(e) => setLoginData(prev => ({ ...prev, identifier: e.target.value }))}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-white/60" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                    className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40 rounded-xl"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-white/60 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-sm text-white/80 text-center">
                  <strong className="text-white">Demo Access:</strong><br />
                  Enter any Faculty ID and Password to access the full management system
                </p>
              </div>

              {success && (
                <Alert className="bg-green-500/20 border-green-400/30 text-green-100">
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={loading}
              >
                {loading ? 'Setting up Dashboard...' : 'Access Faculty Portal'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/auth">
                <Button 
                  variant="link" 
                  className="text-white/70 hover:text-white"
                >
                  ← Switch to Student Login
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Features Overview Card */}
        <Card className="shadow-2xl bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-white">Faculty Management Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-lg">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Student Management</h3>
                  <p className="text-sm text-white/70">Add, edit, view and manage all your students. Track their progress and details.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-2 rounded-lg">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Attendance System</h3>
                  <p className="text-sm text-white/70">Mark attendance by period, track student presence and generate reports.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-lg">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Assignment & Grades</h3>
                  <p className="text-sm text-white/70">Create assignments, track submissions and manage student grades.</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 p-4 rounded-xl border border-white/10">
                <div className="flex items-center space-x-2 mb-3">
                  <Shield className="h-5 w-5 text-orange-400" />
                  <h3 className="font-semibold text-white">Additional Features:</h3>
                </div>
                <ul className="text-sm text-white/70 space-y-2">
                  <li>• Fee Management & Payment Tracking</li>
                  <li>• Event Creation & Student Registration</li>
                  <li>• Transport & Bus Route Management</li>
                  <li>• Timetable Scheduling & Management</li>
                  <li>• Notification System & Announcements</li>
                  <li>• Faculty Communication Dashboard</li>
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
