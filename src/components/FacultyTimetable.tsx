
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar,
  Clock,
  MapPin,
  Users,
  BookOpen,
  Plus,
  Edit,
  Download
} from "lucide-react";

const FacultyTimetable = () => {
  const [selectedWeek, setSelectedWeek] = useState('current');

  const timetableData = {
    Monday: [
      { time: '09:00 - 10:00', subject: 'Data Structures', class: 'CS-3A', room: 'Room 101', students: 45 },
      { time: '11:00 - 12:00', subject: 'Machine Learning', class: 'CS-4B', room: 'Room 205', students: 38 },
      { time: '14:00 - 15:00', subject: 'Database Systems', class: 'CS-3B', room: 'Room 102', students: 42 }
    ],
    Tuesday: [
      { time: '10:00 - 11:00', subject: 'Advanced Algorithms', class: 'CS-4A', room: 'Room 201', students: 35 },
      { time: '15:00 - 16:00', subject: 'Data Structures Lab', class: 'CS-3A', room: 'Lab 1', students: 45 },
      { time: '16:00 - 17:00', subject: 'Research Guidance', class: 'PhD', room: 'Room 301', students: 8 }
    ],
    Wednesday: [
      { time: '09:00 - 10:00', subject: 'Machine Learning', class: 'CS-4B', room: 'Room 205', students: 38 },
      { time: '11:00 - 12:00', subject: 'Data Structures', class: 'CS-3A', room: 'Room 101', students: 45 },
      { time: '14:00 - 15:00', subject: 'Faculty Meeting', class: 'All Faculty', room: 'Conference Room', students: 0 }
    ],
    Thursday: [
      { time: '10:00 - 11:00', subject: 'Database Systems', class: 'CS-3B', room: 'Room 102', students: 42 },
      { time: '12:00 - 13:00', subject: 'Advanced Algorithms', class: 'CS-4A', room: 'Room 201', students: 35 },
      { time: '15:00 - 16:00', subject: 'Machine Learning Lab', class: 'CS-4B', room: 'Lab 2', students: 38 }
    ],
    Friday: [
      { time: '09:00 - 10:00', subject: 'Data Structures', class: 'CS-3A', room: 'Room 101', students: 45 },
      { time: '11:00 - 12:00', subject: 'Student Consultation', class: 'Open', room: 'Office', students: 0 },
      { time: '14:00 - 15:00', subject: 'Research Work', class: 'Personal', room: 'Office', students: 0 }
    ]
  };

  const days = Object.keys(timetableData);
  const timeSlots = Array.from(new Set(
    Object.values(timetableData).flat().map(item => item.time)
  )).sort();

  const getSubjectColor = (subject: string) => {
    const colors = {
      'Data Structures': 'bg-blue-100 text-blue-800 border-blue-200',
      'Machine Learning': 'bg-green-100 text-green-800 border-green-200',
      'Database Systems': 'bg-purple-100 text-purple-800 border-purple-200',
      'Advanced Algorithms': 'bg-orange-100 text-orange-800 border-orange-200',
      'Data Structures Lab': 'bg-blue-50 text-blue-700 border-blue-100',
      'Machine Learning Lab': 'bg-green-50 text-green-700 border-green-100',
      'Research Guidance': 'bg-red-100 text-red-800 border-red-200',
      'Faculty Meeting': 'bg-gray-100 text-gray-800 border-gray-200',
      'Student Consultation': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Research Work': 'bg-indigo-100 text-indigo-800 border-indigo-200'
    };
    return colors[subject as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Faculty Timetable</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage your teaching schedule and classes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Class
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Week Selector */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <Button
                variant={selectedWeek === 'current' ? 'default' : 'outline'}
                onClick={() => setSelectedWeek('current')}
                size="sm"
              >
                Current Week
              </Button>
              <Button
                variant={selectedWeek === 'next' ? 'default' : 'outline'}
                onClick={() => setSelectedWeek('next')}
                size="sm"
              >
                Next Week
              </Button>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              January 15 - January 21, 2024
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mobile View - Day Cards */}
      <div className="block md:hidden space-y-4">
        {days.map((day) => (
          <Card key={day}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{day}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {timetableData[day as keyof typeof timetableData].map((item, index) => (
                <div key={index} className={`p-3 rounded-lg border ${getSubjectColor(item.subject)}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{item.subject}</h4>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                      <Edit className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {item.time}
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-3 w-3 mr-1" />
                      {item.class}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {item.room}
                    </div>
                    {item.students > 0 && (
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {item.students} students
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop View - Timetable Grid */}
      <div className="hidden md:block">
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Time</th>
                    {days.map((day) => (
                      <th key={day} className="text-center p-4 font-semibold min-w-[200px]">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((time) => (
                    <tr key={time} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="p-4 font-medium text-sm">
                        {time}
                      </td>
                      {days.map((day) => {
                        const classItem = timetableData[day as keyof typeof timetableData]
                          .find(item => item.time === time);
                        
                        return (
                          <td key={day} className="p-2">
                            {classItem ? (
                              <div className={`p-3 rounded-lg border ${getSubjectColor(classItem.subject)} relative group`}>
                                <div className="flex justify-between items-start mb-1">
                                  <h4 className="font-semibold text-sm">{classItem.subject}</h4>
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                </div>
                                <div className="space-y-1 text-xs">
                                  <div className="flex items-center">
                                    <BookOpen className="h-3 w-3 mr-1" />
                                    {classItem.class}
                                  </div>
                                  <div className="flex items-center">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    {classItem.room}
                                  </div>
                                  {classItem.students > 0 && (
                                    <div className="flex items-center">
                                      <Users className="h-3 w-3 mr-1" />
                                      {classItem.students}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div className="h-full min-h-[80px] flex items-center justify-center">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-gray-400 hover:text-gray-600 h-8 w-8 p-0"
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Classes</p>
                <p className="text-2xl font-bold text-blue-600">18</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Teaching Hours</p>
                <p className="text-2xl font-bold text-green-600">22</p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Different Subjects</p>
                <p className="text-2xl font-bold text-purple-600">4</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Students</p>
                <p className="text-2xl font-bold text-orange-600">208</p>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FacultyTimetable;
