
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Upload,
  Download,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  User,
  BookOpen
} from "lucide-react";

const Assignments = () => {
  const [filter, setFilter] = useState('all');

  const assignments = [
    {
      id: 1,
      title: 'Database Design Project',
      subject: 'Database Systems',
      faculty: 'Dr. Smith',
      dueDate: '2024-01-20',
      submittedDate: '2024-01-18',
      status: 'submitted',
      grade: 'A',
      marks: '48/50',
      description: 'Design a complete database schema for a library management system',
      attachments: ['project_report.pdf', 'database_schema.sql']
    },
    {
      id: 2,
      title: 'Machine Learning Algorithm Implementation',
      subject: 'Machine Learning',
      faculty: 'Prof. Johnson',
      dueDate: '2024-01-25',
      submittedDate: null,
      status: 'pending',
      grade: null,
      marks: null,
      description: 'Implement and compare different classification algorithms',
      attachments: []
    },
    {
      id: 3,
      title: 'Software Requirements Document',
      subject: 'Software Engineering',
      faculty: 'Dr. Wilson',
      dueDate: '2024-01-22',
      submittedDate: null,
      status: 'overdue',
      grade: null,
      marks: null,
      description: 'Create a comprehensive SRS document for a web application',
      attachments: []
    },
    {
      id: 4,
      title: 'Network Security Analysis',
      subject: 'Computer Networks',
      faculty: 'Prof. Davis',
      dueDate: '2024-01-30',
      submittedDate: null,
      status: 'pending',
      grade: null,
      marks: null,
      description: 'Analyze security vulnerabilities in network protocols',
      attachments: []
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'graded': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'overdue': return <AlertTriangle className="h-4 w-4" />;
      case 'graded': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const filteredAssignments = assignments.filter(assignment => {
    if (filter === 'all') return true;
    return assignment.status === filter;
  });

  const handleFileUpload = (assignmentId: number) => {
    alert(`Upload functionality for assignment ${assignmentId} - would open file picker`);
  };

  const handleDownload = (filename: string) => {
    alert(`Downloading ${filename}`);
  };

  const stats = {
    total: assignments.length,
    submitted: assignments.filter(a => a.status === 'submitted').length,
    pending: assignments.filter(a => a.status === 'pending').length,
    overdue: assignments.filter(a => a.status === 'overdue').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Assignments</h2>
          <p className="text-gray-600 dark:text-gray-400">Track and submit your assignments</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Upload className="h-4 w-4 mr-2" />
          Submit Assignment
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Submitted</p>
                <p className="text-2xl font-bold text-green-600">{stats.submitted}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Overdue</p>
                <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className="flex space-x-2">
        <Button 
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        <Button 
          variant={filter === 'pending' ? 'default' : 'outline'}
          onClick={() => setFilter('pending')}
        >
          Pending
        </Button>
        <Button 
          variant={filter === 'submitted' ? 'default' : 'outline'}
          onClick={() => setFilter('submitted')}
        >
          Submitted
        </Button>
        <Button 
          variant={filter === 'overdue' ? 'default' : 'outline'}
          onClick={() => setFilter('overdue')}
        >
          Overdue
        </Button>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {filteredAssignments.map((assignment) => (
          <Card key={assignment.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{assignment.title}</CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                    <span className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      {assignment.subject}
                    </span>
                    <span className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {assignment.faculty}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Due: {assignment.dueDate}
                    </span>
                  </div>
                </div>
                <Badge className={`${getStatusColor(assignment.status)} flex items-center gap-1`}>
                  {getStatusIcon(assignment.status)}
                  {assignment.status.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">{assignment.description}</p>
              
              {assignment.grade && (
                <div className="flex items-center space-x-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-200">Grade: {assignment.grade}</p>
                    <p className="text-sm text-green-600 dark:text-green-400">Marks: {assignment.marks}</p>
                  </div>
                </div>
              )}

              {assignment.attachments.length > 0 && (
                <div>
                  <p className="font-medium mb-2">Attachments:</p>
                  <div className="flex flex-wrap gap-2">
                    {assignment.attachments.map((file, index) => (
                      <Button
                        key={index}
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownload(file)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        {file}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-sm text-gray-600">
                  {assignment.submittedDate ? (
                    <span className="flex items-center text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Submitted on {assignment.submittedDate}
                    </span>
                  ) : (
                    <span className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      Not submitted yet
                    </span>
                  )}
                </div>
                {assignment.status !== 'submitted' && (
                  <Button
                    size="sm"
                    onClick={() => handleFileUpload(assignment.id)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Upload className="h-4 w-4 mr-1" />
                    Submit
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Assignments;
