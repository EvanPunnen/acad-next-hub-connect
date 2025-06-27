
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, User, Lock } from "lucide-react";

interface FacultyLoginProps {
  onLogin: () => void;
  onBackToStudent: () => void;
}

const FacultyLogin = ({ onLogin, onBackToStudent }: FacultyLoginProps) => {
  const [loginData, setLoginData] = useState({ facultyId: '', password: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.facultyId && loginData.password) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Acad Next</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Faculty Portal</p>
              </div>
            </div>
            <Button variant="outline" onClick={onBackToStudent}>
              Student Login
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-12">
        <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Faculty Login</CardTitle>
            <p className="text-gray-600 dark:text-gray-400">Access faculty management portal</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="facultyId" className="text-sm font-medium">Faculty ID</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="facultyId"
                    type="text"
                    placeholder="Enter your faculty ID"
                    value={loginData.facultyId}
                    onChange={(e) => setLoginData(prev => ({ ...prev, facultyId: e.target.value }))}
                    className="h-11 pl-10"
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
                    type="password"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                    className="h-11 pl-10"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full h-11 bg-green-600 hover:bg-green-700 text-white font-medium">
                Sign In to Faculty Portal
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default FacultyLogin;
