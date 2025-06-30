
import { Card, CardContent } from "@/components/ui/card";
import { ListChecks, TrendingUp, CreditCard, Mail } from "lucide-react";

interface StatsCardsProps {
  stats: {
    attendance: number;
    cgpa: number;
    pendingFees: number;
    newMessages: number;
  };
}

const StatsCards = ({ stats }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Attendance</p>
              <p className={`text-2xl font-bold ${stats.attendance >= 75 ? 'text-green-600' : 'text-red-600'}`}>
                {stats.attendance}%
              </p>
              <p className="text-xs text-gray-500">{stats.attendance >= 75 ? 'Good job!' : 'Improve attendance'}</p>
            </div>
            <div className={`p-3 rounded-lg ${stats.attendance >= 75 ? 'bg-green-50' : 'bg-red-50'}`}>
              <ListChecks className={`h-6 w-6 ${stats.attendance >= 75 ? 'text-green-600' : 'text-red-600'}`} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">CGPA</p>
              <p className="text-2xl font-bold text-blue-600">{stats.cgpa || 'N/A'}</p>
              <p className="text-xs text-gray-500">Current semester</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pending Fees</p>
              <p className="text-2xl font-bold text-orange-600">₹{stats.pendingFees}</p>
              <p className="text-xs text-gray-500">{stats.pendingFees > 0 ? 'Pay soon' : 'All paid'}</p>
            </div>
            <div className="p-3 rounded-lg bg-orange-50">
              <CreditCard className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">New Messages</p>
              <p className="text-2xl font-bold text-purple-600">{stats.newMessages}</p>
              <p className="text-xs text-gray-500">{stats.newMessages > 0 ? 'Check inbox' : 'No new messages'}</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-50">
              <Mail className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
