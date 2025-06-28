
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Search,
  Edit,
  Eye,
  Plus,
  Download,
  Filter,
  UserCheck,
  Mail,
  Phone
} from "lucide-react";

const StudentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');

  const students = [
    {
      id: "CS2024001",
      name: "John Smith",
      email: "john.smith@college.edu",
      phone: "+1234567890",
      class: "Computer Science - Final Year",
      semester: "7th Semester",
      attendance: 87,
      cgpa: 8.5,
      status: "active",
      photo: "/placeholder.svg"
    },
    {
      id: "CS2024002",
      name: "Sarah Johnson",
      email: "sarah.johnson@college.edu", 
      phone: "+1234567891",
      class: "Computer Science - Final Year",
      semester: "7th Semester",
      attendance: 92,
      cgpa: 9.1,
      status: "active",
      photo: "/placeholder.svg"
    },
    {
      id: "IT2024001",
      name: "Mike Chen",
      email: "mike.chen@college.edu",
      phone: "+1234567892", 
      class: "Information Technology - Third Year",
      semester: "5th Semester",
      attendance: 78,
      cgpa: 7.8,
      status: "active",
      photo: "/placeholder.svg"
    },
    {
      id: "CS2024003",
      name: "Emily Davis",
      email: "emily.davis@college.edu",
      phone: "+1234567893",
      class: "Computer Science - Final Year", 
      semester: "7th Semester",
      attendance: 95,
      cgpa: 9.3,
      status: "active",
      photo: "/placeholder.svg"
    }
  ];

  const classes = [
    { value: 'all', label: 'All Classes' },
    { value: 'cs-final', label: 'Computer Science - Final Year' },
    { value: 'it-third', label: 'Information Technology - Third Year' },
    { value: 'ee-second', label: 'Electrical Engineering - Second Year' }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || student.class.includes(selectedClass);
    return matchesSearch && matchesClass;
  });

  const handleEditStudent = (studentId: string) => {
    console.log(`Editing student ${studentId}`);
    alert('Edit student functionality - would open edit form');
  };

  const handleViewProfile = (studentId: string) => {
    console.log(`Viewing profile for ${studentId}`);
    alert('View profile functionality - would open detailed view');
  };

  const handleSendMessage = (studentId: string) => {
    console.log(`Sending message to ${studentId}`);
    alert('Message functionality - would open chat/email');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'suspended': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 85) return 'text-green-600';
    if (attendance >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Student Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage student records and information</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Student
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Students</p>
                <p className="text-2xl font-bold text-blue-600">{students.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Students</p>
                <p className="text-2xl font-bold text-green-600">{students.filter(s => s.status === 'active').length}</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Attendance</p>
                <p className="text-2xl font-bold text-purple-600">88%</p>
              </div>
              <UserCheck className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg. CGPA</p>
                <p className="text-2xl font-bold text-orange-600">8.7</p>
              </div>
              <UserCheck className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name or student ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-64">
              <select
                className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                {classes.map(cls => (
                  <option key={cls.value} value={cls.value}>{cls.label}</option>
                ))}
              </select>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Students List */}
      <div className="space-y-4">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                {/* Student Photo */}
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  <img 
                    src={student.photo} 
                    alt={student.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling!.textContent = student.name.split(' ').map(n => n[0]).join('');
                    }}
                  />
                  <div className="text-lg font-semibold text-gray-600 hidden">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>

                {/* Student Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{student.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">ID: {student.id}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{student.class}</p>
                    </div>
                    <Badge className={getStatusColor(student.status)}>
                      {student.status.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-gray-500">Attendance</p>
                      <p className={`font-semibold ${getAttendanceColor(student.attendance)}`}>
                        {student.attendance}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">CGPA</p>
                      <p className="font-semibold text-blue-600">{student.cgpa}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm truncate">{student.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm">{student.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                    <Button size="sm" variant="outline" onClick={() => handleViewProfile(student.id)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleEditStudent(student.id)}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleSendMessage(student.id)}>
                      <Mail className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No students found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search criteria or filters.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StudentManagement;
