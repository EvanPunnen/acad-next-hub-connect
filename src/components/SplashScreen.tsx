
import { useState, useEffect } from 'react';
import { GraduationCap } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [showLogo, setShowLogo] = useState(true);
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    // Show logo for 2 seconds
    const logoTimer = setTimeout(() => {
      setShowLogo(false);
      setShowAbout(true);
    }, 2000);

    // Show about for 3 seconds, then proceed to login
    const aboutTimer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(aboutTimer);
    };
  }, [onComplete]);

  if (showLogo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
        <div className="text-center animate-pulse">
          <div className="bg-white p-6 rounded-full mb-6 mx-auto w-24 h-24 flex items-center justify-center">
            <GraduationCap className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Acad Next</h1>
          <p className="text-blue-100 text-lg">Student Portal</p>
        </div>
      </div>
    );
  }

  if (showAbout) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-6">
        <div className="max-w-md text-center space-y-6 animate-fade-in">
          <div className="bg-blue-600 p-4 rounded-full mx-auto w-20 h-20 flex items-center justify-center">
            <GraduationCap className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome to Acad Next</h2>
          <div className="space-y-4 text-gray-600">
            <p className="text-lg">Your complete academic companion</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="font-semibold text-blue-600">📚 Attendance</p>
                <p>Track your progress</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="font-semibold text-green-600">💰 Fees</p>
                <p>Manage payments</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="font-semibold text-purple-600">📝 Assignments</p>
                <p>Submit with ease</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="font-semibold text-orange-600">💬 Messages</p>
                <p>Stay connected</p>
              </div>
            </div>
          </div>
          <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  return null;
};

export default SplashScreen;
