
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
  X,
  Mail,
  Moon,
  Sun,
  BarChart3,
  Download,
  Upload,
  Globe
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

const Index = () => {
  const { theme, setTheme } = useTheme();
  const [showLoginOptions, setShowLoginOptions] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const features = [
    {
      icon: BarChart3,
      title: "Attendance Tracking",
      description: "Real-time attendance monitoring with detailed analytics and reporting"
    },
    {
      icon: BookOpen,
      title: "Results & Grades",
      description: "View exam results, grades, and comprehensive academic performance"
    },
    {
      icon: CreditCard,
      title: "Fees Management",
      description: "Online fee payments, payment history, and pending fee notifications"
    },
    {
      icon: Clock,
      title: "Smart Timetable",
      description: "Interactive class schedules with room details and faculty information"
    },
    {
      icon: FileText,
      title: "Assignments",
      description: "Submit assignments digitally, track deadlines, and receive instant feedback"
    },
    {
      icon: Users,
      title: "Faculty Connect",
      description: "Direct communication with faculty members and academic support"
    },
    {
      icon: MessageSquare,
      title: "Communication Hub",
      description: "Stay connected with classmates and faculty through integrated messaging"
    },
    {
      icon: Award,
      title: "Certificates",
      description: "Upload, manage, and download academic certificates and documents"
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Real-time updates on important academic events and announcements"
    },
    {
      icon: Download,
      title: "Resource Download",
      description: "Access and download study materials, notes, and academic resources"
    },
    {
      icon: Upload,
      title: "Document Upload",
      description: "Submit documents, assignments, and certificates with ease"
    },
    {
      icon: Globe,
      title: "Mobile & Web Access",
      description: "Seamless experience across all devices - mobile, tablet, and desktop"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full shadow-lg">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AcadNext
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Your Complete Academic Portal</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="rounded-full p-2 sm:p-3 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all"
              >
                {theme === "light" ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => setShowLoginOptions(true)}
                className="hover:bg-blue-50 dark:hover:bg-blue-900/20 shadow-md hover:shadow-lg transition-all text-sm sm:text-base px-3 sm:px-4"
              >
                Login
              </Button>
              
              <Link to="/contact">
                <Button variant="ghost" size="sm" className="hidden sm:flex">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Login Options Modal */}
      {showLoginOptions && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <Card className="w-full max-w-md relative shadow-2xl animate-scale-in">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowLoginOptions(false)}
              className="absolute top-4 right-4 h-8 w-8 p-0 rounded-full"
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
                    className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all"
                    onClick={() => setShowLoginOptions(false)}
                  >
                    <GraduationCap className="h-4 w-4 mr-3" />
                    Student Login
                  </Button>
                </Link>
                <Link to="/faculty" className="block">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start hover:bg-purple-50 dark:hover:bg-purple-900/20 shadow-lg hover:shadow-xl transition-all"
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <Badge className="mb-4 sm:mb-6 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 px-4 py-2">
            🎓 Complete Academic Solution
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
            Everything You Need for <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              College, All in One Place
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            Access attendance, results, fees, timetables, assignments, and connect with faculty - 
            all from your smartphone or computer.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6 sm:mb-8">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg transition-all transform hover:scale-105"
              onClick={() => setShowLoginOptions(true)}
            >
              Get Started
              <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-6 sm:mb-8">
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

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm h-full border-0 shadow-lg">
              <CardContent className="p-4 sm:p-6 text-center h-full flex flex-col">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 sm:p-4 rounded-full inline-block mb-3 sm:mb-4 group-hover:scale-110 transition-transform shadow-lg flex-shrink-0">
                  <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-grow">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
