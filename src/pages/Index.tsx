
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Users, BookOpen, Calendar, CreditCard, MessageSquare, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";

const Index = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full">
                <GraduationCap className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">AcadNext</h1>
                <p className="text-blue-100">College Management System</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="bg-white/10 hover:bg-white/20 text-white"
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
          </div>

          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Complete College Management Solution
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Streamline student management, attendance tracking, fee collection, and academic processes 
              with our comprehensive platform designed for modern educational institutions.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Portal Selection */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Choose Your Portal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-300">
              <CardHeader className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900/20 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Student Portal</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-gray-600 dark:text-gray-400">
                  Access your academic records, assignments, attendance, fee status and more.
                </p>
                <ul className="text-sm text-gray-500 space-y-1 text-left">
                  <li>• View Attendance & Academic Records</li>
                  <li>• Submit Assignments & View Results</li>
                  <li>• Check Fee Status & Payment History</li>
                  <li>• Access Timetable & Event Updates</li>
                  <li>• Communicate with Faculty</li>
                </ul>
                <Link to="/auth" className="block">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Student Login
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-300">
              <CardHeader className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/20 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Faculty Portal</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-gray-600 dark:text-gray-400">
                  Manage students, track attendance, create assignments and handle administrative tasks.
                </p>
                <ul className="text-sm text-gray-500 space-y-1 text-left">
                  <li>• Manage Student Records & Profiles</li>
                  <li>• Mark Attendance & Generate Reports</li>
                  <li>• Create Assignments & Grade Submissions</li>
                  <li>• Manage Events & Transport</li>
                  <li>• Send Notifications & Messages</li>
                </ul>
                <Link to="/faculty" className="block">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Faculty Login
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Overview */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Comprehensive Management Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Attendance Management</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Real-time attendance tracking with automated notifications
              </p>
            </div>
            <div className="text-center">
              <CreditCard className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Fee Management</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Track payments, generate receipts and manage fee collections
              </p>
            </div>
            <div className="text-center">
              <MessageSquare className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Communication Hub</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Faculty-student messaging and announcement system
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Need Help?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Contact our support team for assistance with setup or any questions about the platform.
          </p>
          <Link to="/contact">
            <Button variant="outline" size="lg">
              Contact Support
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Index;
