
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Download,
  Calendar,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
  Receipt
} from "lucide-react";

const Fees = () => {
  const feeStructure = [
    { category: 'Tuition Fee', amount: 60000, paid: 60000, status: 'paid', dueDate: '2024-01-15' },
    { category: 'Lab Fee', amount: 15000, paid: 15000, status: 'paid', dueDate: '2024-01-15' },
    { category: 'Library Fee', amount: 5000, paid: 0, status: 'pending', dueDate: '2024-02-15' },
    { category: 'Sports Fee', amount: 3000, paid: 0, status: 'pending', dueDate: '2024-02-15' },
    { category: 'Development Fee', amount: 12000, paid: 0, status: 'pending', dueDate: '2024-03-15' }
  ];

  const paymentHistory = [
    { id: 'TXN001', date: '2024-01-10', amount: 75000, method: 'Online', status: 'completed', receipt: 'RCP001' },
    { id: 'TXN002', date: '2023-08-15', amount: 95000, method: 'Bank Transfer', status: 'completed', receipt: 'RCP002' },
    { id: 'TXN003', date: '2023-01-20', amount: 95000, method: 'Online', status: 'completed', receipt: 'RCP003' }
  ];

  const totalFees = feeStructure.reduce((sum, fee) => sum + fee.amount, 0);
  const paidFees = feeStructure.reduce((sum, fee) => sum + fee.paid, 0);
  const pendingFees = totalFees - paidFees;

  const handlePayment = (category: string, amount: number) => {
    alert(`Redirecting to payment gateway for ${category} - ₹${amount}`);
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Fee Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Track and manage your academic fees</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <CreditCard className="h-4 w-4 mr-2" />
          Pay Now
        </Button>
      </div>

      {/* Fee Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Fees</p>
                <p className="text-2xl font-bold text-blue-600">₹{totalFees.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Paid Amount</p>
                <p className="text-2xl font-bold text-green-600">₹{paidFees.toLocaleString()}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pending Amount</p>
                <p className="text-2xl font-bold text-red-600">₹{pendingFees.toLocaleString()}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fee Structure */}
      <Card>
        <CardHeader>
          <CardTitle>Current Year Fee Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {feeStructure.map((fee, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold">{fee.category}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <span>Amount: ₹{fee.amount.toLocaleString()}</span>
                    <span>Paid: ₹{fee.paid.toLocaleString()}</span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Due: {fee.dueDate}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={`${getStatusColor(fee.status)} flex items-center gap-1`}>
                    {getStatusIcon(fee.status)}
                    {fee.status.toUpperCase()}
                  </Badge>
                  {fee.status === 'pending' && (
                    <Button 
                      size="sm" 
                      onClick={() => handlePayment(fee.category, fee.amount - fee.paid)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <CreditCard className="h-4 w-4 mr-1" />
                      Pay ₹{(fee.amount - fee.paid).toLocaleString()}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentHistory.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Receipt className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Payment #{payment.id}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{payment.date}</span>
                      <span>{payment.method}</span>
                      <span>Receipt: {payment.receipt}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="font-semibold text-green-600">₹{payment.amount.toLocaleString()}</span>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-1" />
                    Receipt
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Fees;
