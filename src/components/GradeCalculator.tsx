
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator, 
  Plus,
  Trash2,
  BookOpen,
  TrendingUp
} from "lucide-react";

interface Subject {
  id: number;
  name: string;
  credits: number;
  grade: string;
  gradePoints: number;
}

const GradeCalculator = () => {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: 1, name: "Data Structures", credits: 4, grade: "A", gradePoints: 9 },
    { id: 2, name: "Database Systems", credits: 3, grade: "B+", gradePoints: 8 },
    { id: 3, name: "Computer Networks", credits: 3, grade: "A-", gradePoints: 8.5 }
  ]);

  const [newSubject, setNewSubject] = useState({
    name: "",
    credits: "",
    grade: ""
  });

  const gradeScale = {
    "A+": 10,
    "A": 9,
    "A-": 8.5,
    "B+": 8,
    "B": 7,
    "B-": 6.5,
    "C+": 6,
    "C": 5,
    "C-": 4.5,
    "D": 4,
    "F": 0
  };

  const calculateGPA = () => {
    const totalCredits = subjects.reduce((sum, subject) => sum + subject.credits, 0);
    const totalGradePoints = subjects.reduce((sum, subject) => sum + (subject.credits * subject.gradePoints), 0);
    return totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : '0.00';
  };

  const addSubject = () => {
    if (newSubject.name && newSubject.credits && newSubject.grade) {
      const subject: Subject = {
        id: Date.now(),
        name: newSubject.name,
        credits: parseInt(newSubject.credits),
        grade: newSubject.grade,
        gradePoints: gradeScale[newSubject.grade as keyof typeof gradeScale] || 0
      };
      setSubjects([...subjects, subject]);
      setNewSubject({ name: "", credits: "", grade: "" });
    }
  };

  const removeSubject = (id: number) => {
    setSubjects(subjects.filter(subject => subject.id !== id));
  };

  const getGradeColor = (gradePoints: number) => {
    if (gradePoints >= 9) return 'bg-green-100 text-green-800';
    if (gradePoints >= 7) return 'bg-blue-100 text-blue-800';
    if (gradePoints >= 5) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const currentGPA = calculateGPA();
  const totalCredits = subjects.reduce((sum, subject) => sum + subject.credits, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Grade Calculator</h2>
        <p className="text-gray-600 dark:text-gray-400">Calculate your GPA and track academic performance</p>
      </div>

      {/* GPA Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Current GPA</p>
                <p className="text-3xl font-bold text-blue-600">{currentGPA}</p>
              </div>
              <Calculator className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Credits</p>
                <p className="text-3xl font-bold text-green-600">{totalCredits}</p>
              </div>
              <BookOpen className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Subjects</p>
                <p className="text-3xl font-bold text-purple-600">{subjects.length}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Subject Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Subject</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="subjectName">Subject Name</Label>
              <Input
                id="subjectName"
                placeholder="e.g., Mathematics"
                value={newSubject.name}
                onChange={(e) => setNewSubject({...newSubject, name: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="credits">Credits</Label>
              <Input
                id="credits"
                type="number"
                placeholder="e.g., 3"
                value={newSubject.credits}
                onChange={(e) => setNewSubject({...newSubject, credits: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="grade">Grade</Label>
              <select
                id="grade"
                className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
                value={newSubject.grade}
                onChange={(e) => setNewSubject({...newSubject, grade: e.target.value})}
              >
                <option value="">Select Grade</option>
                {Object.keys(gradeScale).map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <Button onClick={addSubject} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Subject
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subjects List */}
      <Card>
        <CardHeader>
          <CardTitle>Current Subjects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subjects.map((subject) => (
              <div key={subject.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold">{subject.name}</h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Credits: {subject.credits}
                    </span>
                    <Badge className={getGradeColor(subject.gradePoints)}>
                      {subject.grade} ({subject.gradePoints})
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeSubject(subject.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Grade Scale Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Grade Scale Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
            {Object.entries(gradeScale).map(([grade, points]) => (
              <div key={grade} className="text-center p-2 border rounded">
                <div className="font-semibold">{grade}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{points}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GradeCalculator;
