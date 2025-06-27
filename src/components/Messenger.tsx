
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Users, MessageSquare, Hash, Plus } from "lucide-react";

const Messenger = () => {
  const [selectedChat, setSelectedChat] = useState("cs-2024");
  const [message, setMessage] = useState("");

  const classGroups = [
    { id: "cs-2024", name: "Computer Science 2024", members: 45, unread: 3 },
    { id: "faculty-chat", name: "Faculty Discussion", members: 12, unread: 0 },
    { id: "project-team", name: "Final Year Project", members: 8, unread: 1 },
    { id: "study-group", name: "Study Group - DS", members: 15, unread: 2 }
  ];

  const messages = [
    {
      id: 1,
      sender: "John Doe",
      message: "Hey everyone! Did anyone get the assignment for Database Systems?",
      time: "10:30 AM",
      isOwn: false
    },
    {
      id: 2,
      sender: "You",
      message: "Yes, it's due next Friday. Working on it now.",
      time: "10:35 AM",
      isOwn: true
    },
    {
      id: 3,
      sender: "Sarah Wilson",
      message: "Can we form a study group for the upcoming exam?",
      time: "11:00 AM",
      isOwn: false
    },
    {
      id: 4,
      sender: "Prof. Smith",
      message: "Reminder: Lab session tomorrow at 2 PM in Room 101",
      time: "11:30 AM",
      isOwn: false,
      isFaculty: true
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="h-full flex">
      {/* Chat List */}
      <div className="w-80 border-r bg-background">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Class Groups</h3>
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-1" />
              New
            </Button>
          </div>
        </div>
        
        <div className="overflow-y-auto">
          {classGroups.map((group) => (
            <div
              key={group.id}
              className={`p-4 border-b cursor-pointer hover:bg-muted/50 ${
                selectedChat === group.id ? "bg-muted" : ""
              }`}
              onClick={() => setSelectedChat(group.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Hash className="h-4 w-4 mr-2 text-blue-600" />
                  <span className="font-medium">{group.name}</span>
                </div>
                {group.unread > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {group.unread}
                  </Badge>
                )}
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Users className="h-3 w-3 mr-1" />
                {group.members} members
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b bg-background">
          <div className="flex items-center">
            <Hash className="h-5 w-5 mr-2 text-blue-600" />
            <div>
              <h3 className="font-semibold">
                {classGroups.find(g => g.id === selectedChat)?.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {classGroups.find(g => g.id === selectedChat)?.members} members
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.isOwn
                    ? "bg-blue-600 text-white"
                    : msg.isFaculty
                    ? "bg-green-100 dark:bg-green-900 border-l-4 border-green-500"
                    : "bg-muted"
                }`}
              >
                {!msg.isOwn && (
                  <p className="text-xs font-semibold mb-1 text-blue-600 dark:text-blue-400">
                    {msg.sender}
                    {msg.isFaculty && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        Faculty
                      </Badge>
                    )}
                  </p>
                )}
                <p className="text-sm">{msg.message}</p>
                <p className="text-xs mt-1 opacity-70">{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t bg-background">
          <div className="flex space-x-2">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="sm">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
