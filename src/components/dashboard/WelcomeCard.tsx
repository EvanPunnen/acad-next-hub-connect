
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MapPin } from "lucide-react";

interface WelcomeCardProps {
  profile: any;
  onMarkPresent: () => void;
}

const WelcomeCard = ({ profile, onMarkPresent }: WelcomeCardProps) => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white overflow-hidden">
      <div className="relative z-10 flex items-center space-x-4">
        <div className="relative">
          <Avatar className="w-20 h-20 border-4 border-white/20">
            <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} alt={profile?.full_name || "User"} />
            <AvatarFallback className="text-xl font-semibold bg-white/20">
              {profile?.full_name ? profile.full_name.split(' ').map((n: string) => n[0]).join('') : 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 flex items-center space-x-1 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>Online</span>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-1">Welcome back, {profile?.full_name || 'Student'}!</h2>
          <p className="text-blue-100 mb-2">{profile?.department || 'Student'} - {profile?.year ? `Year ${profile.year}` : 'Current Student'}</p>
          <p className="text-sm text-blue-200">Student ID: {profile?.student_id || 'N/A'}</p>
        </div>
      </div>
      <Button 
        onClick={onMarkPresent}
        className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white border-white/30"
      >
        <MapPin className="h-4 w-4 mr-2" />
        Mark Present
      </Button>
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-white/10 to-transparent rounded-full"></div>
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full"></div>
    </div>
  );
};

export default WelcomeCard;
