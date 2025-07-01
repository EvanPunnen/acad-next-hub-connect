
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  LogOut, 
  Settings, 
  User,
  Moon,
  Sun,
  Menu,
  X
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "@/contexts/ThemeContext";

interface DashboardHeaderProps {
  profile: any;
  stats: {
    attendance: number;
    cgpa: number;
    pendingFees: number;
    newMessages: number;
  };
  onSectionChange: (section: string) => void;
  onLogout: () => void;
}

const DashboardHeader = ({ profile, stats, onSectionChange, onLogout }: DashboardHeaderProps) => {
  const { theme, setTheme } = useTheme();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-40 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-full">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Student Portal
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Welcome back, {profile?.full_name || 'Student'}
              </p>
            </div>
          </div>

          {/* Quick Stats - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Attendance</p>
              <p className="font-semibold text-green-600">{stats.attendance}%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">CGPA</p>
              <p className="font-semibold text-blue-600">{stats.cgpa}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Pending Fees</p>
              <p className="font-semibold text-red-600">₹{stats.pendingFees}</p>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="rounded-full p-2"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSectionChange('notifications')}
              className="relative rounded-full p-2"
            >
              <Bell className="h-4 w-4" />
              {stats.newMessages > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                  {stats.newMessages}
                </Badge>
              )}
            </Button>

            {/* Profile Menu */}
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={profile?.avatar_url} alt={profile?.full_name} />
                <AvatarFallback>
                  {profile?.full_name ? profile.full_name.split(' ').map((n: string) => n[0]).join('') : 'U'}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSectionChange('profile')}
                className="hidden md:block"
              >
                Profile
              </Button>
            </div>

            {/* Logout */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full p-2"
            >
              <LogOut className="h-4 w-4" />
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden rounded-full p-2"
            >
              {showMobileMenu ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Stats */}
        {showMobileMenu && (
          <div className="md:hidden py-4 border-t">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Attendance</p>
                <p className="font-semibold text-green-600">{stats.attendance}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">CGPA</p>
                <p className="font-semibold text-blue-600">{stats.cgpa}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pending Fees</p>
                <p className="font-semibold text-red-600">₹{stats.pendingFees}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;
