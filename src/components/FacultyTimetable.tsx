
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock,
  MapPin,
  Users,
  BookOpen,
  Bell,
  Download
} from "lucide-react";

const FacultyTimetable = () => {
  const [selectedWeek, setSelectedWeek] = useState('current');

  const timetable = {
    Monday: [
      { time: '09:00-10:30', subject: 'Machine Learning', class: 'CS Final Year', room: 'CS-102', students: 45 },
      { time: '11:00-12:30', subject: 'Data Structures', class: 'CS Third Year', room: 'CS-101', students: 38 },
      { time: '02:00-03:30', subject: 'ML Lab', class: 'CS Final Year', room: 'Lab-2', students: 22 }
    ],
    Tuesday: [
      { time: '09:00-10:30', subject: 'Algorithms', class: 'CS Third Year', room: 'CS-101', students: 38 },
      { time: '11:00-12:30', subject: 'Machine Learning', class: 'CS Final Year', room: 'CS-102', students: 45 },
      { time: '02:00-03:30', subject: 'Faculty Meeting', class: 'All Faculty', room: 'Conference Room', students: 0 }
    ],
    Wednesday: [
      { time: '09:00-10:30', subject: 'Data Structures Lab', class: 'CS Third Year', room: 'Lab-1', students: 19 },
      { time: '11:00-12:30', subject: 'Machine Learning', class: 'CS Final Year', room: 'CS-102', students: 45 },
      { time: '02:00-03:30', subject: 'Project Review', class: 'CS Final Year', room: 'CS-105', students: 12 }
    ],
    Thursday: [
      { time: '09:00-10:30', subject: 'Algorithms', class: 'CS Third Year', room: 'CS-101', students: 38 },
      { time: '11:00-12:30', subject: 'Machine Learning', class: 'CS Final Year', room: 'CS-102', students: 45 },
      { time: '02:00-03:30', subject: 'Research Work', class: 'Research', room: 'Research Lab', students: 5 }
    ],
    Friday: [
      { time: '09:00-10:30', subject: 'Data Structures', class: 'CS Third Year', room: 'CS-101', students: 38 },
      { time: '11:00-12:30', subject: 'Seminar', class: 'CS Final Year', room: 'Auditorium', students: 45 }
    ]
  };

  const getCurrentDay = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date().getDay()];
  };

  const todaysClasses = timetable[getCurrentDay() as keyof typeof timetable] || [];
  const upcomingClass = todaysClasses.find(c => new Date().getHours() < parseInt(c.time.split(':')[0]));

  const getClassType = (subject: string) => {
    if (subject.toLowerCase().includes('lab')) return 'practical';
    if (subject.toLowerCase().includes('meeting')) return 'meeting';
    if (subject.toLowerCase().includes('seminar')) return 'seminar';
    if (subject.toLowerCase().includes('research')) return 'research';
    return 'theory';
  };

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'theory': 'bg-blue-100 text-blue-800',
      'practical': 'bg-green-100 text-green-800',
      'meeting': 'bg-purple-100 text-purple-800',
      'seminar': 'bg-orange-100 text-orange-800',
      'research': 'bg-pink-100 text-pink-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">My Teaching Schedule</h2>
          <p className="text-gray-600 dark:text-gray-400">Your weekly class timetable</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Bell className="h-4 w-4 mr-2" />
            Set Reminders
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Schedule
          </Button>
        </div>
      </div>

      {/* Today's Overview */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Today's Classes</p>
                <p className="text-2xl font-bold text-blue-600">{todaysClasses.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Students Today</p>
                <p className="text-2xl font-bold text-green-600">
                  {todaysClasses.reduce((sum, cls) => sum + cls.students, 0)}
                </p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Next Class</p>
                <p className="text-sm font-bold text-purple-600">
                  {upcomingClass ? upcomingClass.time : 'No more classes'}
                </p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
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
                          <Users className="h-4 w-4 mr-1" />
                          {class_.class} ({class_.students} students)
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {class_.room}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getTypeColor(getClassType(class_.subject))}>
                      {getClassType(class_.subject).toUpperCase()}
                    </Badge>
                    <Button size="sm" variant="outline">
                      Mark Attendance
                    </Button>
                  </div>
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

      {/* Weekly Schedule */}
      <div className="grid gap-4">
        {Object.entries(timetable).map(([day, classes]) => (
          <Card key={day}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                {day}
                <span className="text-sm text-gray-500 font-normal">
                  {classes.length} classes
                </span>
              </CardTitle>
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
                            <Users className="h-3 w-3 mr-1" />
                            {class_.class}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {class_.room}
                          </span>
                          <span>{class_.students} students</span>
                        </div>
                      </div>
                    </div>
                    <Badge className={getTypeColor(getClassType(class_.subject))}>
                      {getClassType(class_.subject)}
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

export default FacultyTimetable;
