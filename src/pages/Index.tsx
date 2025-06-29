
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ThemeToggle from "@/components/ThemeToggle";
import { 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  CreditCard, 
  Users, 
  MessageSquare, 
  BarChart3,
  Star,
  CheckCircle,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Smartphone,
  Monitor,
  Tablet
} from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState('features');

  const features = [
    {
      icon: Calendar,
      title: "Smart Attendance",
      description: "Automated attendance tracking with real-time analytics and notifications"
    },
    {
      icon: BookOpen,
      title: "Grade Management",
      description: "Comprehensive grade tracking and performance analytics"
    },
    {
      icon: CreditCard,
      title: "Fee Management",
      description: "Streamlined fee collection and payment processing"
    },
    {
      icon: MessageSquare,
      title: "Communication Hub",
      description: "Direct messaging between students, faculty, and administration"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Detailed insights and reports for better decision making"
    },
    {
      icon: Users,
      title: "Multi-User Support",
      description: "Separate portals for students, faculty, and administrators"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Computer Science Student",
      content: "AcadNext has revolutionized how I manage my academic life. Everything I need is in one place!",
      rating: 5
    },
    {
      name: "Dr. Michael Chen",
      role: "Professor of Mathematics",
      content: "The communication features have made it so much easier to connect with my students and track their progress.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Academic Administrator",
      content: "The analytics and reporting features provide invaluable insights into student performance and institutional efficiency.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AcadNext
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">Academic Portal</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link to="/contact">
                <Button variant="outline" size="sm">
                  Contact Support
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="sm">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-600/5 dark:to-purple-600/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            Next Generation Academic Platform
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Transform Your Academic Experience
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            AcadNext brings together students, faculty, and institutions on a unified platform for seamless academic management, communication, and collaboration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="w-full sm:w-auto">
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-2 shadow-lg">
            <div className="flex space-x-2">
              {['features', 'testimonials', 'platform'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {activeTab === 'features' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'testimonials' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'platform' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold">Available Everywhere</h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Access AcadNext from any device, anywhere. Our responsive design ensures a seamless experience across all platforms.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Web Browser Access</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Mobile Responsive Design</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Offline Capabilities</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Real-time Synchronization</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center p-6 border-0 shadow-md">
                <Monitor className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h4 className="font-semibold mb-2">Desktop</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Full-featured experience</p>
              </Card>
              <Card className="text-center p-6 border-0 shadow-md">
                <Tablet className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                <h4 className="font-semibold mb-2">Tablet</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Optimized for touch</p>
              </Card>
              <Card className="text-center p-6 border-0 shadow-md">
                <Smartphone className="h-12 w-12 mx-auto mb-4 text-green-600" />
                <h4 className="font-semibold mb-2">Mobile</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">On-the-go access</p>
              </Card>
              <Card className="text-center p-6 border-0 shadow-md">
                <GraduationCap className="h-12 w-12 mx-auto mb-4 text-orange-600" />
                <h4 className="font-semibold mb-2">Campus</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Seamless integration</p>
              </Card>
            </div>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students and educators already using AcadNext to enhance their academic experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Create Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">AcadNext</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Empowering education through technology. AcadNext is the comprehensive academic management platform designed for the modern educational institution.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>support@acadnext.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Tech City, TC 12345</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2">
                <Link to="/contact" className="block text-gray-400 hover:text-white transition-colors">
                  Contact Support
                </Link>
                <Link to="/auth" className="block text-gray-400 hover:text-white transition-colors">
                  Login
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AcadNext. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
