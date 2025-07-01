
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  GraduationCap,
  Edit3,
  Save,
  X,
  Award,
  BookOpen,
  Users
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const FacultyProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    full_name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@acadnext.com',
    phone: '+1 (555) 123-4567',
    faculty_id: 'FAC001',
    department: 'Computer Science',
    designation: 'Associate Professor',
    qualification: 'Ph.D. in Computer Science',
    experience: '12 years',
    specialization: 'Machine Learning, Data Science',
    address: '123 University Ave, Academic City',
    joined_date: '2012-08-15',
    bio: 'Passionate educator and researcher with expertise in machine learning and data science. Published over 50 research papers and guided numerous students in their academic journey.',
    subjects_taught: ['Data Structures', 'Machine Learning', 'Database Systems', 'Advanced Algorithms'],
    total_students: 156,
    courses_taught: 8,
    research_papers: 52
  });

  const handleSave = () => {
    // In a real app, this would save to the database
    console.log('Saving profile:', profile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset changes in a real app
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Faculty Profile</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage your faculty profile and information</p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button onClick={handleCancel} variant="outline">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700">
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <Avatar className="w-32 h-32">
              <AvatarImage src="/placeholder.svg" alt={profile.full_name} />
              <AvatarFallback className="text-3xl font-bold">
                {profile.full_name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-2xl font-bold mb-2">{profile.full_name}</h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">{profile.designation}</p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{profile.department} Department</p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <Badge variant="secondary" className="px-3 py-1">
                  <GraduationCap className="h-3 w-3 mr-1" />
                  {profile.qualification}
                </Badge>
                <Badge variant="secondary" className="px-3 py-1">
                  <Calendar className="h-3 w-3 mr-1" />
                  {profile.experience} Experience
                </Badge>
                <Badge variant="secondary" className="px-3 py-1">
                  Faculty ID: {profile.faculty_id}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Students</p>
                <p className="text-2xl font-bold text-blue-600">{profile.total_students}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Courses Taught</p>
                <p className="text-2xl font-bold text-green-600">{profile.courses_taught}</p>
              </div>
              <BookOpen className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Research Papers</p>
                <p className="text-2xl font-bold text-purple-600">{profile.research_papers}</p>
              </div>
              <Award className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="full_name">Full Name</Label>
              <div className="flex items-center mt-1">
                <User className="h-4 w-4 mr-2 text-gray-500" />
                {isEditing ? (
                  <Input
                    id="full_name"
                    value={profile.full_name}
                    onChange={(e) => setProfile({...profile, full_name: e.target.value})}
                  />
                ) : (
                  <span>{profile.full_name}</span>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="flex items-center mt-1">
                <Mail className="h-4 w-4 mr-2 text-gray-500" />
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                  />
                ) : (
                  <span>{profile.email}</span>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <div className="flex items-center mt-1">
                <Phone className="h-4 w-4 mr-2 text-gray-500" />
                {isEditing ? (
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  />
                ) : (
                  <span>{profile.phone}</span>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="faculty_id">Faculty ID</Label>
              <div className="flex items-center mt-1">
                <GraduationCap className="h-4 w-4 mr-2 text-gray-500" />
                <span>{profile.faculty_id}</span>
              </div>
            </div>
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <div className="flex items-start mt-1">
              <MapPin className="h-4 w-4 mr-2 text-gray-500 mt-1" />
              {isEditing ? (
                <Textarea
                  id="address"
                  value={profile.address}
                  onChange={(e) => setProfile({...profile, address: e.target.value})}
                  rows={2}
                />
              ) : (
                <span>{profile.address}</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Academic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Academic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Department</Label>
              <p className="mt-1">{profile.department}</p>
            </div>
            <div>
              <Label>Designation</Label>
              <p className="mt-1">{profile.designation}</p>
            </div>
            <div>
              <Label>Qualification</Label>
              <p className="mt-1">{profile.qualification}</p>
            </div>
            <div>
              <Label>Experience</Label>
              <p className="mt-1">{profile.experience}</p>
            </div>
            <div className="md:col-span-2">
              <Label>Specialization</Label>
              <p className="mt-1">{profile.specialization}</p>
            </div>
            <div className="md:col-span-2">
              <Label>Bio</Label>
              {isEditing ? (
                <Textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  rows={4}
                  className="mt-1"
                />
              ) : (
                <p className="mt-1">{profile.bio}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subjects Taught */}
      <Card>
        <CardHeader>
          <CardTitle>Subjects Taught</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {profile.subjects_taught.map((subject, index) => (
              <Badge key={index} variant="outline" className="px-3 py-1">
                {subject}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyProfile;
