import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { 
  BookOpen, 
  Calendar,
  CalendarDays,
  Clock,
  CreditCard,
  FileText,
  Users,
  Bus,
  Calculator,
  Bell,
  Award,
  BarChart3,
  User,
  MessageSquare
} from "lucide-react";

// Import existing components
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

// Import new dashboard components
import DashboardHeader from "./dashboard/DashboardHeader";
import WelcomeCard from "./dashboard/WelcomeCard";
import StatsCards from "./dashboard/StatsCards";
import QuickActions from "./dashboard/QuickActions";
import RecentActivity from "./dashboard/RecentActivity";
import TodaySchedule from "./dashboard/TodaySchedule";

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
            <WelcomeCard profile={profile} onMarkPresent={markPresent} />
            <StatsCards stats={stats} />
            <QuickActions onSectionChange={setActiveSection} />
            <RecentActivity />
            <TodaySchedule />
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
      <DashboardHeader 
        profile={profile}
        stats={stats}
        onSectionChange={setActiveSection}
        onLogout={handleLogout}
      />

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
