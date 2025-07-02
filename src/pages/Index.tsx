
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Users, BookOpen, Calendar, CreditCard, MessageSquare, Moon, Sun, Star, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";

const Index = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl border border-white/20">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">AcadNext</h1>
                <p className="text-white/80">College Management System</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full p-3"
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-6xl font-bold mb-6 text-white">
              Complete College Management Solution
            </h2>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Streamline student management, attendance tracking, fee collection, and academic processes 
              with our comprehensive platform designed for modern educational institutions.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Portal Selection */}
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold mb-8 text-white">Choose Your Portal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              <CardHeader className="text-center pb-4">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-2xl w-20 h-20 mx-auto mb-6 shadow-xl">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-white">Student Portal</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6 pt-0">
                <p className="text-white/80 text-lg">
                  Access your academic records, assignments, attendance, and more.
                </p>
                <div className="space-y-3 text-left">
                  <div className="flex items-center space-x-3 text-white/70">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span>View Attendance & Academic Records</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white/70">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span>Submit Assignments & View Results</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white/70">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span>Check Fee Status & Payment History</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white/70">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span>Access Timetable & Event Updates</span>
                  </div>
                </div>
                <Link to="/auth" className="block">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                    Student Login
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              <CardHeader className="text-center pb-4">
                <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-6 rounded-2xl w-20 h-20 mx-auto mb-6 shadow-xl">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-white">Faculty Portal</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6 pt-0">
                <p className="text-white/80 text-lg">
                  Manage students, track attendance, and handle administrative tasks.
                </p>
                <div className="space-y-3 text-left">
                  <div className="flex items-center space-x-3 text-white/70">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span>Manage Student Records & Profiles</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white/70">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span>Mark Attendance & Generate Reports</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white/70">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span>Create Assignments & Grade Submissions</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white/70">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span>Manage Events & Send Notifications</span>
                  </div>
                </div>
                <Link to="/faculty" className="block">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                    Faculty Login
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Overview */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-12 border border-white/20">
          <h3 className="text-3xl font-bold text-center mb-12 text-white">
            Comprehensive Management Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-4 rounded-2xl w-16 h-16 mx-auto mb-4 shadow-lg">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-3 text-white text-lg">Attendance Management</h4>
              <p className="text-white/70">
                Real-time attendance tracking with automated notifications and detailed reporting
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-4 rounded-2xl w-16 h-16 mx-auto mb-4 shadow-lg">
                <CreditCard className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-3 text-white text-lg">Fee Management</h4>
              <p className="text-white/70">
                Track payments, generate receipts, and manage fee collections with automated reminders
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl w-16 h-16 mx-auto mb-4 shadow-lg">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-3 text-white text-lg">Communication Hub</h4>
              <p className="text-white/70">
                Faculty-student messaging, announcements, and real-time notification system
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <Zap className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-4 text-white">Need Help?</h3>
            <p className="text-white/70 mb-6 text-lg">
              Contact our support team for assistance with setup or any questions about the platform.
            </p>
            <Link to="/contact">
              <Button 
                variant="outline" 
                size="lg"
                className="bg-transparent border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-xl font-semibold"
              >
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
