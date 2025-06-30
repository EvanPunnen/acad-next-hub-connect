import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { Eye, EyeOff, GraduationCap, Mail, Lock, User, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";

interface AuthPageProps {
  onAuthSuccess: () => void;
}

const AuthPage = ({ onAuthSuccess }: AuthPageProps) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Login form state
  const [loginData, setLoginData] = useState({
    identifier: '', // Can be student ID or email
    password: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let email = loginData.identifier;
      
      // If it's not an email, assume it's a student ID and convert
      if (!loginData.identifier.includes('@')) {
        email = `${loginData.identifier}@student.acadnext.edu`;
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: loginData.password,
      });

      if (error) {
        // Try some default accounts for testing
        if (loginData.identifier === 'STU001' && loginData.password === 'password123') {
          // Create a test student account
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: 'STU001@student.acadnext.edu',
            password: 'password123',
            options: {
              emailRedirectTo: `${window.location.origin}/dashboard`,
              data: {
                full_name: 'Test Student',
                student_id: 'STU001',
                role: 'student'
              }
            }
          });
          
          if (!signUpError && signUpData.user) {
            setSuccess('Test account created! Logging in...');
            // Try to sign in again
            const { error: loginError } = await supabase.auth.signInWithPassword({
              email: 'STU001@student.acadnext.edu',
              password: 'password123',
            });
            
            if (!loginError) {
              onAuthSuccess();
              navigate('/dashboard');
              return;
            }
          }
        } else if (loginData.identifier === 'FAC001' && loginData.password === 'faculty123') {
          // Create a test faculty account
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: 'FAC001@faculty.acadnext.edu',
            password: 'faculty123',
            options: {
              emailRedirectTo: `${window.location.origin}/faculty-dashboard`,
              data: {
                full_name: 'Test Faculty',
                faculty_id: 'FAC001',
                role: 'faculty'
              }
            }
          });
          
          if (!signUpError && signUpData.user) {
            setSuccess('Test faculty account created! Logging in...');
            // Try to sign in again
            const { error: loginError } = await supabase.auth.signInWithPassword({
              email: 'FAC001@faculty.acadnext.edu',
              password: 'faculty123',
            });
            
            if (!loginError) {
              onAuthSuccess();
              navigate('/faculty-dashboard');
              return;
            }
          }
        }
        
        setError('Invalid credentials. Try: STU001/password123 (student) or FAC001/faculty123 (faculty)');
      } else if (data.user) {
        setSuccess('Login successful!');
        
        // Check user role to redirect appropriately
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();
          
        if (profile?.role === 'faculty') {
          navigate('/faculty-dashboard');
        } else {
          navigate('/dashboard');
        }
        
        onAuthSuccess();
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      {/* Top Navigation */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
        <Link to="/">
          <Button variant="ghost" size="sm" className="flex items-center space-x-2">
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Button>
        </Link>
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-md relative">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome to AcadNext</CardTitle>
          <p className="text-gray-600 dark:text-gray-400">Academic Portal Access</p>
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

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing In...' : 'Login'}
            </Button>
          </form>

          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>Test Credentials:</strong><br />
              Student: STU001 / password123<br />
              Faculty: FAC001 / faculty123
            </p>
          </div>

          {error && (
            <Alert className="mt-4 border-red-200 bg-red-50 text-red-800">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mt-4 border-green-200 bg-green-50 text-green-800">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
