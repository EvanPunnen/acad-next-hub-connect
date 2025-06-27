
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Users, Calendar, CreditCard, MessageSquare, Bell, FileText, Clock, GraduationCap, Smartphone } from "lucide-react";
import Dashboard from "@/components/Dashboard";
import FacultyLogin from "@/components/FacultyLogin";
import FacultyDashboard from "@/components/FacultyDashboard";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFacultyMode, setIsFacultyMode] = useState(false);
  const [isFacultyLoggedIn, setIsFacultyLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ studentId: '', password: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.studentId && loginData.password) {
      setIsLoggedIn(true);
    }
  };

  const handleFacultyLogin = () => {
    setIsFacultyLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsFacultyLoggedIn(false);
    setIsFacultyMode(false);
    setLoginData({ studentId: '', password: '' });
  };

  if (isFacultyLoggedIn) {
    return <FacultyDashboard onLogout={handleLogout} />;
  }

  if (isFacultyMode) {
    return (
      <FacultyLogin
        onLogin={handleFacultyLogin}
        onBackToStudent={() => setIsFacultyMode(false)}
      />
    );
  }

  if (isLoggedIn) {
    return <Dashboard onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Acad Next</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Student Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => setIsFacultyMode(true)}>
                Faculty Login
              </Button>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Smartphone className="h-4 w-4" />
                <span>Mobile & Web</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Features */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Everything You Need for College,
                <span className="text-blue-600"> All in One Place</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Access attendance, results, fees, timetables, assignments, and connect with faculty - 
                all from your smartphone or computer.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: BookOpen, title: "Attendance & Results", desc: "Track your progress" },
                { icon: CreditCard, title: "Fee Management", desc: "View dues & payments" },
                { icon: Calendar, title: "Timetables & Exams", desc: "Never miss a class" },
                { icon: MessageSquare, title: "Faculty Chat", desc: "Direct communication" },
                { icon: FileText, title: "Assignments", desc: "Submit with ease" },
                { icon: Bell, title: "Smart Notifications", desc: "Stay updated" }
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm border">
                  <feature.icon className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="lg:pl-8">
            <Card className="w-full max-w-md mx-auto shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Student Login</CardTitle>
                <p className="text-gray-600 dark:text-gray-400">Access your student portal</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentId" className="text-sm font-medium">Student ID</Label>
                    <Input
                      id="studentId"
                      type="text"
                      placeholder="Enter your student ID"
                      value={loginData.studentId}
                      onChange={(e) => setLoginData(prev => ({ ...prev, studentId: e.target.value }))}
                      className="h-11"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                      className="h-11"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium">
                    Sign In to Portal
                  </Button>
                </form>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Need help? <button className="text-blue-600 hover:underline">Contact Support</button>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Features Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Acad Next?</h3>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Save Time</h4>
              <p className="text-gray-600 dark:text-gray-400">Everything in one app - no need to check multiple platforms</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Stay Connected</h4>
              <p className="text-gray-600 dark:text-gray-400">Direct communication with faculty and classmates</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Mobile First</h4>
              <p className="text-gray-600 dark:text-gray-400">Optimized for your smartphone and tablet</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
