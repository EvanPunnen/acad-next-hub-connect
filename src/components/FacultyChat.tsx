
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { 
  Send,
  Phone,
  Video,
  MoreVertical,
  Search,
  Plus,
  Users,
  MessageSquare,
  PlusCircle,
  Paperclip,
  Smile
} from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'file' | 'announcement';
}

interface ChatGroup {
  id: string;
  name: string;
  type: 'department' | 'subject' | 'admin' | 'general';
  memberCount: number;
  lastMessage?: Message;
  unreadCount: number;
  avatar?: string;
}

const FacultyChat = () => {
  const [selectedChat, setSelectedChat] = useState<string>('');
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const [chatGroups] = useState<ChatGroup[]>([
    {
      id: '1',
      name: 'Computer Science Faculty',
      type: 'department',
      memberCount: 12,
      unreadCount: 3,
      lastMessage: {
        id: '1',
        senderId: '2',
        senderName: 'Dr. Smith',
        content: 'Meeting tomorrow at 10 AM',
        timestamp: new Date(Date.now() - 300000),
        type: 'text'
      }
    },
    {
      id: '2',
      name: 'Database Systems Teachers',
      type: 'subject',
      memberCount: 4,
      unreadCount: 1,
      lastMessage: {
        id: '2',
        senderId: '3',
        senderName: 'Prof. Johnson',
        content: 'Updated syllabus shared',
        timestamp: new Date(Date.now() - 600000),
        type: 'text'
      }
    },
    {
      id: '3',
      name: 'Administration',
      type: 'admin',
      memberCount: 8,
      unreadCount: 0,
      lastMessage: {
        id: '3',
        senderId: '4',
        senderName: 'Admin Office',
        content: 'Holiday notice for next week',
        timestamp: new Date(Date.now() - 3600000),
        type: 'announcement'
      }
    },
    {
      id: '4',
      name: 'General Faculty',
      type: 'general',
      memberCount: 45,
      unreadCount: 5,
      lastMessage: {
        id: '4',
        senderId: '5',
        senderName: 'Dr. Wilson',
        content: 'Welcome new faculty members!',
        timestamp: new Date(Date.now() - 7200000),
        type: 'text'
      }
    }
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: '2',
      senderName: 'Dr. Smith',
      content: 'Good morning everyone! Hope you all are doing well.',
      timestamp: new Date(Date.now() - 3600000),
      type: 'text'
    },
    {
      id: '2',
      senderId: '3',
      senderName: 'Prof. Johnson',
      content: 'The new semester guidelines have been uploaded to the portal.',
      timestamp: new Date(Date.now() - 1800000),
      type: 'text'
    },
    {
      id: '3',
      senderId: '1',
      senderName: 'You',
      content: 'Thanks for sharing! I\'ll review them today.',
      timestamp: new Date(Date.now() - 900000),
      type: 'text'
    },
    {
      id: '4',
      senderId: '4',
      senderName: 'Dr. Brown',
      content: 'Meeting scheduled for tomorrow at 10 AM in Conference Room A.',
      timestamp: new Date(Date.now() - 300000),
      type: 'announcement'
    }
  ]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!message.trim() || !selectedChat) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: '1',
      senderName: 'You',
      content: message.trim(),
      timestamp: new Date(),
      type: 'text'
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    toast({
      title: "Message Sent",
      description: "Your message has been delivered to the group"
    });
  };

  const getGroupTypeColor = (type: string) => {
    switch (type) {
      case 'department': return 'bg-blue-100 text-blue-800';
      case 'subject': return 'bg-green-100 text-green-800';
      case 'admin': return 'bg-red-100 text-red-800';
      case 'general': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const filteredChats = chatGroups.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedChatData = chatGroups.find(chat => chat.id === selectedChat);

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-4">
      {/* Chat List Sidebar */}
      <div className="w-80 flex flex-col">
        <Card className="flex-1">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Faculty Groups</CardTitle>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search groups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-y-auto">
            <div className="space-y-1">
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 border-b transition-colors ${
                    selectedChat === chat.id ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={chat.avatar} alt={chat.name} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                          {chat.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-sm truncate">{chat.name}</h3>
                          {chat.unreadCount > 0 && (
                            <Badge className="bg-red-500 text-white text-xs ml-2">
                              {chat.unreadCount}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <Badge className={getGroupTypeColor(chat.type)} variant="secondary">
                            {chat.type}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            <Users className="h-3 w-3 inline mr-1" />
                            {chat.memberCount}
                          </span>
                        </div>
                        {chat.lastMessage && (
                          <p className="text-xs text-gray-600 mt-1 truncate">
                            <span className="font-medium">{chat.lastMessage.senderName}:</span> {chat.lastMessage.content}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <Card className="flex-1 flex flex-col">
            {/* Chat Header */}
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={selectedChatData?.avatar} alt={selectedChatData?.name} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {selectedChatData?.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{selectedChatData?.name}</h3>
                    <p className="text-sm text-gray-600">
                      {selectedChatData?.memberCount} members • 
                      <Badge className={getGroupTypeColor(selectedChatData?.type || 'general')} variant="secondary">
                        {selectedChatData?.type}
                      </Badge>
                    </p>
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

            {/* Messages Area */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.senderId === '1' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md ${msg.senderId === '1' ? 'order-2' : 'order-1'}`}>
                    <div className={`flex items-end space-x-2 ${msg.senderId === '1' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      {msg.senderId !== '1' && (
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs bg-gray-200">
                            {msg.senderName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        <div className={`px-4 py-2 rounded-lg ${
                          msg.senderId === '1' 
                            ? 'bg-blue-500 text-white' 
                            : msg.type === 'announcement'
                            ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          {msg.senderId !== '1' && (
                            <p className="text-xs font-semibold mb-1 opacity-75">{msg.senderName}</p>
                          )}
                          <p className="text-sm">{msg.content}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 px-1">
                          {formatDate(msg.timestamp)} {formatTime(msg.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </CardContent>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Smile className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!message.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Select a Group</h3>
              <p className="text-gray-600">Choose a faculty group to start messaging</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FacultyChat;
