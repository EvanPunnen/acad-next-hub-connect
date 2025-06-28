
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar,
  FileText,
  Plus,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  Upload
} from "lucide-react";

const LeaveApplication = () => {
  const [showForm, setShowForm] = useState(false);
  const [leaveData, setLeaveData] = useState({
    type: 'sick',
    fromDate: '',
    toDate: '',
    reason: '',
    attachment: null as File | null
  });

  const applications = [
    {
      id: 'LA001',
      type: 'Sick Leave',
      fromDate: '2024-01-20',
      toDate: '2024-01-22',
      days: 3,
      reason: 'Medical treatment for fever',
      status: 'approved',
      appliedOn: '2024-01-18',
      approvedBy: 'Dr. Smith',
      approvedOn: '2024-01-19'
    },
    {
      id: 'LA002',
      type: 'Personal Leave',
      fromDate: '2024-01-25',
      toDate: '2024-01-25',
      days: 1,
      reason: 'Family function attendance',
      status: 'pending',
      appliedOn: '2024-01-23',
      approvedBy: null,
      approvedOn: null
    },
    {
      id: 'LA003',
      type: 'Emergency Leave',
      fromDate: '2024-01-15',
      toDate: '2024-01-16',
      days: 2,
      reason: 'Family emergency',
      status: 'rejected',
      appliedOn: '2024-01-14',
      approvedBy: 'Prof. Johnson',
      approvedOn: '2024-01-15',
      remarks: 'Insufficient documentation provided'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Leave application submitted successfully!');
    setShowForm(false);
    setLeaveData({ type: 'sick', fromDate: '', toDate: '', reason: '', attachment: null });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLeaveData(prev => ({ ...prev, attachment: file }));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Leave Applications</h2>
          <p className="text-gray-600 dark:text-gray-400">Apply for leave and track your applications</p>
        </div>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Apply for Leave
        </Button>
      </div>

      {/* Leave Application Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>New Leave Application</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Leave Type</Label>
                  <select
                    id="type"
                    className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
                    value={leaveData.type}
                    onChange={(e) => setLeaveData(prev => ({ ...prev, type: e.target.value }))}
                    required
                  >
                    <option value="sick">Sick Leave</option>
                    <option value="personal">Personal Leave</option>
                    <option value="emergency">Emergency Leave</option>
                    <option value="medical">Medical Leave</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="fromDate">From Date</Label>
                  <Input
                    id="fromDate"
                    type="date"
                    value={leaveData.fromDate}
                    onChange={(e) => setLeaveData(prev => ({ ...prev, fromDate: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="toDate">To Date</Label>
                  <Input
                    id="toDate"
                    type="date"
                    value={leaveData.toDate}
                    onChange={(e) => setLeaveData(prev => ({ ...prev, toDate: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="attachment">Supporting Document</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="attachment"
                      type="file"
                      onChange={handleFileUpload}
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('attachment')?.click()}
                      className="w-full"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {leaveData.attachment ? leaveData.attachment.name : 'Upload Document'}
                    </Button>
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="reason">Reason for Leave</Label>
                <Textarea
                  id="reason"
                  placeholder="Please provide detailed reason for your leave application..."
                  value={leaveData.reason}
                  onChange={(e) => setLeaveData(prev => ({ ...prev, reason: e.target.value }))}
                  required
                  rows={4}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Submit Application
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Leave Statistics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Applications</p>
                <p className="text-2xl font-bold text-blue-600">{applications.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Approved</p>
                <p className="text-2xl font-bold text-green-600">
                  {applications.filter(app => app.status === 'approved').length}
                </p>
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
                <p className="text-2xl font-bold text-yellow-600">
                  {applications.filter(app => app.status === 'pending').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Days Used</p>
                <p className="text-2xl font-bold text-purple-600">
                  {applications.filter(app => app.status === 'approved').reduce((sum, app) => sum + app.days, 0)}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Applications List */}
      <Card>
        <CardHeader>
          <CardTitle>Leave Application History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {applications.map((application) => (
              <div key={application.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h3 className="font-semibold">{application.type}</h3>
                      <Badge className={getStatusColor(application.status)}>
                        {getStatusIcon(application.status)}
                        <span className="ml-1">{application.status.toUpperCase()}</span>
                      </Badge>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <p><strong>Duration:</strong> {application.fromDate} to {application.toDate}</p>
                        <p><strong>Days:</strong> {application.days}</p>
                      </div>
                      <div>
                        <p><strong>Applied On:</strong> {application.appliedOn}</p>
                        {application.approvedBy && (
                          <p><strong>Reviewed By:</strong> {application.approvedBy}</p>
                        )}
                      </div>
                      <div>
                        <p><strong>Application ID:</strong> {application.id}</p>
                        {application.approvedOn && (
                          <p><strong>Reviewed On:</strong> {application.approvedOn}</p>
                        )}
                      </div>
                    </div>
                    <div className="mt-2">
                      <p><strong>Reason:</strong> {application.reason}</p>
                      {application.remarks && (
                        <p className="text-red-600 mt-1"><strong>Remarks:</strong> {application.remarks}</p>
                      )}
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaveApplication;
