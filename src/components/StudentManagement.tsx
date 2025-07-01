
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
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
  Phone,
  Trash2,
  Calendar,
  FileText,
  CreditCard
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  class: string;
  semester: string;
  attendance: number;
  cgpa: number;
  status: 'active' | 'inactive' | 'suspended';
  photo: string;
  rollNumber: string;
  address: string;
  parentContact: string;
  dateOfBirth: string;
  bloodGroup: string;
}

const StudentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [students, setStudents] = useState<Student[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const { toast } = useToast();

  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    name: '',
    email: '',
    phone: '',
    class: '',
    semester: '',
    status: 'active',
    rollNumber: '',
    address: '',
    parentContact: '',
    dateOfBirth: '',
    bloodGroup: '',
    attendance: 0,
    cgpa: 0
  });

  // Mock initial data
  useEffect(() => {
    setStudents([
      {
        id: "1",
        name: "John Smith",
        email: "john.smith@college.edu",
        phone: "+1234567890",
        class: "Computer Science - Final Year",
        semester: "7th Semester",
        attendance: 87,
        cgpa: 8.5,
        status: "active",
        photo: "/placeholder.svg",
        rollNumber: "CS2024001",
        address: "123 Main St, City",
        parentContact: "+1234567899",
        dateOfBirth: "2002-05-15",
        bloodGroup: "O+"
      },
      {
        id: "2",
        name: "Sarah Johnson",
        email: "sarah.johnson@college.edu", 
        phone: "+1234567891",
        class: "Computer Science - Final Year",
        semester: "7th Semester",
        attendance: 92,
        cgpa: 9.1,
        status: "active",
        photo: "/placeholder.svg",
        rollNumber: "CS2024002",
        address: "456 Oak Ave, City",
        parentContact: "+1234567898",
        dateOfBirth: "2002-03-20",
        bloodGroup: "A+"
      }
    ]);
  }, []);

  const classes = [
    { value: 'all', label: 'All Classes' },
    { value: 'cs-final', label: 'Computer Science - Final Year' },
    { value: 'it-third', label: 'Information Technology - Third Year' },
    { value: 'ee-second', label: 'Electrical Engineering - Second Year' }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || student.class.includes(selectedClass);
    return matchesSearch && matchesClass;
  });

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.email || !newStudent.rollNumber) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const student: Student = {
      ...newStudent as Student,
      id: Date.now().toString(),
      photo: '/placeholder.svg'
    };

    setStudents([...students, student]);
    setNewStudent({
      name: '',
      email: '',
      phone: '',
      class: '',
      semester: '',
      status: 'active',
      rollNumber: '',
      address: '',
      parentContact: '',
      dateOfBirth: '',
      bloodGroup: '',
      attendance: 0,
      cgpa: 0
    });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Student added successfully"
    });
  };

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsEditDialogOpen(true);
  };

  const handleUpdateStudent = () => {
    if (!selectedStudent) return;

    setStudents(students.map(s => 
      s.id === selectedStudent.id ? selectedStudent : s
    ));
    setIsEditDialogOpen(false);
    setSelectedStudent(null);
    
    toast({
      title: "Success",
      description: "Student updated successfully"
    });
  };

  const handleDeleteStudent = (studentId: string) => {
    setStudents(students.filter(s => s.id !== studentId));
    toast({
      title: "Success", 
      description: "Student removed successfully"
    });
  };

  const handleViewProfile = (student: Student) => {
    setSelectedStudent(student);
    setIsViewDialogOpen(true);
  };

  const handleSendMessage = (studentId: string) => {
    console.log(`Sending message to ${studentId}`);
    toast({
      title: "Message Sent",
      description: "Message sent to student successfully"
    });
  };

  const handleMarkAttendance = (studentId: string) => {
    console.log(`Marking attendance for ${studentId}`);
    toast({
      title: "Attendance Marked",
      description: "Attendance updated successfully"
    });
  };

  const handleAssignGrade = (studentId: string) => {
    console.log(`Assigning grade to ${studentId}`);
    toast({
      title: "Grade Assigned",
      description: "Grade assigned successfully"
    });
  };

  const handleFeeStatus = (studentId: string) => {
    console.log(`Checking fee status for ${studentId}`);
    toast({
      title: "Fees Updated",
      description: "Fee status updated successfully"
    });
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
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add New Student
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                  placeholder="Enter full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rollNumber">Roll Number *</Label>
                <Input
                  id="rollNumber"
                  value={newStudent.rollNumber}
                  onChange={(e) => setNewStudent({...newStudent, rollNumber: e.target.value})}
                  placeholder="Enter roll number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                  placeholder="Enter email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newStudent.phone}
                  onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="class">Class</Label>
                <Select value={newStudent.class} onValueChange={(value) => setNewStudent({...newStudent, class: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Computer Science - Final Year">Computer Science - Final Year</SelectItem>
                    <SelectItem value="Information Technology - Third Year">Information Technology - Third Year</SelectItem>
                    <SelectItem value="Electrical Engineering - Second Year">Electrical Engineering - Second Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="semester">Semester</Label>
                <Input
                  id="semester"
                  value={newStudent.semester}
                  onChange={(e) => setNewStudent({...newStudent, semester: e.target.value})}
                  placeholder="Enter semester"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parentContact">Parent Contact</Label>
                <Input
                  id="parentContact"
                  value={newStudent.parentContact}
                  onChange={(e) => setNewStudent({...newStudent, parentContact: e.target.value})}
                  placeholder="Enter parent contact"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <Input
                  id="bloodGroup"
                  value={newStudent.bloodGroup}
                  onChange={(e) => setNewStudent({...newStudent, bloodGroup: e.target.value})}
                  placeholder="Enter blood group"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={newStudent.address}
                  onChange={(e) => setNewStudent({...newStudent, address: e.target.value})}
                  placeholder="Enter address"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddStudent}>
                Add Student
              </Button>
            </div>
          </DialogContent>
        </Dialog>
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
                  placeholder="Search by name or roll number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-64">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {classes.map(cls => (
                    <SelectItem key={cls.value} value={cls.value}>{cls.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{student.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Roll: {student.rollNumber}</p>
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

                  <div className="flex flex-wrap items-center gap-2 mt-4">
                    <Button size="sm" variant="outline" onClick={() => handleViewProfile(student)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleEditStudent(student)}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleSendMessage(student.id)}>
                      <Mail className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleMarkAttendance(student.id)}>
                      <Calendar className="h-4 w-4 mr-1" />
                      Attendance
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleAssignGrade(student.id)}>
                      <FileText className="h-4 w-4 mr-1" />
                      Grade
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleFeeStatus(student.id)}>
                      <CreditCard className="h-4 w-4 mr-1" />
                      Fees
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDeleteStudent(student.id)}>
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Student Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Student</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="editName">Full Name</Label>
                <Input
                  id="editName"
                  value={selectedStudent.name}
                  onChange={(e) => setSelectedStudent({...selectedStudent, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editRollNumber">Roll Number</Label>
                <Input
                  id="editRollNumber"
                  value={selectedStudent.rollNumber}
                  onChange={(e) => setSelectedStudent({...selectedStudent, rollNumber: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editEmail">Email</Label>
                <Input
                  id="editEmail"
                  value={selectedStudent.email}
                  onChange={(e) => setSelectedStudent({...selectedStudent, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editPhone">Phone</Label>
                <Input
                  id="editPhone"
                  value={selectedStudent.phone}
                  onChange={(e) => setSelectedStudent({...selectedStudent, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editStatus">Status</Label>
                <Select 
                  value={selectedStudent.status} 
                  onValueChange={(value: 'active' | 'inactive' | 'suspended') => 
                    setSelectedStudent({...selectedStudent, status: value})
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="editCGPA">CGPA</Label>
                <Input
                  id="editCGPA"
                  type="number"
                  step="0.1"
                  value={selectedStudent.cgpa}
                  onChange={(e) => setSelectedStudent({...selectedStudent, cgpa: parseFloat(e.target.value)})}
                />
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateStudent}>
              Update Student
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Student Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Student Profile</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-semibold text-gray-600">
                    {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{selectedStudent.name}</h3>
                  <p className="text-gray-600">Roll: {selectedStudent.rollNumber}</p>
                  <Badge className={getStatusColor(selectedStudent.status)}>
                    {selectedStudent.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Email</Label>
                  <p className="text-sm">{selectedStudent.email}</p>
                </div>
                <div>
                  <Label>Phone</Label>
                  <p className="text-sm">{selectedStudent.phone}</p>
                </div>
                <div>
                  <Label>Class</Label>
                  <p className="text-sm">{selectedStudent.class}</p>
                </div>
                <div>
                  <Label>Semester</Label>
                  <p className="text-sm">{selectedStudent.semester}</p>
                </div>
                <div>
                  <Label>Attendance</Label>
                  <p className={`text-sm font-semibold ${getAttendanceColor(selectedStudent.attendance)}`}>
                    {selectedStudent.attendance}%
                  </p>
                </div>
                <div>
                  <Label>CGPA</Label>
                  <p className="text-sm font-semibold text-blue-600">{selectedStudent.cgpa}</p>
                </div>
                <div>
                  <Label>Parent Contact</Label>
                  <p className="text-sm">{selectedStudent.parentContact}</p>
                </div>
                <div>
                  <Label>Blood Group</Label>
                  <p className="text-sm">{selectedStudent.bloodGroup}</p>
                </div>
                <div className="col-span-2">
                  <Label>Address</Label>
                  <p className="text-sm">{selectedStudent.address}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {filteredStudents.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No students found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search criteria or add new students.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StudentManagement;
