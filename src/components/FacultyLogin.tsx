import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { GraduationCap, User, Lock, Home, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";

interface FacultyLoginProps {
  onLogin: () => void;
  onBackToStudent: () => void;
}

const FacultyLogin = ({ onLogin, onBackToStudent }: FacultyLoginProps) => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ 
    identifier: '', // Can be faculty ID or email
    password: '' 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let email = loginData.identifier;
      
      // If it's not an email, assume it's a faculty ID and convert
      if (!loginData.identifier.includes('@')) {
        email = `${loginData.identifier}@faculty.acadnext.edu`;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: loginData.password,
      });

      if (error) {
        // Try default faculty account for testing
        if (loginData.identifier === 'FAC001' && loginData.password === 'faculty123') {
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
            // Try to sign in again
            const { error: loginError } = await supabase.auth.signInWithPassword({
              email: 'FAC001@faculty.acadnext.edu',
              password: 'faculty123',
            });
            
            if (!loginError) {
              onLogin();
              navigate('/faculty-dashboard');
              return;
            }
          }
        }
        
        setError('Invalid credentials. Try: FAC001 / faculty123');
      } else if (data.user) {
        // Check if user is faculty
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        if (profile?.role === 'faculty' || profile?.role === 'admin') {
          onLogin();
          navigate('/faculty-dashboard');
        } else {
          setError('Access denied. Faculty credentials required.');
          await supabase.auth.signOut();
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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

      <main className="max-w-md mx-auto px-4 py-12 pt-20">
        <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardHeader className="text-center pb-4">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-full inline-block mb-4">
              <User className="h-8 w-8 text-white" />
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
                  <strong>Test Credentials:</strong><br />
                  Faculty ID: FAC001<br />
                  Password: faculty123
                </p>
              </div>

              {error && (
                <Alert className="border-red-200 bg-red-50 text-red-800">
                  <AlertDescription>{error}</AlertDescription>
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
      </main>
    </div>
  );
};

export default FacultyLogin;
