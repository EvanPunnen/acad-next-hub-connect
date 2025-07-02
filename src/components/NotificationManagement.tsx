
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
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { 
  Plus,
  Bell,
  Send,
  Users,
  AlertCircle,
  Info,
  CheckCircle,
  XCircle
} from "lucide-react";

const NotificationManagement = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    type: 'info',
    target: 'all'
  });

  useEffect(() => {
    fetchStudents();
  }, [user]);

  const fetchStudents = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('students')
        .select('id, full_name, student_id, department, year, semester')
        .eq('faculty_id', user.id)
        .order('full_name', { ascending: true });

      if (error) throw error;
      setStudents(data || []);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast({
        title: "Error",
        description: "Failed to fetch students",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendNotification = async () => {
    if (!user) return;

    try {
      let recipients = [];

      if (newNotification.target === 'all') {
        recipients = students.map(student => ({
          user_id: student.id,
          title: newNotification.title,
          message: newNotification.message,
          type: newNotification.type
        }));
      } else {
        // Filter by department, year, or semester based on target
        const targetStudents = students.filter(student => {
          if (newNotification.target.startsWith('dept-')) {
            return student.department === newNotification.target.replace('dept-', '');
          } else if (newNotification.target.startsWith('year-')) {
            return student.year === parseInt(newNotification.target.replace('year-', ''));
          } else if (newNotification.target.startsWith('sem-')) {
            return student.semester === parseInt(newNotification.target.replace('sem-', ''));
          }
          return false;
        });

        recipients = targetStudents.map(student => ({
          user_id: student.id,
          title: newNotification.title,
          message: newNotification.message,
          type: newNotification.type
        }));
      }

      if (recipients.length === 0) {
        toast({
          title: "Warning",
          description: "No recipients found for the selected target",
          variant: "destructive"
        });
        return;
      }

      const { error } = await supabase
        .from('notifications')
        .insert(recipients);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Notification sent to ${recipients.length} student(s)`
      });

      setIsAddModalOpen(false);
      setNewNotification({
        title: '',
        message: '',
        type: 'info',
        target: 'all'
      });
    } catch (error) {
      console.error('Error sending notification:', error);
      toast({
        title: "Error",
        description: "Failed to send notification",
        variant: "destructive"
      });
    }
  };

  const getNotificationTypeIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getNotificationTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getTargetCount = () => {
    if (newNotification.target === 'all') {
      return students.length;
    } else if (newNotification.target.startsWith('dept-')) {
      const dept = newNotification.target.replace('dept-', '');
      return students.filter(s => s.department === dept).length;
    } else if (newNotification.target.startsWith('year-')) {
      const year = parseInt(newNotification.target.replace('year-', ''));
      return students.filter(s => s.year === year).length;
    } else if (newNotification.target.startsWith('sem-')) {
      const sem = parseInt(newNotification.target.replace('sem-', ''));
      return students.filter(s => s.semester === sem).length;
    }
    return 0;
  };

  const uniqueDepartments = [...new Set(students.map(s => s.department))];
  const uniqueYears = [...new Set(students.map(s => s.year))].sort();
  const uniqueSemesters = [...new Set(students.map(s => s.semester))].sort();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Notification Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Send notifications to your students</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Send Notification
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Send New Notification</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newNotification.title}
                  onChange={(e) => setNewNotification({...newNotification, title: e.target.value})}
                  placeholder="Enter notification title"
                />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={newNotification.message}
                  onChange={(e) => setNewNotification({...newNotification, message: e.target.value})}
                  placeholder="Enter notification message"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Notification Type</Label>
                  <Select value={newNotification.type} onValueChange={(value) => setNewNotification({...newNotification, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="info">
                        <div className="flex items-center space-x-2">
                          <Info className="h-4 w-4 text-blue-500" />
                          <span>Information</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="success">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Success</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="warning">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="h-4 w-4 text-yellow-500" />
                          <span>Warning</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="error">
                        <div className="flex items-center space-x-2">
                          <XCircle className="h-4 w-4 text-red-500" />
                          <span>Error</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="target">Send To</Label>
                  <Select value={newNotification.target} onValueChange={(value) => setNewNotification({...newNotification, target: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select recipients" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Students ({students.length})</SelectItem>
                      {uniqueDepartments.map(dept => (
                        <SelectItem key={dept} value={`dept-${dept}`}>
                          {dept} Department ({students.filter(s => s.department === dept).length})
                        </SelectItem>
                      ))}
                      {uniqueYears.map(year => (
                        <SelectItem key={year} value={`year-${year}`}>
                          Year {year} ({students.filter(s => s.year === year).length})
                        </SelectItem>
                      ))}
                      {uniqueSemesters.map(sem => (
                        <SelectItem key={sem} value={`sem-${sem}`}>
                          Semester {sem} ({students.filter(s => s.semester === sem).length})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getNotificationTypeIcon(newNotification.type)}
                    <span className="font-medium">{newNotification.title || 'Notification Title'}</span>
                    <Badge className={getNotificationTypeColor(newNotification.type)}>
                      {newNotification.type}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Users className="h-4 w-4" />
                    <span>{getTargetCount()} recipients</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {newNotification.message || 'Your notification message will appear here...'}
                </p>
              </div>

              <Button 
                onClick={handleSendNotification} 
                className="w-full"
                disabled={!newNotification.title || !newNotification.message}
              >
                <Send className="h-4 w-4 mr-2" />
                Send to {getTargetCount()} Student(s)
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Students</p>
                <p className="text-2xl font-bold text-blue-600">{students.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Departments</p>
                <p className="text-2xl font-bold text-green-600">{uniqueDepartments.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                <Bell className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Academic Years</p>
                <p className="text-2xl font-bold text-purple-600">{uniqueYears.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                <Bell className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Quick Send</p>
                <Button 
                  size="sm" 
                  onClick={() => setIsAddModalOpen(true)}
                  className="mt-1"
                >
                  <Send className="h-4 w-4 mr-1" />
                  Notify
                </Button>
              </div>
              <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                <Send className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">By Department</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {uniqueDepartments.map(dept => (
                  <div key={dept} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <span className="text-sm">{dept}</span>
                    <Badge variant="outline">
                      {students.filter(s => s.department === dept).length}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">By Year</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {uniqueYears.map(year => (
                  <div key={year} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <span className="text-sm">Year {year}</span>
                    <Badge variant="outline">
                      {students.filter(s => s.year === year).length}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationManagement;
