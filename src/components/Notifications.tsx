
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Bell, 
  Calendar,
  AlertCircle,
  CheckCircle,
  Info,
  X,
  Eye,
  Clock,
  User,
  BookOpen
} from "lucide-react";

const Notifications = () => {
  const [filter, setFilter] = useState('all');

  const notifications = [
    {
      id: 1,
      type: 'assignment',
      title: 'New Assignment Posted',
      message: 'Dr. Smith has posted a new assignment for Database Systems. Due date: January 25, 2024',
      timestamp: '5 minutes ago',
      isRead: false,
      priority: 'high',
      from: 'Dr. Smith',
      avatar: '/placeholder.svg'
    },
    {
      id: 2,
      type: 'grade',
      title: 'Grade Published',
      message: 'Your grade for Machine Learning Project has been published. Grade: A',
      timestamp: '1 hour ago',
      isRead: false,
      priority: 'medium',
      from: 'Prof. Johnson',
      avatar: '/placeholder.svg'
    },
    {
      id: 3,
      type: 'announcement',
      title: 'Class Rescheduled',
      message: 'Software Engineering class on January 18 has been moved to CS-105 at 2:00 PM',
      timestamp: '2 hours ago',
      isRead: true,
      priority: 'medium',
      from: 'Dr. Wilson',
      avatar: '/placeholder.svg'
    },
    {
      id: 4,
      type: 'fee',
      title: 'Fee Payment Reminder',
      message: 'Your semester fee payment is due on January 20, 2024. Amount: ₹25,000',
      timestamp: '1 day ago',
      isRead: false,
      priority: 'high',
      from: 'Accounts Department',
      avatar: '/placeholder.svg'
    },
    {
      id: 5,
      type: 'event',
      title: 'Tech Fest Registration',
      message: 'Registration is now open for the Annual Tech Fest. Last date: January 30, 2024',
      timestamp: '2 days ago',
      isRead: true,
      priority: 'low',
      from: 'Student Activities',
      avatar: '/placeholder.svg'
    },
    {
      id: 6,
      type: 'library',
      title: 'Book Due Reminder',
      message: 'The book "Advanced Database Systems" is due for return on January 22, 2024',
      timestamp: '3 days ago',
      isRead: false,
      priority: 'medium',
      from: 'Library',
      avatar: '/placeholder.svg'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'assignment': return <BookOpen className="h-5 w-5" />;
      case 'grade': return <CheckCircle className="h-5 w-5" />;
      case 'announcement': return <Info className="h-5 w-5" />;
      case 'fee': return <AlertCircle className="h-5 w-5" />;
      case 'event': return <Calendar className="h-5 w-5" />;
      case 'library': return <BookOpen className="h-5 w-5" />;
      default: return <Bell className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'assignment': return 'text-blue-600 bg-blue-100';
      case 'grade': return 'text-green-600 bg-green-100';
      case 'announcement': return 'text-purple-600 bg-purple-100';
      case 'fee': return 'text-red-600 bg-red-100';
      case 'event': return 'text-orange-600 bg-orange-100';
      case 'library': return 'text-indigo-600 bg-indigo-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.isRead;
    return notification.type === filter;
  });

  const handleMarkAsRead = (id: number) => {
    console.log(`Marking notification ${id} as read`);
    alert('Notification marked as read');
  };

  const handleDelete = (id: number) => {
    console.log(`Deleting notification ${id}`);
    alert('Notification deleted');
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const stats = {
    total: notifications.length,
    unread: unreadCount,
    high: notifications.filter(n => n.priority === 'high').length,
    today: notifications.filter(n => n.timestamp.includes('hour') || n.timestamp.includes('minute')).length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Notifications</h2>
          <p className="text-gray-600 dark:text-gray-400">Stay updated with important announcements and alerts</p>
        </div>
        <Button variant="outline">
          <CheckCircle className="h-4 w-4 mr-2" />
          Mark All Read
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
              <Bell className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Unread</p>
                <p className="text-2xl font-bold text-red-600">{stats.unread}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">High Priority</p>
                <p className="text-2xl font-bold text-orange-600">{stats.high}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Today</p>
                <p className="text-2xl font-bold text-green-600">{stats.today}</p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        <Button 
          variant={filter === 'unread' ? 'default' : 'outline'}
          onClick={() => setFilter('unread')}
        >
          Unread ({unreadCount})
        </Button>
        <Button 
          variant={filter === 'assignment' ? 'default' : 'outline'}
          onClick={() => setFilter('assignment')}
        >
          Assignments
        </Button>
        <Button 
          variant={filter === 'grade' ? 'default' : 'outline'}
          onClick={() => setFilter('grade')}
        >
          Grades
        </Button>
        <Button 
          variant={filter === 'announcement' ? 'default' : 'outline'}
          onClick={() => setFilter('announcement')}
        >
          Announcements
        </Button>
        <Button 
          variant={filter === 'fee' ? 'default' : 'outline'}
          onClick={() => setFilter('fee')}
        >
          Fees
        </Button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <Card key={notification.id} className={`hover:shadow-md transition-shadow ${!notification.isRead ? 'border-l-4 border-l-blue-600' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg ${getTypeColor(notification.type)}`}>
                  {getTypeIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className={`font-semibold ${!notification.isRead ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                          {notification.title}
                        </h3>
                        <Badge className={getPriorityColor(notification.priority)}>
                          {notification.priority}
                        </Badge>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        {notification.message}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {notification.from}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {notification.timestamp}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      {!notification.isRead && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Mark Read
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(notification.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredNotifications.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No notifications found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {filter === 'unread' 
                ? 'You\'re all caught up! No unread notifications.'
                : 'No notifications match your current filter.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Notifications;
