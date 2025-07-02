
import { useState, useEffect } from 'react';
import { GraduationCap, Users, BookOpen, Calendar, CreditCard, MessageSquare, Star, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep === 0) {
      // Show logo for 2 seconds
      const timer = setTimeout(() => {
        setCurrentStep(1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const handleGetStarted = () => {
    setCurrentStep(2); // Show portal selection
  };

  const handlePortalSelection = (portal: 'student' | 'faculty') => {
    if (portal === 'student') {
      window.location.href = '/auth';
    } else {
      window.location.href = '/faculty';
    }
  };

  if (currentStep === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 flex items-center justify-center">
        <div className="text-center animate-pulse">
          <div className="bg-white/20 backdrop-blur-sm p-8 rounded-3xl mb-8 mx-auto w-32 h-32 flex items-center justify-center shadow-2xl border border-white/20">
            <GraduationCap className="h-16 w-16 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">AcadNext</h1>
          <p className="text-white/80 text-xl">Complete College Management System</p>
        </div>
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 flex items-center justify-center p-6">
        <div className="max-w-4xl text-center space-y-8 animate-fade-in">
          <div className="bg-white/20 backdrop-blur-sm p-6 rounded-3xl mx-auto w-24 h-24 flex items-center justify-center shadow-xl border border-white/20">
            <GraduationCap className="h-12 w-12 text-white" />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-white">Choose Your Portal</h2>
            <p className="text-white/80 text-xl">Select how you want to access AcadNext</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer" 
                  onClick={() => handlePortalSelection('student')}>
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
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  Access Student Portal
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer"
                  onClick={() => handlePortalSelection('faculty')}>
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
                <Button className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  Access Faculty Portal
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 flex items-center justify-center p-6">
      <div className="max-w-6xl text-center space-y-8 animate-fade-in">
        <div className="bg-white/20 backdrop-blur-sm p-6 rounded-3xl mx-auto w-24 h-24 flex items-center justify-center shadow-xl border border-white/20">
          <GraduationCap className="h-12 w-12 text-white" />
        </div>
        
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-white">Welcome to AcadNext</h2>
          <p className="text-white/80 text-xl">Your Complete Academic Management Solution</p>
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
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
          <Zap className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-4 text-white">Need Help?</h3>
          <p className="text-white/70 mb-6 text-lg">
            Contact our support team for assistance with setup or any questions about the platform.
          </p>
          <div className="text-white/60 space-y-2">
            <p>📧 support@acadnext.com</p>
            <p>📞 +1 (555) 123-4567</p>
            <p>🌐 www.acadnext.com</p>
          </div>
        </div>

        <Button 
          onClick={handleGetStarted}
          size="lg"
          className="bg-white text-blue-600 hover:bg-white/90 px-12 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default SplashScreen;
