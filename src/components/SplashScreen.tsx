
import { useState, useEffect } from 'react';
import { GraduationCap, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    onComplete();
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 flex items-center justify-center p-6">
      <div className="max-w-2xl text-center space-y-8 animate-fade-in">
        <div className="bg-white/20 backdrop-blur-sm p-6 rounded-3xl mx-auto w-24 h-24 flex items-center justify-center shadow-xl border border-white/20">
          <GraduationCap className="h-12 w-12 text-white" />
        </div>
        
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-white">Welcome to AcadNext</h2>
          <p className="text-white/80 text-xl">Your Complete Academic Management Solution</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg mx-auto">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
            <BookOpen className="h-8 w-8 text-white mb-3 mx-auto" />
            <h3 className="font-semibold text-white mb-2">Student Portal</h3>
            <p className="text-white/70 text-sm">Access grades, assignments, attendance & more</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
            <Users className="h-8 w-8 text-white mb-3 mx-auto" />
            <h3 className="font-semibold text-white mb-2">Faculty Portal</h3>
            <p className="text-white/70 text-sm">Manage students, classes & academic records</p>
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
