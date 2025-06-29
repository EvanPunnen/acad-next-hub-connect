
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { 
  Users, 
  BookOpen, 
  Calendar,
  CreditCard,
  FileText,
  Bell,
  User,
  BarChart3,
  LogOut,
  Plus,
  MessageSquare,
  GraduationCap,
  Settings
} from "lucide-react";
import StudentManagement from "./StudentManagement";
import ThemeToggle from "./ThemeToggle";
import MobileNavigation from "./MobileNavigation";

interface FacultyDashboardProps {
  onLogout: () => void;
}

const FacultyDashboard = ({ onLogout }: FacultyDashboardProps) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeStudents: 0,
    pendingAssignments: 0,
    newMessages: 0
  });
  const { user, signOut } = useAuth();

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'students', name: 'Student Management', icon: Users },
    { id: 'attendance', name: 'Attendance', icon: Calendar },
    { id: 'results', name: 'Results', icon: BookOpen },
    { id: 'assignments', name: 'Assignments', icon: FileText },
    { id: 'fees', name: 'Fees Management', icon: CreditCard },
    { id: 'messages', name: 'Messages', icon: MessageSquare },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchStats();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user!.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchStats = async () => {
    try {
      // Mock stats for now - in real app, these would be calculated from actual data
      setStats({
        totalStudents: 156,
        activeStudents: 142,
        pendingAssignments: 23,
        newMessages: 8
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = async () => {
    await signOut();
    onLogout();
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Welcome Card */}
            <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-white overflow-hidden">
              <div className="relative z-10 flex items-center space-x-4">
                <Avatar className="w-20 h-20 border-4 border-white/20">
                  <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} alt={profile?.full_name || "Faculty"} />
                  <AvatarFallback className="text-xl font-semibold bg-white/20">
                    {profile?.full_name ? profile.full_name.split(' ').map((n: string) => n[0]).join('') : 'F'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold mb-1">Welcome, {profile?.full_name || 'Faculty'}!</h2>
                  <p className="text-purple-100 mb-2">{profile?.department || 'Faculty Member'}</p>
                  <p className="text-sm text-purple-200">Faculty ID: {profile?.faculty_id || 'N/A'}</p>
                </div>
              </div>
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-white/10 to-transparent rounded-full"></div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Students</p>
                      <p className="text-2xl font-bold text-blue-600">{stats.totalStudents}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-50">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Active Students</p>
                      <p className="text-2xl font-bold text-green-600">{stats.activeStudents}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-green-50">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Pending Reviews</p>
                      <p className="text-2xl font-bold text-orange-600">{stats.pendingAssignments}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-orange-50">
                      <FileText className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">New Messages</p>
                      <p className="text-2xl font-bold text-purple-600">{stats.newMessages}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-50">
                      <MessageSquare className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start" onClick={() => setActiveSection('students')}>
                  <Users className="h-4 w-4 mr-2" />
                  Manage Students
                </Button>
                <Button variant="outline" className="justify-start h-auto p-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Student
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => setActiveSection('assignments')}>
                  <FileText className="h-4 w-4 mr-2" />
                  Review Assignments
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => setActiveSection('messages')}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Check Messages
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">New Assignment Submitted</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">3 students submitted their assignments</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <Users className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Student Enrollment</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">2 new students enrolled in your course</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'students':
        return <StudentManagement />;

      default:
        return (
          <div className="text-center py-12">
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-12 w-12 text-purple-600" />
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 md:pb-0">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-600 p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">AcadNext</h1>
                <p className="text-xs text-gray-600 dark:text-gray-400 hidden sm:block">Faculty Portal</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 md:space-x-4">
              <ThemeToggle />
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setActiveSection('notifications')}
                className="relative"
              >
                <Bell className="h-4 w-4" />
                {stats.newMessages > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {stats.newMessages}
                  </span>
                )}
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setActiveSection('profile')}
              >
                <Avatar className="w-6 h-6">
                  <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} alt="Profile" />
                  <AvatarFallback className="text-xs">
                    {profile?.full_name ? profile.full_name.split(' ').map((n: string) => n[0]).join('') : 'F'}
                  </AvatarFallback>
                </Avatar>
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleLogout}
                className="text-gray-600 dark:text-gray-400 hover:text-red-600"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Sidebar */}
          <div className="w-full lg:w-64 hidden lg:block">
            <Card className="sticky top-24">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeSection === item.id
                          ? 'bg-purple-600 text-white'
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

      {/* Mobile Navigation */}
      <MobileNavigation 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        menuItems={menuItems}
      />
    </div>
  );
};

export default FacultyDashboard;
