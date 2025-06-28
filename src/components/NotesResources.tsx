
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Download,
  Search,
  FileText,
  Video,
  Link,
  Calendar,
  User,
  Filter,
  Star,
  Eye
} from "lucide-react";

const NotesResources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const resources = [
    {
      id: 1,
      title: 'Database Design Fundamentals',
      subject: 'Database Systems',
      type: 'notes',
      faculty: 'Dr. Smith',
      uploadDate: '2024-01-15',
      downloads: 245,
      rating: 4.8,
      size: '2.3 MB',
      format: 'PDF',
      description: 'Comprehensive notes on database design principles and normalization'
    },
    {
      id: 2,
      title: 'Machine Learning Algorithms Overview',
      subject: 'Machine Learning',
      type: 'presentation',
      faculty: 'Prof. Johnson',
      uploadDate: '2024-01-14',
      downloads: 189,
      rating: 4.6,
      size: '15.7 MB',
      format: 'PPTX',
      description: 'Detailed presentation covering supervised and unsupervised learning algorithms'
    },
    {
      id: 3,
      title: 'Software Development Lifecycle',
      subject: 'Software Engineering',
      type: 'video',
      faculty: 'Dr. Wilson',
      uploadDate: '2024-01-12',
      downloads: 156,
      rating: 4.9,
      size: '890 MB',
      format: 'MP4',
      description: 'Video lecture on SDLC methodologies and best practices'
    },
    {
      id: 4,
      title: 'Network Protocols Reference Guide',
      subject: 'Computer Networks',
      type: 'reference',
      faculty: 'Prof. Davis',
      uploadDate: '2024-01-10',
      downloads: 134,
      rating: 4.7,
      size: '5.1 MB',
      format: 'PDF',
      description: 'Quick reference guide for TCP/IP and other network protocols'
    },
    {
      id: 5,
      title: 'Python Programming Tutorial',
      subject: 'Programming',
      type: 'tutorial',
      faculty: 'Dr. Brown',
      uploadDate: '2024-01-08',
      downloads: 312,
      rating: 4.5,
      size: '8.9 MB',
      format: 'PDF',
      description: 'Step-by-step Python programming tutorial with examples'
    },
    {
      id: 6,
      title: 'Data Structures Implementation',
      subject: 'Data Structures',
      type: 'code',
      faculty: 'Prof. Lee',
      uploadDate: '2024-01-05',
      downloads: 198,
      rating: 4.8,
      size: '1.2 MB',
      format: 'ZIP',
      description: 'Complete implementation of various data structures in C++'
    }
  ];

  const subjects = [
    { value: 'all', label: 'All Subjects' },
    { value: 'Database Systems', label: 'Database Systems' },
    { value: 'Machine Learning', label: 'Machine Learning' },
    { value: 'Software Engineering', label: 'Software Engineering' },
    { value: 'Computer Networks', label: 'Computer Networks' },
    { value: 'Programming', label: 'Programming' },
    { value: 'Data Structures', label: 'Data Structures' }
  ];

  const types = [
    { value: 'all', label: 'All Types' },
    { value: 'notes', label: 'Notes' },
    { value: 'presentation', label: 'Presentations' },
    { value: 'video', label: 'Videos' },
    { value: 'reference', label: 'References' },
    { value: 'tutorial', label: 'Tutorials' },
    { value: 'code', label: 'Code Samples' }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || resource.subject === selectedSubject;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    return matchesSearch && matchesSubject && matchesType;
  });

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'notes': 'bg-blue-100 text-blue-800',
      'presentation': 'bg-green-100 text-green-800',
      'video': 'bg-purple-100 text-purple-800',
      'reference': 'bg-orange-100 text-orange-800',
      'tutorial': 'bg-pink-100 text-pink-800',
      'code': 'bg-gray-100 text-gray-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'notes': return <FileText className="h-4 w-4" />;
      case 'presentation': return <FileText className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'reference': return <BookOpen className="h-4 w-4" />;
      case 'tutorial': return <BookOpen className="h-4 w-4" />;
      case 'code': return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const handleDownload = (resource: any) => {
    console.log('Downloading:', resource.title);
    alert(`Downloading ${resource.title}...`);
  };

  const handlePreview = (resource: any) => {
    console.log('Previewing:', resource.title);
    alert(`Opening preview for ${resource.title}...`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Notes & Resources</h2>
          <p className="text-gray-600 dark:text-gray-400">Access study materials and educational resources</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <BookOpen className="h-4 w-4 mr-2" />
          Upload Resource
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search notes and resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <select
                className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                {subjects.map(subject => (
                  <option key={subject.value} value={subject.value}>{subject.label}</option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-48">
              <select
                className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {types.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resources Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg line-clamp-2">{resource.title}</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{resource.subject}</p>
                </div>
                <Badge className={`${getTypeColor(resource.type)} flex items-center gap-1 ml-2`}>
                  {getTypeIcon(resource.type)}
                  {resource.type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                {resource.description}
              </p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Faculty</p>
                  <p className="font-medium flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    {resource.faculty}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Size</p>
                  <p className="font-medium">{resource.size}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Downloads</p>
                  <p className="font-medium flex items-center">
                    <Download className="h-3 w-3 mr-1" />
                    {resource.downloads}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Rating</p>
                  <p className="font-medium flex items-center">
                    <Star className="h-3 w-3 mr-1 text-yellow-500" />
                    {resource.rating}
                  </p>
                </div>
              </div>

              <div className="text-xs text-gray-500 flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                Uploaded on {resource.uploadDate}
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    {resource.format}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handlePreview(resource)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleDownload(resource)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No resources found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search criteria or filters.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NotesResources;
