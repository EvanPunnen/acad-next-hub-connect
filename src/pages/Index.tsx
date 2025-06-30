
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Calendar, 
  BookOpen, 
  CreditCard, 
  Clock, 
  FileText, 
  Users, 
  MessageSquare,
  Award,
  Bell,
  Smartphone,
  Monitor,
  CheckCircle,
  ArrowRight,
  X
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Index = () => {
  const [showLoginOptions, setShowLoginOptions] = useState(false);

  const features = [
    {
      icon: Calendar,
      title: "Attendance Tracking",
      description: "Track your attendance across all subjects with detailed analytics"
    },
    {
      icon: BookOpen,
      title: "Results & Grades",
      description: "View your exam results, grades, and academic performance"
    },
    {
      icon: CreditCard,
      title: "Fees Management",
      description: "Check fee status, payment history, and make online payments"
    },
    {
      icon: Clock,
      title: "Smart Timetable",
      description: "Access your class schedule with room details and faculty info"
    },
    {
      icon: FileText,
      title: "Assignments",
      description: "Submit assignments, track deadlines, and receive feedback"
    },
    {
      icon: Users,
      title: "Faculty Connect",
      description: "Chat with faculty members and get academic support"
    },
    {
      icon: MessageSquare,
      title: "Communication",
      description: "Stay connected with classmates and faculty through messaging"
    },
    {
      icon: Award,
      title: "Certificates",
      description: "Upload and manage your academic certificates and documents"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl shadow-lg">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AcadNext
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Your Academic Portal</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={() => setShowLoginOptions(true)}
                className="hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Login Options Modal */}
      {showLoginOptions && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowLoginOptions(false)}
              className="absolute top-4 right-4 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
            <CardContent className="p-6 pt-12">
              <div className="text-center mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full inline-block mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Choose Login Type</h3>
                <p className="text-gray-600 dark:text-gray-400">Select your role to continue</p>
              </div>
              
              <div className="space-y-3">
                <Link to="/auth" className="block">
                  <Button 
                    className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => setShowLoginOptions(false)}
                  >
                    <GraduationCap className="h-4 w-4 mr-3" />
                    Student Login
                  </Button>
                </Link>
                <Link to="/faculty" className="block">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start hover:bg-purple-50 dark:hover:bg-purple-900/20"
                    onClick={() => setShowLoginOptions(false)}
                  >
                    <Users className="h-4 w-4 mr-3" />
                    Faculty Login
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 px-4 py-2">
            🎓 Complete Academic Solution
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Everything You Need for <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              College, All in One Place
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            Access attendance, results, fees, timetables, assignments, and connect with faculty - 
            all from your smartphone or computer.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl px-8 py-6 text-lg"
              onClick={() => setShowLoginOptions(true)}
            >
              Let's Start
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <Smartphone className="h-4 w-4" />
              <span>Mobile Friendly</span>
            </div>
            <div className="flex items-center space-x-2">
              <Monitor className="h-4 w-4" />
              <span>Desktop Ready</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>Secure & Reliable</span>
            </div>
          </div>
        </div>

        {/* Notice Section */}
        <Card className="mb-16 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="bg-amber-100 dark:bg-amber-900/40 p-3 rounded-full flex-shrink-0">
                <Bell className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-400 mb-2">
                  Student Login Information
                </h3>
                <p className="text-amber-700 dark:text-amber-300 mb-3">
                  We are planning to provide students with login ID and password-based access. 
                  Students will use their assigned Student ID to log in - no signup required.
                </p>
                <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-400">
                  Coming Soon
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm h-full">
              <CardContent className="p-6 text-center h-full flex flex-col">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full inline-block mb-4 group-hover:scale-110 transition-transform flex-shrink-0">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed flex-grow">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-blue-100 mb-8 text-lg">
              Join your institution's digital transformation today
            </p>
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => setShowLoginOptions(true)}
            >
              Access Your Portal
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Index;
