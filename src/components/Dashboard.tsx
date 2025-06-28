import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Calendar, 
  CreditCard, 
  FileText, 
  MessageSquare, 
  Bell, 
  Users, 
  BarChart3, 
  Clock,
  AlertCircle,
  CheckCircle,
  User,
  LogOut,
  GraduationCap,
  Settings as SettingsIcon,
  DollarSign,
  Brain,
  Calculator
} from "lucide-react";
import Settings from "./Settings";
import Messenger from "./Messenger";
import MoneyCollection from "./MoneyCollection";
import AcademicAnalyzer from "./AcademicAnalyzer";
import Library from "./Library";
import Events from "./Events";
import Transport from "./Transport";
import GradeCalculator from "./GradeCalculator";

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [activeSection, setActiveSection] = useState('dashboard');

  // Mock data - in real app this would come from API
  const studentData = {
    name: "John Smith",
    studentId: "CS2024001",
    class: "Computer Science - Final Year",
    semester: "7th Semester",
    attendance: 87,
    pendingFees: 25000,
    totalFees: 100000,
    notifications: 5,
    nextClass: "Data Structures at 10:00 AM",
    upcomingExam: "Database Systems - Dec 15, 2024"
  };

  const quickStats = [
    {
      title: "Attendance",
      value: `${studentData.attendance}%`,
      icon: Clock,
      color: studentData.attendance >= 75 ? "text-green-600" : "text-red-600",
      bgColor: studentData.attendance >= 75 ? "bg-green-50" : "bg-red-50"
    },
    {
      title: "Pending Fees",
      value: `₹${studentData.pendingFees.toLocaleString()}`,
      icon: CreditCard,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "Notifications",
      value: studentData.notifications.toString(),
      icon: Bell,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Assignments Due",
      value: "3",
      icon: FileText,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'attendance', name: 'Attendance', icon: Clock },
    { id: 'results', name: 'Results', icon: BookOpen },
    { id: 'fees', name: 'Fees', icon: CreditCard },
    { id: 'timetable', name: 'Timetable', icon: Calendar },
    { id: 'assignments', name: 'Assignments', icon: FileText },
    { id: 'chat', name: 'Faculty Chat', icon: MessageSquare },
    { id: 'messenger', name: 'Class Groups', icon: Users },
    { id: 'money-collection', name: 'Money Collection', icon: DollarSign },
    { id: 'ai-analyzer', name: 'AI Analyzer', icon: Brain },
    { id: 'library', name: 'Library', icon: BookOpen },
    { id: 'events', name: 'Events', icon: Calendar },
    { id: 'transport', name: 'Transport', icon: Users },
    { id: 'grade-calculator', name: 'Grade Calculator', icon: Calculator },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'notes', name: 'Notes & Resources', icon: BookOpen },
    { id: 'settings', name: 'Settings', icon: SettingsIcon }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'settings':
        return <Settings />;
      
      case 'messenger':
        return <Messenger />;

      case 'money-collection':
        return <MoneyCollection />;

      case 'ai-analyzer':
        return <AcademicAnalyzer />;

      case 'library':
        return <Library />;

      case 'events':
        return <Events />;

      case 'transport':
        return <Transport />;

      case 'grade-calculator':
        return <GradeCalculator />;
      
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">Welcome back, {studentData.name}!</h2>
              <p className="text-blue-100">{studentData.class} • {studentData.semester}</p>
              <p className="text-blue-100 mt-2">Student ID: {studentData.studentId}</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {quickStats.map((stat, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.title}</p>
                        <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity & Upcoming */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-orange-500" />
                    Upcoming
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Next Class</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{studentData.nextClass}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <FileText className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Upcoming Exam</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{studentData.upcomingExam}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Assignment Due</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Machine Learning Project - Tomorrow</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message Faculty
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Submit Assignment
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay Fees Online
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Download Notes
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-center py-12">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {menuItems.find(item => item.id === activeSection)?.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">This section is coming soon!</p>
            <p className="text-sm text-gray-500">
              We're working hard to bring you this feature. Stay tuned for updates.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Acad Next</h1>
                <p className="text-xs text-gray-600 dark:text-gray-400 hidden sm:block">Student Portal</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="h-6 w-6 text-gray-600 dark:text-gray-400 cursor-pointer hover:text-blue-600" />
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5">
                  {studentData.notifications}
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">
                  {studentData.name}
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onLogout}
                className="text-gray-600 dark:text-gray-400 hover:text-red-600"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full lg:w-64">
            <Card className="sticky top-24">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeSection === item.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.name}</span>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
