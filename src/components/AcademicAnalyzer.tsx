
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  BookOpen, 
  Clock, 
  Award, 
  AlertTriangle,
  CheckCircle,
  Brain,
  BarChart3
} from "lucide-react";

const AcademicAnalyzer = () => {
  // Mock data for academic analysis
  const academicData = {
    overallGrade: 'B+',
    cgpa: 7.8,
    attendance: 87,
    assignmentsCompleted: 85,
    trend: 'improving',
    riskLevel: 'low',
    predictions: {
      nextSemesterCGPA: 8.2,
      graduationCGPA: 8.0,
      improvementAreas: ['Mathematics', 'Physics Lab']
    }
  };

  const subjectAnalysis = [
    {
      subject: 'Data Structures',
      currentGrade: 'A',
      attendance: 92,
      assignments: 100,
      trend: 'stable',
      prediction: 'A',
      strengths: ['Problem Solving', 'Implementation'],
      improvements: []
    },
    {
      subject: 'Mathematics',
      currentGrade: 'B',
      attendance: 78,
      assignments: 70,
      trend: 'declining',
      prediction: 'B-',
      strengths: ['Basic Concepts'],
      improvements: ['Attendance', 'Practice Problems']
    },
    {
      subject: 'Database Systems',
      currentGrade: 'A-',
      attendance: 95,
      assignments: 90,
      trend: 'improving',
      prediction: 'A',
      strengths: ['SQL Queries', 'Theory'],
      improvements: ['Advanced Topics']
    },
    {
      subject: 'Physics Lab',
      currentGrade: 'C+',
      attendance: 85,
      assignments: 60,
      trend: 'declining',
      prediction: 'C',
      strengths: ['Basic Experiments'],
      improvements: ['Lab Reports', 'Practical Skills']
    }
  ];

  const recommendations = [
    {
      type: 'urgent',
      title: 'Improve Mathematics Performance',
      description: 'Attend extra classes and solve more practice problems',
      impact: 'High',
      timeline: '2 weeks'
    },
    {
      type: 'important',
      title: 'Physics Lab Assignments',
      description: 'Complete pending lab reports to improve grades',
      impact: 'Medium',
      timeline: '1 week'
    },
    {
      type: 'suggestion',
      title: 'Maintain Data Structures Performance',
      description: 'Continue current study pattern for consistent results',
      impact: 'Low',
      timeline: 'Ongoing'
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'declining': return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <Target className="h-4 w-4 text-blue-600" />;
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600';
    if (grade.startsWith('B')) return 'text-blue-600';
    if (grade.startsWith('C')) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRecommendationType = (type: string) => {
    switch (type) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'important': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 flex items-center">
          <Brain className="h-6 w-6 mr-2" />
          AI Academic Analyzer
        </h2>
        <p className="text-gray-600 dark:text-gray-400">AI-powered insights into your academic performance</p>
      </div>

      {/* Overall Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Award className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Overall Grade</p>
            <p className="text-2xl font-bold">{academicData.overallGrade}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <BarChart3 className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <p className="text-sm text-gray-600 dark:text-gray-400">CGPA</p>
            <p className="text-2xl font-bold">{academicData.cgpa}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Attendance</p>
            <p className="text-2xl font-bold">{academicData.attendance}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Assignments</p>
            <p className="text-2xl font-bold">{academicData.assignmentsCompleted}%</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2" />
            AI Predictions & Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100">Next Semester Prediction</h4>
              <p className="text-2xl font-bold text-blue-600">CGPA {academicData.predictions.nextSemesterCGPA}</p>
              <p className="text-sm text-blue-700 dark:text-blue-300">Based on current performance trend</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-semibold text-green-900 dark:text-green-100">Graduation Goal</h4>
              <p className="text-2xl font-bold text-green-600">CGPA {academicData.predictions.graduationCGPA}</p>
              <p className="text-sm text-green-700 dark:text-green-300">Achievable with consistent effort</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subject-wise Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2" />
            Subject-wise Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subjectAnalysis.map((subject, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">{subject.subject}</h4>
                    <div className="flex items-center gap-4 mt-1">
                      <span className={`font-bold ${getGradeColor(subject.currentGrade)}`}>
                        {subject.currentGrade}
                      </span>
                      {getTrendIcon(subject.trend)}
                      <span className="text-sm text-gray-600">
                        Predicted: {subject.prediction}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-sm text-gray-600">Attendance</p>
                    <Progress value={subject.attendance} className="mt-1" />
                    <p className="text-xs text-gray-500">{subject.attendance}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Assignments</p>
                    <Progress value={subject.assignments} className="mt-1" />
                    <p className="text-xs text-gray-500">{subject.assignments}%</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div>
                    <p className="text-sm font-medium text-green-700 dark:text-green-300">Strengths:</p>
                    <div className="flex gap-1 flex-wrap">
                      {subject.strengths.map((strength, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {strength}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {subject.improvements.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-red-700 dark:text-red-300">Needs Improvement:</p>
                      <div className="flex gap-1 flex-wrap">
                        {subject.improvements.map((improvement, i) => (
                          <Badge key={i} variant="destructive" className="text-xs">
                            {improvement}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold">{rec.title}</h4>
                  <Badge className={getRecommendationType(rec.type)}>
                    {rec.type.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3">{rec.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span>Impact: <strong>{rec.impact}</strong></span>
                  <span>Timeline: <strong>{rec.timeline}</strong></span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button className="w-full md:w-auto">
              Get Detailed Study Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AcademicAnalyzer;
