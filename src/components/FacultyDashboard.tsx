import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Users, 
  Upload, 
  FileText, 
  Calendar,
  BarChart3,
  MessageSquare,
  LogOut,
  GraduationCap,
  Settings,
  Bell,
  Clock,
  Plus
} from "lucide-react";
import StudentManagement from "./StudentManagement";
import FacultyProfile from "./FacultyProfile";
import FacultyTimetable from "./FacultyTimetable";
import DepartmentChat from "./DepartmentChat";
import FacultyChat from "./FacultyChat";

interface FacultyDashboardProps {
  onLogout: () => void;
}

const FacultyDashboard = ({ onLogout }: FacultyDashboardProps) => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'profile', name: 'My Profile', icon: Settings },
    { id: 'students', name: 'Student Management', icon: Users },
    { id: 'attendance', name: 'Attendance', icon: Calendar },
    { id: 'results', name: 'Results & Grades', icon: BookOpen },
    { id: 'assignments', name: 'Assignments', icon: FileText },
    { id: 'timetable', name: 'My Timetable', icon: Clock },
    { id: 'upload', name: 'Upload Materials', icon: Upload },
    { id: 'messages', name: 'Student Messages', icon: MessageSquare },
    { id: 'department', name: 'Department Chat', icon: Users },
    { id: 'notifications', name: 'Send Notifications', icon: Bell }
  ];

  const stats = [
    { title: "Total Students", value: "245", color: "text-blue-600", bgColor: "bg-blue-50" },
    { title: "Classes Today", value: "6", color: "text-green-600", bgColor: "bg-green-50" },
    { title: "Pending Grades", value: "23", color: "text-orange-600", bgColor: "bg-orange-50" },
    { title: "New Messages", value: "12", color: "text-purple-600", bgColor: "bg-purple-50" }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <FacultyProfile />;
      case 'students':
        return <StudentManagement />;
      case 'timetable':
        return <FacultyTimetable />;
      case 'department':
        return <DepartmentChat />;
      case 'messages':
        return <FacultyChat />;
      case 'attendance':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Attendance Management</h2>
              <p className="text-gray-600 dark:text-gray-400">Mark and manage student attendance</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Mark Attendance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" onClick={() => alert('Attendance marking interface')}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Mark Today's Attendance
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Users className="h-4 w-4 mr-2" />
                    View Attendance Report
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Today's Attendance</p>
                    <p className="text-3xl font-bold text-green-600">89%</p>
                    <p className="text-sm text-gray-500">156/175 students</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">This Week Average</p>
                    <p className="text-3xl font-bold text-blue-600">87%</p>
                    <p className="text-sm text-gray-500">Good attendance</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case 'results':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Results & Grades Management</h2>
              <p className="text-gray-600 dark:text-gray-400">Upload and manage student results</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Results CSV
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Report Cards
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Grade Analytics
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <p className="font-medium">Machine Learning - Semester 7</p>
                    <p className="text-gray-600">Results uploaded for 45 students</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Data Structures - Semester 5</p>
                    <p className="text-gray-600">Grades pending for 12 students</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case 'assignments':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Assignment Management</h2>
              <p className="text-gray-600 dark:text-gray-400">Create and manage assignments</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Create Assignment</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    New Assignment
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Active Assignments</p>
                    <p className="text-3xl font-bold text-blue-600">8</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Pending Reviews</p>
                    <p className="text-3xl font-bold text-orange-600">23</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">Welcome back, Prof. Johnson!</h2>
              <p className="text-green-100">Computer Science Department</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                        <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                        <BarChart3 className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Student Results
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Create Assignment
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Bell className="h-4 w-4 mr-2" />
                    Send Notification
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Mark Attendance
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Assignment Submitted</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Data Structures - 23 submissions</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">New Message</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Student query about exam schedule</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-center py-12">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-12 w-12 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {menuItems.find(item => item.id === activeSection)?.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Faculty management feature coming soon!</p>
            <p className="text-sm text-gray-500">
              This will allow you to manage student data, upload results, and more.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Acad Next</h1>
                <p className="text-xs text-gray-600 dark:text-gray-400 hidden sm:block">Faculty Portal</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
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
                          ? 'bg-green-600 text-white'
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

          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
