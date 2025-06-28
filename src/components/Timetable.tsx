
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock,
  MapPin,
  BookOpen,
  User,
  Download,
  Bell
} from "lucide-react";

const Timetable = () => {
  const [selectedWeek, setSelectedWeek] = useState('current');

  const timetable = {
    Monday: [
      { time: '09:00-10:30', subject: 'Database Systems', faculty: 'Dr. Smith', room: 'CS-101', type: 'theory' },
      { time: '10:45-12:15', subject: 'Machine Learning', faculty: 'Prof. Johnson', room: 'CS-102', type: 'theory' },
      { time: '01:00-02:30', subject: 'Database Lab', faculty: 'Dr. Smith', room: 'Lab-1', type: 'practical' },
      { time: '02:45-04:15', subject: 'Software Engineering', faculty: 'Dr. Wilson', room: 'CS-103', type: 'theory' }
    ],
    Tuesday: [
      { time: '09:00-10:30', subject: 'Computer Networks', faculty: 'Prof. Davis', room: 'CS-104', type: 'theory' },
      { time: '10:45-12:15', subject: 'Machine Learning Lab', faculty: 'Prof. Johnson', room: 'Lab-2', type: 'practical' },
      { time: '01:00-02:30', subject: 'Project Work', faculty: 'Dr. Brown', room: 'CS-105', type: 'project' },
    ],
    Wednesday: [
      { time: '09:00-10:30', subject: 'Database Systems', faculty: 'Dr. Smith', room: 'CS-101', type: 'theory' },
      { time: '10:45-12:15', subject: 'Software Engineering', faculty: 'Dr. Wilson', room: 'CS-103', type: 'theory' },
      { time: '01:00-02:30', subject: 'Computer Networks Lab', faculty: 'Prof. Davis', room: 'Lab-3', type: 'practical' },
    ],
    Thursday: [
      { time: '09:00-10:30', subject: 'Machine Learning', faculty: 'Prof. Johnson', room: 'CS-102', type: 'theory' },
      { time: '10:45-12:15', subject: 'Computer Networks', faculty: 'Prof. Davis', room: 'CS-104', type: 'theory' },
      { time: '01:00-02:30', subject: 'Seminar', faculty: 'Various', room: 'Auditorium', type: 'seminar' },
    ],
    Friday: [
      { time: '09:00-10:30', subject: 'Project Work', faculty: 'Dr. Brown', room: 'CS-105', type: 'project' },
      { time: '10:45-12:15', subject: 'Software Engineering Lab', faculty: 'Dr. Wilson', room: 'Lab-4', type: 'practical' },
    ]
  };

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'theory': 'bg-blue-100 text-blue-800',
      'practical': 'bg-green-100 text-green-800',
      'project': 'bg-purple-100 text-purple-800',
      'seminar': 'bg-orange-100 text-orange-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getCurrentDay = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date().getDay()];
  };

  const todaysClasses = timetable[getCurrentDay() as keyof typeof timetable] || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Class Timetable</h2>
          <p className="text-gray-600 dark:text-gray-400">Your weekly class schedule</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Bell className="h-4 w-4 mr-2" />
            Set Reminders
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Today's Classes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Today's Classes ({getCurrentDay()})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {todaysClasses.length > 0 ? (
            <div className="space-y-4">
              {todaysClasses.map((class_, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <Clock className="h-5 w-5 text-gray-500 mx-auto" />
                      <span className="text-sm font-medium">{class_.time}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{class_.subject}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {class_.faculty}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {class_.room}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge className={getTypeColor(class_.type)}>
                    {class_.type.toUpperCase()}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">No classes scheduled for today</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Weekly Timetable */}
      <div className="grid gap-4">
        {Object.entries(timetable).map(([day, classes]) => (
          <Card key={day}>
            <CardHeader>
              <CardTitle className="text-lg">{day}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {classes.map((class_, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="text-center min-w-[80px]">
                        <span className="text-sm font-medium">{class_.time}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{class_.subject}</h4>
                        <div className="flex items-center space-x-3 text-sm text-gray-600 mt-1">
                          <span className="flex items-center">
                            <User className="h-3 w-3 mr-1" />
                            {class_.faculty}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {class_.room}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge className={getTypeColor(class_.type)}>
                      {class_.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Timetable;
