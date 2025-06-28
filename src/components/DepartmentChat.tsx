
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Send,
  Search,
  Pin,
  Users,
  Bell,
  Calendar,
  FileText,
  Download
} from "lucide-react";

const DepartmentChat = () => {
  const [selectedChannel, setSelectedChannel] = useState('general');
  const [newMessage, setNewMessage] = useState('');

  const channels = [
    { id: 'general', name: 'General Discussion', members: 12, unread: 2 },
    { id: 'announcements', name: 'Department Announcements', members: 12, unread: 1 },
    { id: 'meetings', name: 'Meeting Discussions', members: 8, unread: 0 },
    { id: 'research', name: 'Research Collaboration', members: 6, unread: 3 },
    { id: 'events', name: 'Events & Activities', members: 10, unread: 0 }
  ];

  const faculty = [
    { id: 1, name: 'Dr. Smith', designation: 'HOD', status: 'online', avatar: '/placeholder.svg' },
    { id: 2, name: 'Prof. Johnson', designation: 'Professor', status: 'online', avatar: '/placeholder.svg' },
    { id: 3, name: 'Dr. Wilson', designation: 'Asst. Professor', status: 'away', avatar: '/placeholder.svg' },
    { id: 4, name: 'Prof. Davis', designation: 'Professor', status: 'offline', avatar: '/placeholder.svg' },
    { id: 5, name: 'Dr. Brown', designation: 'Lecturer', status: 'online', avatar: '/placeholder.svg' }
  ];

  const messages = [
    {
      id: 1,
      sender: 'Dr. Smith',
      content: 'Good morning everyone! Please review the new curriculum guidelines shared yesterday.',
      timestamp: '09:15 AM',
      pinned: true,
      type: 'announcement'
    },
    {
      id: 2,
      sender: 'Prof. Johnson',
      content: 'The machine learning lab equipment has arrived. We can start the advanced practicals next week.',
      timestamp: '09:30 AM',
      pinned: false,
      type: 'message'
    },
    {
      id: 3,
      sender: 'Dr. Wilson',
      content: 'Great news! I\'ll update the lab schedule accordingly.',
      timestamp: '09:32 AM',
      pinned: false,
      type: 'message'
    },
    {
      id: 4,
      sender: 'You',
      content: 'Should we schedule a faculty meeting to discuss the implementation?',
      timestamp: '09:35 AM',
      pinned: false,
      type: 'message'
    },
    {
      id: 5,
      sender: 'Dr. Smith',
      content: 'Yes, let\'s meet tomorrow at 2 PM in the conference room.',
      timestamp: '09:40 AM',
      pinned: false,
      type: 'message'
    }
  ];

  const announcements = [
    {
      id: 1,
      title: 'New Academic Calendar Released',
      content: 'The academic calendar for the upcoming semester has been published.',
      author: 'Dr. Smith',
      date: '2024-01-15',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Faculty Development Program',
      content: 'Registration open for the upcoming FDP on AI and Machine Learning.',
      author: 'Admin',
      date: '2024-01-14',
      priority: 'medium'
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
      alert('Message sent successfully!');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Department Communication</h2>
        <p className="text-gray-600 dark:text-gray-400">Chat with faculty and view department announcements</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {/* Channels */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Channels
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {channels.map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => setSelectedChannel(channel.id)}
                    className={`w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                      selectedChannel === channel.id ? 'bg-blue-50 dark:bg-blue-900/20 border-r-2 border-blue-600' : ''
                    }`}
                  >
                    <div className="text-left">
                      <p className="font-medium text-sm"># {channel.name}</p>
                      <p className="text-xs text-gray-500">{channel.members} members</p>
                    </div>
                    {channel.unread > 0 && (
                      <Badge className="bg-red-500 text-white text-xs px-2 py-1">
                        {channel.unread}
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Online Faculty */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Faculty Online
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-2 p-3">
                {faculty.filter(f => f.status === 'online').map((member) => (
                  <div key={member.id} className="flex items-center space-x-2">
                    <div className="relative">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="text-xs">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-white ${getStatusColor(member.status)}`}></div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-xs text-gray-500">{member.designation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Chat Area */}
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">
                    # {channels.find(c => c.id === selectedChannel)?.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    {channels.find(c => c.id === selectedChannel)?.members} members
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline">
                    <Pin className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Bell className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 p-4 overflow-hidden flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {selectedChannel === 'announcements' ? (
                  <div className="space-y-4">
                    {announcements.map((announcement) => (
                      <div key={announcement.id} className="p-4 border border-orange-200 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-orange-800 dark:text-orange-200">
                              {announcement.title}
                            </h4>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                              {announcement.content}
                            </p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-xs text-gray-500">By {announcement.author}</span>
                              <span className="text-xs text-gray-500">{announcement.date}</span>
                            </div>
                          </div>
                          <Badge className={
                            announcement.priority === 'high' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }>
                            {announcement.priority.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  messages.map((message) => (
                    <div key={message.id} className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md ${
                        message.sender === 'You' 
                          ? 'bg-blue-600 text-white' 
                          : message.pinned 
                            ? 'bg-yellow-50 border border-yellow-200 text-gray-900'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                      } px-4 py-2 rounded-lg`}>
                        {message.sender !== 'You' && (
                          <p className="text-xs font-semibold mb-1 opacity-75">
                            {message.sender}
                            {message.pinned && <Pin className="h-3 w-3 inline ml-1" />}
                          </p>
                        )}
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 opacity-75`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <div className="flex items-center space-x-2 border-t pt-4">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DepartmentChat;
