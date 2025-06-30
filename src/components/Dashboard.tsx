import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
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
  TrendingUp,
  User,
  Users,
  Bus,
  File,
  Calculator,
  Bell,
  Award,
  BarChart3,
  LogOut
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
import MobileNavigation from "./MobileNavigation";
import ThemeToggle from "./ThemeToggle";

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState({
    attendance: 0,
    cgpa: 0,
    pendingFees: 0,
    newMessages: 0
  });
  const { user, signOut } = useAuth();

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'attendance', name: 'Attendance', icon: Calendar },
    { id: 'results', name: 'Results', icon: BookOpen },
    { id: 'fees', name: 'Fees', icon: CreditCard },
    { id: 'timetable', name: 'Timetable', icon: Clock },
    { id: 'assignments', name: 'Assignments', icon: FileText },
    { id: 'library', name: 'Library', icon: BookOpen },
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
      // Fetch attendance percentage
      const { data: attendanceData } = await supabase
        .from('attendance')
        .select('status')
        .eq('user_id', user!.id);

      if (attendanceData) {
        const totalClasses = attendanceData.length;
        const presentClasses = attendanceData.filter(a => a.status === 'present').length;
        const attendancePercentage = totalClasses > 0 ? Math.round((presentClasses / totalClasses) * 100) : 0;
        
        setStats(prev => ({ ...prev, attendance: attendancePercentage }));
      }

      // Fetch pending fees
      const { data: feesData } = await supabase
        .from('fees')
        .select('amount')
        .eq('user_id', user!.id)
        .eq('status', 'pending');

      if (feesData) {
        const totalPendingFees = feesData.reduce((sum, fee) => sum + fee.amount, 0);
        setStats(prev => ({ ...prev, pendingFees: totalPendingFees }));
      }

      // Fetch unread notifications
      const { data: notificationsData } = await supabase
        .from('notifications')
        .select('id')
        .eq('user_id', user!.id)
        .eq('read', false);

      if (notificationsData) {
        setStats(prev => ({ ...prev, newMessages: notificationsData.length }));
      }

    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = async () => {
    await signOut();
    onLogout();
  };

  const markPresent = async () => {
    try {
      const { error } = await supabase
        .from('attendance')
        .insert([{
          user_id: user!.id,
          subject_code: 'MANUAL',
          subject_name: 'Manual Check-in',
          date: new Date().toISOString().split('T')[0],
          status: 'present'
        }]);

      if (error) {
        console.error('Error marking attendance:', error);
        alert('Failed to mark attendance. Please try again.');
      } else {
        alert('Attendance marked successfully!');
        fetchStats(); // Refresh stats
      }
    } catch (error) {
      console.error('Error marking attendance:', error);
      alert('Failed to mark attendance. Please try again.');
    }
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
                    <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} alt={profile?.full_name || "User"} />
                    <AvatarFallback className="text-xl font-semibold bg-white/20">
                      {profile?.full_name ? profile.full_name.split(' ').map((n: string) => n[0]).join('') : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 flex items-center space-x-1 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span>Online</span>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">Welcome back, {profile?.full_name || 'Student'}!</h2>
                  <p className="text-blue-100 mb-2">{profile?.department || 'Student'} - {profile?.year ? `Year ${profile.year}` : 'Current Student'}</p>
                  <p className="text-sm text-blue-200">Student ID: {profile?.student_id || 'N/A'}</p>
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
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Attendance</p>
                      <p className={`text-2xl font-bold ${stats.attendance >= 75 ? 'text-green-600' : 'text-red-600'}`}>
                        {stats.attendance}%
                      </p>
                      <p className="text-xs text-gray-500">{stats.attendance >= 75 ? 'Good job!' : 'Improve attendance'}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${stats.attendance >= 75 ? 'bg-green-50' : 'bg-red-50'}`}>
                      <ListChecks className={`h-6 w-6 ${stats.attendance >= 75 ? 'text-green-600' : 'text-red-600'}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">CGPA</p>
                      <p className="text-2xl font-bold text-blue-600">{stats.cgpa || 'N/A'}</p>
                      <p className="text-xs text-gray-500">Current semester</p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-50">
                      <TrendingUp className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Pending Fees</p>
                      <p className="text-2xl font-bold text-orange-600">₹{stats.pendingFees}</p>
                      <p className="text-xs text-gray-500">{stats.pendingFees > 0 ? 'Pay soon' : 'All paid'}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-orange-50">
                      <CreditCard className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">New Messages</p>
                      <p className="text-2xl font-bold text-purple-600">{stats.newMessages}</p>
                      <p className="text-xs text-gray-500">{stats.newMessages > 0 ? 'Check inbox' : 'No new messages'}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-50">
                      <Mail className="h-6 w-6 text-purple-600" />
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
                <Button variant="outline" className="justify-start" onClick={() => setActiveSection('assignments')}>
                  <FileText className="h-4 w-4 mr-2" />
                  View Assignments
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => setActiveSection('timetable')}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Check Timetable
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => setActiveSection('fees')}>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pay Fees
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => setActiveSection('faculty-chat')}>
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
                    <p className="font-medium text-gray-900 dark:text-white">Profile Updated</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Your profile information has been updated</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Welcome to AcadNext</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Start exploring your academic portal</p>
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
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No classes scheduled for today</p>
                  <p className="text-sm">Check your timetable for upcoming classes</p>
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 md:pb-0">
      {/* Compact Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-full">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">AcadNext</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setActiveSection('notifications')}
                className="relative"
              >
                <Bell className="h-4 w-4" />
                {stats.newMessages > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
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
                    {profile?.full_name ? profile.full_name.split(' ').map((n: string) => n[0]).join('') : 'U'}
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
            <Card className="sticky top-20">
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

      {/* Mobile Navigation */}
      <MobileNavigation 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        menuItems={menuItems}
      />
    </div>
  );
};

export default Dashboard;
