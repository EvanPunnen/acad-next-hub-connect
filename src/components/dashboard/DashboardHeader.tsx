
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { GraduationCap, Bell, LogOut } from "lucide-react";
import ThemeToggle from "../ThemeToggle";

interface DashboardHeaderProps {
  profile: any;
  stats: { newMessages: number };
  onSectionChange: (section: string) => void;
  onLogout: () => void;
}

const DashboardHeader = ({ profile, stats, onSectionChange, onLogout }: DashboardHeaderProps) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-full">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">AcadNext</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onSectionChange('notifications')}
              className="relative"
            >
              <Bell className="h-4 w-4" />
              {stats.newMessages > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {stats.newMessages}
                </span>
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onSectionChange('profile')}
            >
              <Avatar className="w-6 h-6">
                <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} alt="Profile" />
                <AvatarFallback className="text-xs">
                  {profile?.full_name ? profile.full_name.split(' ').map((n: string) => n[0]).join('') : 'U'}
                </AvatarFallback>
              </Avatar>
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onLogout}
              className="text-gray-600 dark:text-gray-400 hover:text-red-600"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
