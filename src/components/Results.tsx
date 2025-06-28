
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  TrendingUp,
  Award,
  Download,
  Eye,
  BarChart3
} from "lucide-react";

const Results = () => {
  const [selectedSemester, setSelectedSemester] = useState('7');

  const results = [
    {
      semester: 7,
      subjects: [
        { name: 'Database Systems', code: 'CS701', credits: 4, grade: 'A+', marks: 95, total: 100 },
        { name: 'Machine Learning', code: 'CS702', credits: 4, grade: 'A', marks: 88, total: 100 },
        { name: 'Software Engineering', code: 'CS703', credits: 3, grade: 'A+', marks: 92, total: 100 },
        { name: 'Computer Networks', code: 'CS704', credits: 4, grade: 'B+', marks: 82, total: 100 },
        { name: 'Project Work', code: 'CS705', credits: 2, grade: 'A', marks: 90, total: 100 }
      ],
      sgpa: 8.7,
      cgpa: 8.5
    }
  ];

  const overallStats = {
    totalCredits: 136,
    completedCredits: 119,
    cgpa: 8.5,
    rank: 12,
    totalStudents: 245
  };

  const getGradeColor = (grade: string) => {
    const colors: { [key: string]: string } = {
      'A+': 'bg-green-100 text-green-800',
      'A': 'bg-blue-100 text-blue-800',
      'B+': 'bg-yellow-100 text-yellow-800',
      'B': 'bg-orange-100 text-orange-800',
      'C': 'bg-red-100 text-red-800'
    };
    return colors[grade] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Academic Results</h2>
          <p className="text-gray-600 dark:text-gray-400">View your grades and academic performance</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Download Transcript
        </Button>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">CGPA</p>
                <p className="text-2xl font-bold text-blue-600">{overallStats.cgpa}</p>
              </div>
              <Award className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Credits Completed</p>
                <p className="text-2xl font-bold text-green-600">{overallStats.completedCredits}</p>
              </div>
              <BookOpen className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Class Rank</p>
                <p className="text-2xl font-bold text-purple-600">{overallStats.rank}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Students</p>
                <p className="text-2xl font-bold text-orange-600">{overallStats.totalStudents}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Semester Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Semester {selectedSemester} Results</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">SGPA: {results[0].sgpa}</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Subject</th>
                  <th className="text-left p-2">Code</th>
                  <th className="text-left p-2">Credits</th>
                  <th className="text-left p-2">Marks</th>
                  <th className="text-left p-2">Grade</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {results[0].subjects.map((subject, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="p-2 font-medium">{subject.name}</td>
                    <td className="p-2 text-gray-600">{subject.code}</td>
                    <td className="p-2">{subject.credits}</td>
                    <td className="p-2">{subject.marks}/{subject.total}</td>
                    <td className="p-2">
                      <Badge className={getGradeColor(subject.grade)}>
                        {subject.grade}
                      </Badge>
                    </td>
                    <td className="p-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Results;
