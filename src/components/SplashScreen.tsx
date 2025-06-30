
import { useState, useEffect } from 'react';
import { GraduationCap } from "lucide-react";
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
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
        <div className="text-center animate-pulse">
          <div className="bg-white p-6 rounded-full mb-6 mx-auto w-24 h-24 flex items-center justify-center shadow-2xl">
            <GraduationCap className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">AcadNext</h1>
          <p className="text-blue-100 text-lg">Student Portal</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-6">
      <div className="max-w-md text-center space-y-6 animate-fade-in">
        <div className="bg-blue-600 p-4 rounded-full mx-auto w-20 h-20 flex items-center justify-center shadow-lg">
          <GraduationCap className="h-10 w-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Welcome to AcadNext</h2>
        <div className="space-y-4 text-gray-600">
          <p className="text-lg">Your complete academic companion</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <p className="font-semibold text-blue-600 mb-1">📚 Attendance</p>
              <p className="text-xs">Track your progress</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <p className="font-semibold text-green-600 mb-1">💰 Fees</p>
              <p className="text-xs">Manage payments</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <p className="font-semibold text-purple-600 mb-1">📝 Assignments</p>
              <p className="text-xs">Stay connected</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <p className="font-semibold text-orange-600 mb-1">💬 Messages</p>
              <p className="text-xs">Submit with ease</p>
            </div>
          </div>
        </div>
        <Button 
          onClick={handleGetStarted}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg shadow-lg"
        >
          Let's Start
        </Button>
      </div>
    </div>
  );
};

export default SplashScreen;
