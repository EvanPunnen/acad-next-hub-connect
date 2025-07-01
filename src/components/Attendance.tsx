
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar, 
  Clock,
  CheckCircle,
  XCircle,
  Users,
  Save,
  Download,
  Filter
} from "lucide-react";

interface AttendanceRecord {
  studentId: string;
  studentName: string;
  rollNumber: string;
  isPresent: boolean;
  remarks?: string;
}

interface ClassSession {
  id: string;
  subject: string;
  period: string;
  time: string;
  date: string;
}

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const { toast } = useToast();

  const subjects = [
    { value: 'database-systems', label: 'Database Systems' },
    { value: 'machine-learning', label: 'Machine Learning' },
    { value: 'software-engineering', label: 'Software Engineering' },
    { value: 'computer-networks', label: 'Computer Networks' },
    { value: 'data-structures', label: 'Data Structures' }
  ];

  const periods = [
    { value: '1', label: 'Period 1 (09:00-10:30)' },
    { value: '2', label: 'Period 2 (10:45-12:15)' },
    { value: '3', label: 'Period 3 (01:00-02:30)' },
    { value: '4', label: 'Period 4 (02:45-04:15)' },
    { value: '5', label: 'Period 5 (04:30-06:00)' }
  ];

  // Mock student data
  const students = [
    { id: '1', name: 'John Smith', rollNumber: 'CS2024001' },
    { id: '2', name: 'Sarah Johnson', rollNumber: 'CS2024002' },
    { id: '3', name: 'Mike Chen', rollNumber: 'IT2024001' },
    { id: '4', name: 'Emily Davis', rollNumber: 'CS2024003' },
    { id: '5', name: 'Alex Brown', rollNumber: 'CS2024004' },
    { id: '6', name: 'Lisa Wilson', rollNumber: 'CS2024005' }
  ];

  const startAttendanceSession = () => {
    if (!selectedSubject || !selectedPeriod) {
      toast({
        title: "Error",
        description: "Please select subject and period to start attendance",
        variant: "destructive"
      });
      return;
    }

    // Initialize attendance records for all students
    const initialRecords: AttendanceRecord[] = students.map(student => ({
      studentId: student.id,
      studentName: student.name,
      rollNumber: student.rollNumber,
      isPresent: false
    }));

    setAttendanceRecords(initialRecords);
    setIsSessionActive(true);
    
    toast({
      title: "Attendance Started",
      description: `Attendance session started for ${subjects.find(s => s.value === selectedSubject)?.label} - ${periods.find(p => p.value === selectedPeriod)?.label}`
    });
  };

  const toggleAttendance = (studentId: string) => {
    setAttendanceRecords(records =>
      records.map(record =>
        record.studentId === studentId
          ? { ...record, isPresent: !record.isPresent }
          : record
      )
    );
  };

  const markAllPresent = () => {
    setAttendanceRecords(records =>
      records.map(record => ({ ...record, isPresent: true }))
    );
    toast({
      title: "All Present",
      description: "All students marked as present"
    });
  };

  const markAllAbsent = () => {
    setAttendanceRecords(records =>
      records.map(record => ({ ...record, isPresent: false }))
    );
    toast({
      title: "All Absent",
      description: "All students marked as absent"
    });
  };

  const saveAttendance = () => {
    console.log('Saving attendance:', {
      date: selectedDate,
      subject: selectedSubject,
      period: selectedPeriod,
      records: attendanceRecords
    });

    // Here you would send the data to your backend
    toast({
      title: "Attendance Saved",
      description: "Attendance has been successfully recorded and students will be notified"
    });

    // Reset session
    setIsSessionActive(false);
    setAttendanceRecords([]);
  };

  // Mock attendance statistics
  const attendanceStats = {
    totalSessions: 45,
    todaySessions: 3,
    averageAttendance: 87,
    presentToday: attendanceRecords.filter(r => r.isPresent).length,
    totalStudents: attendanceRecords.length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Attendance Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Mark and manage student attendance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Sessions</p>
                <p className="text-2xl font-bold text-blue-600">{attendanceStats.totalSessions}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Today's Sessions</p>
                <p className="text-2xl font-bold text-green-600">{attendanceStats.todaySessions}</p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Attendance</p>
                <p className="text-2xl font-bold text-purple-600">{attendanceStats.averageAttendance}%</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Present Today</p>
                <p className="text-2xl font-bold text-orange-600">
                  {attendanceStats.presentToday}/{attendanceStats.totalStudents}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Session Setup */}
      {!isSessionActive && (
        <Card>
          <CardHeader>
            <CardTitle>Start Attendance Session</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map(subject => (
                      <SelectItem key={subject.value} value={subject.value}>
                        {subject.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Period</label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    {periods.map(period => (
                      <SelectItem key={period.value} value={period.value}>
                        {period.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={startAttendanceSession} className="w-full">
              <Calendar className="h-4 w-4 mr-2" />
              Start Attendance Session
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Active Attendance Session */}
      {isSessionActive && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Mark Attendance</CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  {subjects.find(s => s.value === selectedSubject)?.label} - 
                  {periods.find(p => p.value === selectedPeriod)?.label} - 
                  {selectedDate}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={markAllPresent}>
                  Mark All Present
                </Button>
                <Button variant="outline" size="sm" onClick={markAllAbsent}>
                  Mark All Absent
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {attendanceRecords.map((record) => (
                <div key={record.studentId} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Checkbox
                      checked={record.isPresent}
                      onCheckedChange={() => toggleAttendance(record.studentId)}
                      className="scale-125"
                    />
                    <div>
                      <h3 className="font-semibold">{record.studentName}</h3>
                      <p className="text-sm text-gray-600">Roll No: {record.rollNumber}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={record.isPresent ? "default" : "secondary"}
                    className={record.isPresent ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                  >
                    {record.isPresent ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Present
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 mr-1" />
                        Absent
                      </>
                    )}
                  </Badge>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center mt-6 pt-4 border-t">
              <div className="text-sm text-gray-600">
                Present: {attendanceRecords.filter(r => r.isPresent).length} / {attendanceRecords.length} students
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsSessionActive(false)}>
                  Cancel
                </Button>
                <Button onClick={saveAttendance}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Attendance
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Attendance History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Attendance Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { date: '2024-01-15', subject: 'Database Systems', period: 'Period 1', present: 23, total: 25 },
              { date: '2024-01-15', subject: 'Machine Learning', period: 'Period 2', present: 22, total: 25 },
              { date: '2024-01-14', subject: 'Software Engineering', period: 'Period 3', present: 24, total: 25 },
            ].map((session, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <h3 className="font-semibold">{session.subject}</h3>
                    <p className="text-sm text-gray-600">{session.date} - {session.period}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{session.present}/{session.total}</p>
                  <p className="text-sm text-gray-600">{Math.round((session.present/session.total) * 100)}% attendance</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Attendance;
