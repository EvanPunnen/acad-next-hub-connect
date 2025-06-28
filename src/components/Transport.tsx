
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bus, 
  MapPin, 
  Clock,
  Navigation,
  AlertCircle,
  CheckCircle,
  Calendar
} from "lucide-react";

const Transport = () => {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  const busRoutes = [
    {
      id: "RT01",
      name: "City Center Route",
      departure: "07:30 AM",
      arrival: "08:15 AM",
      stops: ["Central Station", "Main Market", "City Hospital", "College Gate"],
      status: "on-time",
      capacity: 45,
      occupied: 32,
      fare: 25,
      nextBus: "08:30 AM"
    },
    {
      id: "RT02", 
      name: "Airport Express",
      departure: "08:00 AM",
      arrival: "08:45 AM",
      stops: ["Airport Terminal", "Tech Park", "Metro Station", "College Gate"],
      status: "delayed",
      capacity: 50,
      occupied: 28,
      fare: 35,
      nextBus: "09:00 AM"
    },
    {
      id: "RT03",
      name: "Residential Area",
      departure: "07:45 AM", 
      arrival: "08:30 AM",
      stops: ["Green Valley", "Park View", "Shopping Mall", "College Gate"],
      status: "on-time",
      capacity: 40,
      occupied: 35,
      fare: 20,
      nextBus: "08:45 AM"
    }
  ];

  const myBookings = [
    {
      id: 1,
      route: "RT01",
      date: "2024-01-15",
      time: "07:30 AM",
      status: "confirmed",
      seatNumber: "A12"
    },
    {
      id: 2,
      route: "RT03",
      date: "2024-01-16", 
      time: "07:45 AM",
      status: "pending",
      seatNumber: "B08"
    }
  ];

  const handleBookSeat = (routeId: string) => {
    console.log(`Booking seat for route ${routeId}`);
    alert('Seat booked successfully!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-time': return 'bg-green-100 text-green-800';
      case 'delayed': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-time': return <CheckCircle className="h-4 w-4" />;
      case 'delayed': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">College Transport</h2>
        <p className="text-gray-600 dark:text-gray-400">Track buses and book your seats</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Routes</p>
                <p className="text-2xl font-bold text-blue-600">{busRoutes.length}</p>
              </div>
              <Bus className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">My Bookings</p>
                <p className="text-2xl font-bold text-green-600">{myBookings.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">On Time</p>
                <p className="text-2xl font-bold text-purple-600">2/3</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* My Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>My Bookings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {myBookings.map((booking) => (
            <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">Route {booking.route}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {booking.date}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {booking.time}
                  </span>
                  <span className="flex items-center">
                    <Bus className="h-4 w-4 mr-1" />
                    Seat {booking.seatNumber}
                  </span>
                </div>
              </div>
              <Badge className={booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                {booking.status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Bus Routes */}
      <div className="space-y-4">
        {busRoutes.map((route) => (
          <Card key={route.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Bus className="h-5 w-5" />
                    {route.name} ({route.id})
                  </CardTitle>
                </div>
                <Badge className={`${getStatusColor(route.status)} flex items-center gap-1`}>
                  {getStatusIcon(route.status)}
                  {route.status.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Departure</p>
                  <p className="font-semibold flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {route.departure}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Arrival</p>
                  <p className="font-semibold">{route.arrival}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Occupancy</p>
                  <p className="font-semibold">{route.occupied}/{route.capacity}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Fare</p>
                  <p className="font-semibold text-green-600">₹{route.fare}</p>
                </div>
              </div>

              {/* Route Stops */}
              <div>
                <p className="text-sm font-medium mb-2">Route Stops:</p>
                <div className="flex flex-wrap gap-2">
                  {route.stops.map((stop, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      <MapPin className="h-3 w-3 mr-1" />
                      {stop}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Occupancy Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${(route.occupied / route.capacity) * 100}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Next bus: {route.nextBus}
                </p>
                <Button 
                  onClick={() => handleBookSeat(route.id)}
                  disabled={route.occupied >= route.capacity}
                  className="flex items-center gap-2"
                >
                  <Navigation className="h-4 w-4" />
                  {route.occupied >= route.capacity ? 'Full' : 'Book Seat'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Transport;
