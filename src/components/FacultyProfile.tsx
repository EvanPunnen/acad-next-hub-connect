
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
  BookOpen,
  Edit,
  Save,
  Camera,
  Users,
  Clock
} from "lucide-react";

const FacultyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Prof. Johnson',
    email: 'prof.johnson@college.edu',
    phone: '+1234567890',
    department: 'Computer Science',
    designation: 'Professor',
    experience: '15 years',
    qualification: 'Ph.D in Computer Science',
    address: '123 Faculty Colony, City',
    joinDate: '2009-08-15',
    employeeId: 'FAC001',
    subjects: ['Machine Learning', 'Data Structures', 'Algorithms'],
    classes: ['CS Final Year', 'CS Third Year'],
    photo: '/placeholder.svg'
  });

  const [selectedClasses, setSelectedClasses] = useState(profile.classes);

  const availableClasses = [
    'CS Final Year',
    'CS Third Year', 
    'IT Final Year',
    'IT Third Year',
    'EE Second Year',
    'ME First Year'
  ];

  const handleSave = () => {
    setProfile(prev => ({ ...prev, classes: selectedClasses }));
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleClassToggle = (className: string) => {
    setSelectedClasses(prev => 
      prev.includes(className) 
        ? prev.filter(c => c !== className)
        : [...prev, className]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Faculty Profile</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage your profile and class assignments</p>
        </div>
        <Button 
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          className={isEditing ? 'bg-green-600 hover:bg-green-700' : ''}
        >
          {isEditing ? <Save className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Photo & Basic Info */}
        <Card>
          <CardContent className="p-6 text-center">
            <div className="relative inline-block mb-4">
              <Avatar className="w-32 h-32">
                <AvatarImage src={profile.photo} alt={profile.name} />
                <AvatarFallback className="text-2xl">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button 
                size="sm" 
                className="absolute bottom-0 right-0 rounded-full w-8 h-8"
                onClick={() => alert('Photo upload functionality')}
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <h3 className="text-xl font-bold mb-2">{profile.name}</h3>
            <p className="text-gray-600 mb-1">{profile.designation}</p>
            <p className="text-sm text-gray-500">{profile.department} Department</p>
            <Badge className="mt-2 bg-green-100 text-green-800">
              Employee ID: {profile.employeeId}
            </Badge>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-500" />
              <div>
                <Label className="text-sm text-gray-500">Email</Label>
                <p className="font-medium">{profile.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-500" />
              <div>
                <Label className="text-sm text-gray-500">Phone</Label>
                <p className="font-medium">{profile.phone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-gray-500" />
              <div>
                <Label className="text-sm text-gray-500">Address</Label>
                <p className="font-medium">{profile.address}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <Label className="text-sm text-gray-500">Join Date</Label>
                <p className="font-medium">{profile.joinDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Information */}
        <Card>
          <CardHeader>
            <CardTitle>Professional Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm text-gray-500">Qualification</Label>
              <p className="font-medium">{profile.qualification}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-500">Experience</Label>
              <p className="font-medium">{profile.experience}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-500">Subjects</Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {profile.subjects.map((subject, index) => (
                  <Badge key={index} variant="outline">{subject}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Class Assignment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Class Assignments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">Select the classes you want to teach:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableClasses.map((className) => (
                <div
                  key={className}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedClasses.includes(className)
                      ? 'bg-blue-50 border-blue-300 dark:bg-blue-900/20'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  } ${!isEditing ? 'cursor-default' : ''}`}
                  onClick={isEditing ? () => handleClassToggle(className) : undefined}
                >
                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded border ${
                      selectedClasses.includes(className) 
                        ? 'bg-blue-600 border-blue-600' 
                        : 'border-gray-300'
                    }`}>
                      {selectedClasses.includes(className) && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <span className="text-sm font-medium">{className}</span>
                  </div>
                </div>
              ))}
            </div>
            {isEditing && (
              <p className="text-xs text-gray-500 mt-2">
                Click on classes to assign or remove them from your teaching schedule.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Teaching Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Current Teaching Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {profile.classes.map((className, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <h4 className="font-medium">{className}</h4>
                  <p className="text-sm text-gray-600">Active Students: 45</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyProfile;
