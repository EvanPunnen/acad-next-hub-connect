
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  MapPin, 
  Clock,
  Users,
  Star,
  Plus
} from "lucide-react";

const Events = () => {
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([1]);

  const upcomingEvents = [
    {
      id: 1,
      title: "Tech Fest 2024",
      description: "Annual technical festival with competitions and workshops",
      date: "2024-02-15",
      time: "09:00 AM",
      venue: "Main Auditorium",
      category: "Technical",
      registrationFee: 500,
      maxParticipants: 200,
      currentParticipants: 157,
      organizer: "CSE Department"
    },
    {
      id: 2,
      title: "Cultural Night",
      description: "Evening of music, dance, and cultural performances",
      date: "2024-02-20",
      time: "06:00 PM",
      venue: "College Ground",
      category: "Cultural",
      registrationFee: 0,
      maxParticipants: 500,
      currentParticipants: 234,
      organizer: "Student Council"
    },
    {
      id: 3,
      title: "Placement Drive - TCS",
      description: "Campus placement drive for final year students",
      date: "2024-02-25",
      time: "10:00 AM",
      venue: "Placement Cell",
      category: "Placement",
      registrationFee: 0,
      maxParticipants: 100,
      currentParticipants: 89,
      organizer: "Placement Cell"
    },
    {
      id: 4,
      title: "Workshop: AI & ML",
      description: "Hands-on workshop on Artificial Intelligence and Machine Learning",
      date: "2024-03-01",
      time: "02:00 PM",
      venue: "Computer Lab 1",
      category: "Workshop",
      registrationFee: 200,
      maxParticipants: 50,
      currentParticipants: 23,
      organizer: "IT Department"
    }
  ];

  const handleRegister = (eventId: number) => {
    if (registeredEvents.includes(eventId)) {
      setRegisteredEvents(prev => prev.filter(id => id !== eventId));
      alert('Registration cancelled!');
    } else {
      setRegisteredEvents(prev => [...prev, eventId]);
      alert('Registered successfully!');
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Technical': return 'bg-blue-100 text-blue-800';
      case 'Cultural': return 'bg-purple-100 text-purple-800';
      case 'Placement': return 'bg-green-100 text-green-800';
      case 'Workshop': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">College Events</h2>
        <p className="text-gray-600 dark:text-gray-400">Discover and register for upcoming events</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Upcoming Events</p>
                <p className="text-2xl font-bold text-blue-600">{upcomingEvents.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Registered Events</p>
                <p className="text-2xl font-bold text-green-600">{registeredEvents.length}</p>
              </div>
              <Star className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
                <p className="text-2xl font-bold text-purple-600">3</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {upcomingEvents.map((event) => (
          <Card key={event.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">{event.description}</p>
                </div>
                <Badge className={getCategoryColor(event.category)}>
                  {event.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{event.venue}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{event.currentParticipants}/{event.maxParticipants}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Organized by {event.organizer}
                  </p>
                  {event.registrationFee > 0 && (
                    <p className="text-sm font-semibold text-green-600">
                      Registration Fee: ₹{event.registrationFee}
                    </p>
                  )}
                </div>
                <Button 
                  onClick={() => handleRegister(event.id)}
                  variant={registeredEvents.includes(event.id) ? "destructive" : "default"}
                  className="flex items-center gap-2"
                >
                  {registeredEvents.includes(event.id) ? (
                    "Cancel Registration"
                  ) : (
                    <>
                      <Plus className="h-4 w-4" />
                      Register
                    </>
                  )}
                </Button>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${(event.currentParticipants / event.maxParticipants) * 100}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Events;
