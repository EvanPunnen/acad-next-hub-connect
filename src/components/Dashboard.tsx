import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  BookOpen, 
  Calendar,
  CalendarDays,
  Clock,
  CreditCard,
  FileText,
  GraduationCap,
  ListChecks,
  Mail,
  MapPin,
  MessageSquare,
  Settings,
  TrendingUp,
  User,
  Users,
  Bus,
  File,
  Calculator,
  Bell,
  Award,
  BarChart3
} from "lucide-react";
import Attendance from "./Attendance";
import Results from "./Results";
import Fees from "./Fees";
import Timetable from "./Timetable";
import Assignments from "./Assignments";
import Library from "./Library";
import Events from "./Events";
import Transport from "./Transport";
import Messenger from "./Messenger";
import FacultyChat from "./FacultyChat";
import NotesResources from "./NotesResources";
import GradeCalculator from "./GradeCalculator";
import Notifications from "./Notifications";
import StudentProfile from "./StudentProfile";
import LeaveApplication from "./LeaveApplication";
import CertificateUpload from "./CertificateUpload";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'attendance', name: 'Attendance', icon: Calendar },
    { id: 'results', name: 'Results', icon: BookOpen },
    { id: 'fees', name: 'Fees', icon: CreditCard },
    { id: 'timetable', name: 'Timetable', icon: Clock },
    { id: 'assignments', name: 'Assignments', icon: FileText },
    { id: 'library', name: 'Library', icon: Book },
    { id: 'events', name: 'Events', icon: CalendarDays },
    { id: 'transport', name: 'Transport', icon: Bus },
    { id: 'messenger', name: 'Messenger', icon: MessageSquare },
    { id: 'faculty-chat', name: 'Faculty Chat', icon: Users },
    { id: 'notes', name: 'Notes & Resources', icon: FileText },
    { id: 'grade-calculator', name: 'Grade Calculator', icon: Calculator },
    { id: 'leave-application', name: 'Leave Application', icon: Calendar },
    { id: 'certificates', name: 'Certificates', icon: Award },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'profile', name: 'Profile', icon: User }
  ];

  const quickStats = [
    { title: "Attendance", value: "89%", subtitle: "Good job!", color: "text-green-600", bgColor: "bg-green-50", icon: ListChecks },
    { title: "CGPA", value: "8.7", subtitle: "On track", color: "text-blue-600", bgColor: "bg-blue-50", icon: TrendingUp },
    { title: "Pending Fees", value: "₹2,500", subtitle: "Pay soon", color: "text-orange-600", bgColor: "bg-orange-50", icon: CreditCard },
    { title: "New Messages", value: "3", subtitle: "Check inbox", color: "text-purple-600", bgColor: "bg-purple-50", icon: Mail }
  ];

  const markPresent = () => {
    alert('Attendance marked successfully!');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Welcome Card with Student Photo and Status */}
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white overflow-hidden">
              <div className="relative z-10 flex items-center space-x-4">
                <div className="relative">
                  <Avatar className="w-20 h-20 border-4 border-white/20">
                    <AvatarImage src="/placeholder.svg" alt="John Smith" />
                    <AvatarFallback className="text-xl font-semibold bg-white/20">JS</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 flex items-center space-x-1 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span>In College</span>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">Welcome back, John!</h2>
                  <p className="text-blue-100 mb-2">Computer Science - Final Year</p>
                  <p className="text-sm text-blue-200">Student ID: CS2024001</p>
                </div>
              </div>
              <Button 
                onClick={markPresent}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Mark Present
              </Button>
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-white/10 to-transparent rounded-full"></div>
              <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full"></div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {quickStats.map((stat, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                        <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                        <p className="text-xs text-gray-500">{stat.subtitle}</p>
                      </div>
                      <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  View Assignments
                </Button>
                <Button variant="outline" className="justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Check Timetable
                </Button>
                <Button variant="outline" className="justify-start">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pay Fees
                </Button>
                <Button variant="outline" className="justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Faculty
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">New Assignment</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Data Structures - Due Feb 10</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">New Message</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Prof. Smith - Exam schedule</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium">Database Systems</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">9:00 AM - 10:30 AM</p>
                  </div>
                  <Badge variant="secondary">CS-101</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium">Machine Learning</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">11:00 AM - 12:30 PM</p>
                  </div>
                  <Badge variant="secondary">CS-102</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'attendance':
        return <Attendance />;
      case 'results':
        return <Results />;
      case 'fees':
        return <Fees />;
      case 'timetable':
        return <Timetable />;
      case 'assignments':
        return <Assignments />;
      case 'library':
        return <Library />;
      case 'events':
        return <Events />;
      case 'transport':
        return <Transport />;
      case 'messenger':
        return <Messenger />;
      case 'faculty-chat':
        return <FacultyChat />;
      case 'notes':
        return <NotesResources />;
      case 'grade-calculator':
        return <GradeCalculator />;
      case 'notifications':
        return <Notifications />;
      case 'profile':
        return <StudentProfile />;
      case 'leave-application':
        return <LeaveApplication />;
      case 'certificates':
        return <CertificateUpload />;
      default:
        return (
          <div className="text-center py-12">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {menuItems.find(item => item.id === activeSection)?.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Feature coming soon!</p>
            <p className="text-sm text-gray-500">
              This section is under development and will be available shortly.
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
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setActiveSection('notifications')}
                className="relative"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setActiveSection('profile')}
              >
                <Avatar className="w-6 h-6">
                  <AvatarImage src="/placeholder.svg" alt="Profile" />
                  <AvatarFallback className="text-xs">JS</AvatarFallback>
                </Avatar>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
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

          {/* Main Content Area */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
