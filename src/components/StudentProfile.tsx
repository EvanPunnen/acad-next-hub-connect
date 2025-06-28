
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Camera,
  Save,
  X,
  Clock,
  BookOpen,
  Award,
  GraduationCap
} from "lucide-react";

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  const [studentData, setStudentData] = useState({
    name: "John Smith",
    studentId: "CS2024001",
    email: "john.smith@college.edu",
    phone: "+1234567890",
    dateOfBirth: "1999-05-15",
    address: "123 Main Street, City, State 12345",
    department: "Computer Science",
    semester: "7th Semester",
    batch: "2021-2025",
    cgpa: 8.5,
    attendance: 87,
    bloodGroup: "O+",
    emergencyContact: "+1234567899",
    parentName: "Robert Smith",
    avatar: "/placeholder.svg"
  });

  const handleSave = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset data if needed
  };

  const handleAvatarChange = () => {
    alert('Photo upload functionality - would open file picker');
  };

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
    alert(`Status changed to ${!isOnline ? 'Online' : 'Offline'}`);
  };

  const achievements = [
    { title: 'Dean\'s List', year: '2023', description: 'Academic Excellence Award' },
    { title: 'Best Project Award', year: '2023', description: 'Machine Learning Project Competition' },
    { title: 'Coding Competition Winner', year: '2022', description: 'Inter-college Programming Contest' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Student Profile</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage your personal information and academic details</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={toggleOnlineStatus}
            className={`${isOnline ? 'text-green-600 border-green-600' : 'text-gray-600 border-gray-600'}`}
          >
            <div className={`w-2 h-2 rounded-full mr-2 ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            {isOnline ? 'Online' : 'Offline'}
          </Button>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <div className="relative inline-block">
              <Avatar className="w-32 h-32 mx-auto">
                <AvatarImage src={studentData.avatar} alt={studentData.name} />
                <AvatarFallback className="text-2xl">
                  {studentData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-4 border-white ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              {isEditing && (
                <Button 
                  size="sm" 
                  className="absolute bottom-0 right-0 rounded-full p-2"
                  onClick={handleAvatarChange}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-bold">{studentData.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{studentData.studentId}</p>
              <Badge className="mt-2 bg-blue-100 text-blue-800">
                {studentData.department}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Award className="h-6 w-6 text-green-600 mx-auto mb-1" />
                <p className="text-sm text-gray-600 dark:text-gray-400">CGPA</p>
                <p className="text-lg font-bold text-green-600">{studentData.cgpa}</p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Clock className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Attendance</p>
                <p className="text-lg font-bold text-blue-600">{studentData.attendance}%</p>
              </div>
            </div>
            <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <GraduationCap className="h-6 w-6 text-purple-600 mx-auto mb-1" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Current Semester</p>
              <p className="font-semibold text-purple-600">{studentData.semester}</p>
            </div>
          </CardContent>
        </Card>

        {/* Details Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={studentData.name}
                      onChange={(e) => setStudentData({...studentData, name: e.target.value})}
                    />
                  ) : (
                    <p className="mt-1 p-2 bg-gray-50 dark:bg-gray-800 rounded">{studentData.name}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="studentId">Student ID</Label>
                  <p className="mt-1 p-2 bg-gray-50 dark:bg-gray-800 rounded">{studentData.studentId}</p>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={studentData.email}
                      onChange={(e) => setStudentData({...studentData, email: e.target.value})}
                    />
                  ) : (
                    <p className="mt-1 p-2 bg-gray-50 dark:bg-gray-800 rounded flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      {studentData.email}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={studentData.phone}
                      onChange={(e) => setStudentData({...studentData, phone: e.target.value})}
                    />
                  ) : (
                    <p className="mt-1 p-2 bg-gray-50 dark:bg-gray-800 rounded flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      {studentData.phone}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="dob">Date of Birth</Label>
                  {isEditing ? (
                    <Input
                      id="dob"
                      type="date"
                      value={studentData.dateOfBirth}
                      onChange={(e) => setStudentData({...studentData, dateOfBirth: e.target.value})}
                    />
                  ) : (
                    <p className="mt-1 p-2 bg-gray-50 dark:bg-gray-800 rounded flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      {studentData.dateOfBirth}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  {isEditing ? (
                    <Input
                      id="bloodGroup"
                      value={studentData.bloodGroup}
                      onChange={(e) => setStudentData({...studentData, bloodGroup: e.target.value})}
                    />
                  ) : (
                    <p className="mt-1 p-2 bg-gray-50 dark:bg-gray-800 rounded">{studentData.bloodGroup}</p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                {isEditing ? (
                  <Input
                    id="address"
                    value={studentData.address}
                    onChange={(e) => setStudentData({...studentData, address: e.target.value})}
                  />
                ) : (
                  <p className="mt-1 p-2 bg-gray-50 dark:bg-gray-800 rounded flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                    {studentData.address}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Academic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Academic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Department</Label>
                  <p className="mt-1 p-2 bg-gray-50 dark:bg-gray-800 rounded">{studentData.department}</p>
                </div>
                <div>
                  <Label>Batch</Label>
                  <p className="mt-1 p-2 bg-gray-50 dark:bg-gray-800 rounded">{studentData.batch}</p>
                </div>
                <div>
                  <Label>Current Semester</Label>
                  <p className="mt-1 p-2 bg-gray-50 dark:bg-gray-800 rounded">{studentData.semester}</p>
                </div>
                <div>
                  <Label>Current CGPA</Label>
                  <p className="mt-1 p-2 bg-green-50 dark:bg-green-900/20 rounded font-semibold text-green-600">{studentData.cgpa}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Emergency Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="parentName">Parent/Guardian Name</Label>
                  {isEditing ? (
                    <Input
                      id="parentName"
                      value={studentData.parentName}
                      onChange={(e) => setStudentData({...studentData, parentName: e.target.value})}
                    />
                  ) : (
                    <p className="mt-1 p-2 bg-gray-50 dark:bg-gray-800 rounded">{studentData.parentName}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  {isEditing ? (
                    <Input
                      id="emergencyContact"
                      value={studentData.emergencyContact}
                      onChange={(e) => setStudentData({...studentData, emergencyContact: e.target.value})}
                    />
                  ) : (
                    <p className="mt-1 p-2 bg-gray-50 dark:bg-gray-800 rounded flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      {studentData.emergencyContact}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Achievements & Awards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <Award className="h-6 w-6 text-yellow-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">{achievement.title}</h4>
                      <p className="text-sm text-yellow-600 dark:text-yellow-300">{achievement.year}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
