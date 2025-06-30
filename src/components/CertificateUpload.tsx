import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Upload,
  FileText,
  Plus,
  Eye,
  Download,
  CheckCircle,
  Clock,
  XCircle,
  Award,
  LogOut,
  Home
} from "lucide-react";
import FileUploader from "@/components/FileUploader";
import ThemeToggle from "@/components/ThemeToggle";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";

const CertificateUpload = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [certificateData, setCertificateData] = useState({
    type: 'academic',
    title: '',
    issuer: '',
    issueDate: '',
    description: '',
    file: null as File | null
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const certificates = [
    {
      id: 'CERT001',
      type: 'Academic',
      title: 'Machine Learning Certification',
      issuer: 'Coursera - Stanford University',
      issueDate: '2024-01-15',
      uploadDate: '2024-01-16',
      status: 'verified',
      verifiedBy: 'Dr. Smith',
      verifiedOn: '2024-01-17',
      description: 'Completed advanced machine learning course with distinction',
      fileName: 'ml_certificate.pdf'
    },
    {
      id: 'CERT002',
      type: 'Competition',
      title: 'Hackathon Winner Certificate',
      issuer: 'TechFest 2024',
      issueDate: '2024-01-10',
      uploadDate: '2024-01-12',
      status: 'pending',
      verifiedBy: null,
      verifiedOn: null,
      description: 'First place in AI/ML category at national level hackathon',
      fileName: 'hackathon_winner.jpg'
    },
    {
      id: 'CERT003',
      type: 'Training',
      title: 'AWS Cloud Practitioner',
      issuer: 'Amazon Web Services',
      issueDate: '2023-12-20',
      uploadDate: '2023-12-22',
      status: 'rejected',
      verifiedBy: 'Prof. Johnson',
      verifiedOn: '2023-12-23',
      description: 'AWS Cloud fundamentals certification',
      fileName: 'aws_cert.pdf',
      remarks: 'Certificate appears to be modified. Please upload original.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Certificate uploaded successfully! It will be reviewed by faculty.');
    setShowForm(false);
    setCertificateData({
      type: 'academic',
      title: '',
      issuer: '',
      issueDate: '',
      description: '',
      file: null
    });
  };

  const handleFileSelect = (file: File) => {
    setCertificateData(prev => ({ ...prev, file }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'academic': return 'bg-blue-100 text-blue-800';
      case 'competition': return 'bg-purple-100 text-purple-800';
      case 'training': return 'bg-orange-100 text-orange-800';
      case 'internship': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navigation */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Button>
            </Link>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Certificate Management</h1>
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="flex items-center space-x-2 text-red-600 hover:text-red-700"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 pb-20 md:pb-4">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Certificate Management</h2>
              <p className="text-gray-600 dark:text-gray-400">Upload and manage your certificates and achievements</p>
            </div>
            <Button 
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Upload Certificate
            </Button>
          </div>

          {/* Certificate Upload Form */}
          {showForm && (
            <Card>
              <CardHeader>
                <CardTitle>Upload New Certificate</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="type">Certificate Type</Label>
                      <select
                        id="type"
                        className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
                        value={certificateData.type}
                        onChange={(e) => setCertificateData(prev => ({ ...prev, type: e.target.value }))}
                        required
                      >
                        <option value="academic">Academic Certificate</option>
                        <option value="competition">Competition Certificate</option>
                        <option value="training">Training Certificate</option>
                        <option value="internship">Internship Certificate</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="title">Certificate Title</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Machine Learning Certification"
                        value={certificateData.title}
                        onChange={(e) => setCertificateData(prev => ({ ...prev, title: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="issuer">Issuing Organization</Label>
                      <Input
                        id="issuer"
                        placeholder="e.g., Coursera, IEEE, etc."
                        value={certificateData.issuer}
                        onChange={(e) => setCertificateData(prev => ({ ...prev, issuer: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="issueDate">Issue Date</Label>
                      <Input
                        id="issueDate"
                        type="date"
                        value={certificateData.issueDate}
                        onChange={(e) => setCertificateData(prev => ({ ...prev, issueDate: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of the certificate and achievements..."
                      value={certificateData.description}
                      onChange={(e) => setCertificateData(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                    />
                  </div>
                  
                  <FileUploader
                    onFileSelect={handleFileSelect}
                    label="Certificate File"
                    acceptedTypes=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    maxSize={5}
                    allowCamera={true}
                  />

                  <div className="flex justify-end space-x-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      Upload Certificate
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Certificate Statistics */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Certificates</p>
                    <p className="text-2xl font-bold text-blue-600">{certificates.length}</p>
                  </div>
                  <Award className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Verified</p>
                    <p className="text-2xl font-bold text-green-600">
                      {certificates.filter(cert => cert.status === 'verified').length}
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
                    <p className="text-sm text-gray-600 dark:text-gray-400">Pending Review</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {certificates.filter(cert => cert.status === 'pending').length}
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
                    <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
                    <p className="text-2xl font-bold text-purple-600">2</p>
                  </div>
                  <Upload className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Certificates List */}
          <Card>
            <CardHeader>
              <CardTitle>Your Certificates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {certificates.map((certificate) => (
                  <div key={certificate.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <h3 className="font-semibold">{certificate.title}</h3>
                          <Badge className={getTypeColor(certificate.type)}>
                            {certificate.type.toUpperCase()}
                          </Badge>
                          <Badge className={getStatusColor(certificate.status)}>
                            {getStatusIcon(certificate.status)}
                            <span className="ml-1">{certificate.status.toUpperCase()}</span>
                          </Badge>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600 mb-2">
                          <div>
                            <p><strong>Issuer:</strong> {certificate.issuer}</p>
                            <p><strong>Issue Date:</strong> {certificate.issueDate}</p>
                          </div>
                          <div>
                            <p><strong>Uploaded:</strong> {certificate.uploadDate}</p>
                            {certificate.verifiedBy && (
                              <p><strong>Verified By:</strong> {certificate.verifiedBy}</p>
                            )}
                          </div>
                          <div>
                            <p><strong>File:</strong> {certificate.fileName}</p>
                            <p><strong>ID:</strong> {certificate.id}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                          {certificate.description}
                        </p>
                        {certificate.remarks && (
                          <p className="text-sm text-red-600 bg-red-50 p-2 rounded">
                            <strong>Remarks:</strong> {certificate.remarks}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
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

export default CertificateUpload;
