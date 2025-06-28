
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
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile
} from "lucide-react";

const FacultyChat = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>('1');
  const [newMessage, setNewMessage] = useState('');

  const faculty = [
    {
      id: '1',
      name: 'Dr. Smith',
      subject: 'Database Systems',
      avatar: '/placeholder.svg',
      status: 'online',
      lastMessage: 'The assignment deadline has been extended to next Friday.',
      timestamp: '2 min ago',
      unread: 0
    },
    {
      id: '2',
      name: 'Prof. Johnson',
      subject: 'Machine Learning',
      avatar: '/placeholder.svg',
      status: 'offline',
      lastMessage: 'Please submit your project proposal by tomorrow.',
      timestamp: '1 hour ago',
      unread: 2
    },
    {
      id: '3',
      name: 'Dr. Wilson',
      subject: 'Software Engineering',
      avatar: '/placeholder.svg',
      status: 'online',
      lastMessage: 'The lab session is moved to room CS-105.',
      timestamp: '3 hours ago',
      unread: 1
    },
    {
      id: '4',
      name: 'Prof. Davis',
      subject: 'Computer Networks',
      avatar: '/placeholder.svg',
      status: 'away',
      lastMessage: 'Good work on the network analysis assignment!',
      timestamp: '1 day ago',
      unread: 0
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'Dr. Smith',
      content: 'Hello! I hope you\'re doing well with your database project.',
      timestamp: '10:30 AM',
      isFromFaculty: true
    },
    {
      id: 2,
      sender: 'You',
      content: 'Thank you, Professor! I have a question about the normalization process.',
      timestamp: '10:32 AM',
      isFromFaculty: false
    },
    {
      id: 3,
      sender: 'Dr. Smith',
      content: 'Of course! What specific aspect of normalization are you struggling with?',
      timestamp: '10:33 AM',
      isFromFaculty: true
    },
    {
      id: 4,
      sender: 'You',
      content: 'I\'m having trouble with the 3NF conversion. Could you help me understand the process better?',
      timestamp: '10:35 AM',
      isFromFaculty: false
    },
    {
      id: 5,
      sender: 'Dr. Smith',
      content: 'Certainly! Third Normal Form requires that all non-key attributes are fully functionally dependent on the primary key. Would you like to schedule a meeting to discuss this in detail?',
      timestamp: '10:40 AM',
      isFromFaculty: true
    },
    {
      id: 6,
      sender: 'Dr. Smith',
      content: 'The assignment deadline has been extended to next Friday.',
      timestamp: '11:15 AM',
      isFromFaculty: true
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
      alert('Message sent successfully!');
    }
  };

  const selectedFaculty = faculty.find(f => f.id === selectedChat);

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
        <h2 className="text-2xl font-bold mb-2">Faculty Chat</h2>
        <p className="text-gray-600 dark:text-gray-400">Communicate with your professors and instructors</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
        {/* Faculty List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Faculty</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search faculty..."
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {faculty.map((prof) => (
                <button
                  key={prof.id}
                  onClick={() => setSelectedChat(prof.id)}
                  className={`w-full flex items-center space-x-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                    selectedChat === prof.id ? 'bg-blue-50 dark:bg-blue-900/20 border-r-2 border-blue-600' : ''
                  }`}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={prof.avatar} alt={prof.name} />
                      <AvatarFallback>{prof.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(prof.status)}`}></div>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{prof.name}</h3>
                      {prof.unread > 0 && (
                        <Badge className="bg-red-500 text-white text-xs px-2 py-1">
                          {prof.unread}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{prof.subject}</p>
                    <p className="text-xs text-gray-500 truncate">{prof.lastMessage}</p>
                    <p className="text-xs text-gray-400">{prof.timestamp}</p>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2">
          {selectedFaculty ? (
            <>
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={selectedFaculty.avatar} alt={selectedFaculty.name} />
                        <AvatarFallback>{selectedFaculty.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(selectedFaculty.status)}`}></div>
                    </div>
                    <div>
                      <h3 className="font-semibold">{selectedFaculty.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{selectedFaculty.subject}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 p-4">
                <div className="space-y-4 h-96 overflow-y-auto mb-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isFromFaculty ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isFromFaculty 
                          ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100' 
                          : 'bg-blue-600 text-white'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.isFromFaculty ? 'text-gray-500' : 'text-blue-100'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center space-x-2 border-t pt-4">
                  <Button size="sm" variant="outline">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button size="sm" variant="outline">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Select a faculty member to start chatting</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default FacultyChat;
