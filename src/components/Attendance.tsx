
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Calendar, 
  Clock,
  CheckCircle,
  XCircle,
  MapPin,
  Users,
  TrendingUp,
  AlertTriangle
} from "lucide-react";

const Attendance = () => {
  const [selectedMonth, setSelectedMonth] = useState('2024-01');

  const attendanceData = [
    { date: '2024-01-15', status: 'present', subject: 'Database Systems', time: '09:00 AM' },
    { date: '2024-01-15', status: 'present', subject: 'Machine Learning', time: '11:00 AM' },
    { date: '2024-01-15', status: 'absent', subject: 'Software Engineering', time: '02:00 PM' },
    { date: '2024-01-14', status: 'present', subject: 'Database Systems', time: '09:00 AM' },
    { date: '2024-01-14', status: 'present', subject: 'Data Structures', time: '10:30 AM' },
    { date: '2024-01-13', status: 'present', subject: 'Machine Learning', time: '11:00 AM' },
  ];

  const monthlyStats = {
    totalClasses: 45,
    attended: 39,
    percentage: 87,
    requiredPercentage: 75
  };

  const markAttendance = () => {
    alert('Attendance marked successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Attendance Tracker</h2>
          <p className="text-gray-600 dark:text-gray-400">Track your class attendance and maintain required percentage</p>
        </div>
        <Button onClick={markAttendance} className="bg-green-600 hover:bg-green-700">
          <MapPin className="h-4 w-4 mr-2" />
          Mark Present
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Current %</p>
                <p className={`text-2xl font-bold ${monthlyStats.percentage >= monthlyStats.requiredPercentage ? 'text-green-600' : 'text-red-600'}`}>
                  {monthlyStats.percentage}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Classes Attended</p>
                <p className="text-2xl font-bold text-green-600">{monthlyStats.attended}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Classes</p>
                <p className="text-2xl font-bold text-blue-600">{monthlyStats.totalClasses}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Required %</p>
                <p className="text-2xl font-bold text-orange-600">{monthlyStats.requiredPercentage}%</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Records */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Attendance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {attendanceData.map((record, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="flex flex-col items-center">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <span className="text-sm text-gray-600">{record.date}</span>
                </div>
                <div>
                  <h3 className="font-semibold">{record.subject}</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    {record.time}
                  </div>
                </div>
              </div>
              <Badge className={record.status === 'present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                {record.status === 'present' ? (
                  <CheckCircle className="h-4 w-4 mr-1" />
                ) : (
                  <XCircle className="h-4 w-4 mr-1" />
                )}
                {record.status.toUpperCase()}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Attendance;
