
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  Search, 
  Calendar, 
  Clock,
  User,
  AlertCircle,
  CheckCircle
} from "lucide-react";

const Library = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const borrowedBooks = [
    {
      id: 1,
      title: "Data Structures and Algorithms",
      author: "Thomas H. Cormen",
      isbn: "978-0262033848",
      dueDate: "2024-01-20",
      status: "borrowed",
      renewals: 1
    },
    {
      id: 2,
      title: "Clean Code",
      author: "Robert C. Martin",
      isbn: "978-0132350884",
      dueDate: "2024-01-15",
      status: "overdue",
      renewals: 0
    }
  ];

  const availableBooks = [
    {
      id: 3,
      title: "Design Patterns",
      author: "Gang of Four",
      isbn: "978-0201633612",
      status: "available",
      location: "CS-Section-A-12"
    },
    {
      id: 4,
      title: "Computer Networks",
      author: "Andrew S. Tanenbaum",
      isbn: "978-0132126953",
      status: "available",
      location: "CS-Section-B-8"
    }
  ];

  const handleReserve = (bookId: number) => {
    console.log(`Reserving book ${bookId}`);
    // Mock API call
    alert('Book reserved successfully!');
  };

  const handleRenew = (bookId: number) => {
    console.log(`Renewing book ${bookId}`);
    alert('Book renewed for 7 more days!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Library Management</h2>
        <p className="text-gray-600 dark:text-gray-400">Manage your books and reservations</p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search books by title, author, or ISBN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Books Borrowed</p>
                <p className="text-2xl font-bold text-blue-600">2</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Due Soon</p>
                <p className="text-2xl font-bold text-orange-600">1</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Reservations</p>
                <p className="text-2xl font-bold text-green-600">0</p>
              </div>
              <User className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Borrowed Books */}
      <Card>
        <CardHeader>
          <CardTitle>My Borrowed Books</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {borrowedBooks.map((book) => (
            <div key={book.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <h3 className="font-semibold">{book.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">by {book.author}</p>
                <p className="text-xs text-gray-500">ISBN: {book.isbn}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Due: {book.dueDate}</span>
                  <Badge className={book.status === 'overdue' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                    {book.status === 'overdue' ? <AlertCircle className="h-3 w-3 mr-1" /> : <CheckCircle className="h-3 w-3 mr-1" />}
                    {book.status}
                  </Badge>
                </div>
              </div>
              <Button 
                onClick={() => handleRenew(book.id)}
                disabled={book.renewals >= 2}
                size="sm"
              >
                Renew ({book.renewals}/2)
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Available Books */}
      <Card>
        <CardHeader>
          <CardTitle>Available Books</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {availableBooks.map((book) => (
            <div key={book.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <h3 className="font-semibold">{book.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">by {book.author}</p>
                <p className="text-xs text-gray-500">ISBN: {book.isbn}</p>
                <p className="text-xs text-blue-600">Location: {book.location}</p>
              </div>
              <Button onClick={() => handleReserve(book.id)} size="sm">
                Reserve
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Library;
