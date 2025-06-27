
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  CreditCard, 
  DollarSign, 
  Calendar, 
  Users, 
  CheckCircle, 
  Clock,
  AlertCircle
} from "lucide-react";

const MoneyCollection = () => {
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [paymentAmount, setPaymentAmount] = useState('');

  // Mock data for fund collections
  const collections = [
    {
      id: 1,
      title: "Annual Fest Registration",
      description: "Registration fee for TechFest 2024",
      amount: 500,
      dueDate: "2024-01-15",
      status: "pending",
      collected: 12500,
      target: 25000,
      contributors: 25
    },
    {
      id: 2,
      title: "Study Tour Fund",
      description: "Contribution for industrial visit to Mumbai",
      amount: 2500,
      dueDate: "2024-01-20",
      status: "pending",
      collected: 45000,
      target: 75000,
      contributors: 18
    },
    {
      id: 3,
      title: "Lab Equipment Fund",
      description: "Contribution for new computer lab equipment",
      amount: 1000,
      dueDate: "2024-01-10",
      status: "paid",
      collected: 30000,
      target: 50000,
      contributors: 30
    },
    {
      id: 4,
      title: "Sports Day Equipment",
      description: "Purchase new sports equipment for annual sports day",
      amount: 300,
      dueDate: "2024-01-25",
      status: "pending",
      collected: 8400,
      target: 15000,
      contributors: 28
    }
  ];

  const handlePayment = (collectionId: number) => {
    console.log(`Processing payment for collection ${collectionId}`);
    // Here you would integrate with actual payment gateway
    alert('Payment gateway integration needed. This would redirect to payment page.');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'overdue': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Money Collection</h2>
        <p className="text-gray-600 dark:text-gray-400">Manage fund collections and make payments</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Pending</p>
                <p className="text-2xl font-bold text-red-600">₹3,300</p>
              </div>
              <DollarSign className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Paid</p>
                <p className="text-2xl font-bold text-green-600">₹1,000</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Collections</p>
                <p className="text-2xl font-bold text-blue-600">3</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Collections List */}
      <div className="space-y-4">
        {collections.map((collection) => (
          <Card key={collection.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{collection.title}</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">{collection.description}</p>
                </div>
                <Badge className={`${getStatusColor(collection.status)} flex items-center gap-1`}>
                  {getStatusIcon(collection.status)}
                  {collection.status.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Amount</p>
                  <p className="font-semibold">₹{collection.amount}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Due Date</p>
                  <p className="font-semibold flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {collection.dueDate}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Progress</p>
                  <p className="font-semibold">₹{collection.collected} / ₹{collection.target}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Contributors</p>
                  <p className="font-semibold">{collection.contributors} students</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${(collection.collected / collection.target) * 100}%` }}
                ></div>
              </div>

              {collection.status === 'pending' && (
                <div className="flex items-center gap-4">
                  <Button 
                    onClick={() => handlePayment(collection.id)}
                    className="flex items-center gap-2"
                  >
                    <CreditCard className="h-4 w-4" />
                    Pay ₹{collection.amount}
                  </Button>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MoneyCollection;
