import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import useScrollToTop from "@/hooks/useScrollToTop";
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
  useScrollToTop(); // Add scroll to top functionality
  
  const [activeSection, setActiveSection] = useState('dashboard');
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState({
    attendance: 85, // Default mock data
    cgpa: 8.2,
    pendingFees: 15000,
    newMessages: 3
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
      // Set mock profile data
      setProfile({
        full_name: user.user_metadata?.full_name || 'Student User',
        student_id: user.user_metadata?.student_id || 'STU001',
        email: user.email,
        avatar_url: null
      });
    }
  }, [user]);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    // Scroll to top when changing sections
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  const handleLogout = async () => {
    await signOut();
    onLogout();
  };

  const markPresent = async () => {
    // Mock attendance marking
    alert('Attendance marked successfully!');
    setStats(prev => ({ ...prev, attendance: Math.min(prev.attendance + 1, 100) }));
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6 animate-fade-in">
            <WelcomeCard profile={profile} onMarkPresent={markPresent} />
            <StatsCards stats={stats} />
            <QuickActions onSectionChange={handleSectionChange} />
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
          <div className="text-center py-12 animate-fade-in">
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
        onSectionChange={handleSectionChange}
        onLogout={handleLogout}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Sidebar */}
          <div className="w-full lg:w-64 hidden lg:block">
            <Card className="sticky top-20 shadow-lg">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSectionChange(item.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-all duration-200 hover:shadow-md ${
                        activeSection === item.id
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
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
        onSectionChange={handleSectionChange}
        menuItems={menuItems}
      />
    </div>
  );
};

export default Dashboard;
