
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { 
  Plus,
  Bus,
  User,
  Phone,
  MapPin,
  Users,
  Edit,
  Trash2,
  CheckCircle,
  XCircle
} from "lucide-react";

interface Transport {
  id: string;
  bus_number: string;
  driver_name: string;
  driver_phone: string;
  route_name: string;
  route_details?: string;
  capacity: number;
  is_available: boolean;
  created_at: string;
  bookings_count?: number;
}

const TransportManagement = () => {
  const [transports, setTransports] = useState<Transport[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTransport, setSelectedTransport] = useState<Transport | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  const [newTransport, setNewTransport] = useState({
    bus_number: '',
    driver_name: '',
    driver_phone: '',
    route_name: '',
    route_details: '',
    capacity: 40,
    is_available: true
  });

  useEffect(() => {
    fetchTransports();
  }, [user]);

  const fetchTransports = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('transport')
        .select(`
          *,
          bookings:bus_bookings(id)
        `)
        .eq('created_by', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const transportsWithBookings = data?.map(transport => ({
        ...transport,
        bookings_count: transport.bookings?.length || 0
      })) || [];

      setTransports(transportsWithBookings);
    } catch (error) {
      console.error('Error fetching transports:', error);
      toast({
        title: "Error",
        description: "Failed to fetch transport data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransport = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('transport')
        .insert([{
          ...newTransport,
          created_by: user.id
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Transport added successfully"
      });

      setIsAddModalOpen(false);
      setNewTransport({
        bus_number: '',
        driver_name: '',
        driver_phone: '',
        route_name: '',
        route_details: '',
        capacity: 40,
        is_available: true
      });
      fetchTransports();
    } catch (error) {
      console.error('Error adding transport:', error);
      toast({
        title: "Error",
        description: "Failed to add transport",
        variant: "destructive"
      });
    }
  };

  const handleEditTransport = async () => {
    if (!selectedTransport) return;

    try {
      const { error } = await supabase
        .from('transport')
        .update({
          bus_number: selectedTransport.bus_number,
          driver_name: selectedTransport.driver_name,
          driver_phone: selectedTransport.driver_phone,
          route_name: selectedTransport.route_name,
          route_details: selectedTransport.route_details,
          capacity: selectedTransport.capacity,
          is_available: selectedTransport.is_available
        })
        .eq('id', selectedTransport.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Transport updated successfully"
      });

      setIsEditModalOpen(false);
      setSelectedTransport(null);
      fetchTransports();
    } catch (error) {
      console.error('Error updating transport:', error);
      toast({
        title: "Error",
        description: "Failed to update transport",
        variant: "destructive"
      });
    }
  };

  const handleDeleteTransport = async (transportId: string) => {
    if (!confirm('Are you sure you want to delete this transport?')) return;

    try {
      const { error } = await supabase
        .from('transport')
        .delete()
        .eq('id', transportId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Transport deleted successfully"
      });

      fetchTransports();
    } catch (error) {
      console.error('Error deleting transport:', error);
      toast({
        title: "Error",
        description: "Failed to delete transport",
        variant: "destructive"
      });
    }
  };

  const toggleAvailability = async (transport: Transport) => {
    try {
      const { error } = await supabase
        .from('transport')
        .update({ is_available: !transport.is_available })
        .eq('id', transport.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Transport ${!transport.is_available ? 'enabled' : 'disabled'} successfully`
      });

      fetchTransports();
    } catch (error) {
      console.error('Error updating transport availability:', error);
      toast({
        title: "Error",
        description: "Failed to update transport availability",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Transport Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage bus routes, drivers, and availability</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Transport
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Transport</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bus_number">Bus Number</Label>
                  <Input
                    id="bus_number"
                    value={newTransport.bus_number}
                    onChange={(e) => setNewTransport({...newTransport, bus_number: e.target.value})}
                    placeholder="e.g., BUS-001"
                  />
                </div>
                <div>
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={newTransport.capacity}
                    onChange={(e) => setNewTransport({...newTransport, capacity: parseInt(e.target.value)})}
                    placeholder="40"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="driver_name">Driver Name</Label>
                <Input
                  id="driver_name"
                  value={newTransport.driver_name}
                  onChange={(e) => setNewTransport({...newTransport, driver_name: e.target.value})}
                  placeholder="Enter driver name"
                />
              </div>
              <div>
                <Label htmlFor="driver_phone">Driver Phone</Label>
                <Input
                  id="driver_phone"
                  value={newTransport.driver_phone}
                  onChange={(e) => setNewTransport({...newTransport, driver_phone: e.target.value})}
                  placeholder="Enter driver phone"
                />
              </div>
              <div>
                <Label htmlFor="route_name">Route Name</Label>
                <Input
                  id="route_name"
                  value={newTransport.route_name}
                  onChange={(e) => setNewTransport({...newTransport, route_name: e.target.value})}
                  placeholder="e.g., Main Campus - City Center"
                />
              </div>
              <div>
                <Label htmlFor="route_details">Route Details</Label>
                <Input
                  id="route_details"
                  value={newTransport.route_details}
                  onChange={(e) => setNewTransport({...newTransport, route_details: e.target.value})}
                  placeholder="Bus stops and timings"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_available"
                  checked={newTransport.is_available}
                  onCheckedChange={(checked) => setNewTransport({...newTransport, is_available: checked})}
                />
                <Label htmlFor="is_available">Available</Label>
              </div>
              <Button onClick={handleAddTransport} className="w-full">
                Add Transport
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {transports.map((transport) => (
          <Card key={transport.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Bus className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-lg">{transport.bus_number}</h3>
                      <Badge variant={transport.is_available ? "default" : "secondary"}>
                        {transport.is_available ? (
                          <>
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Available
                          </>
                        ) : (
                          <>
                            <XCircle className="h-3 w-3 mr-1" />
                            Unavailable
                          </>
                        )}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-2" />
                        <span className="font-medium">{transport.route_name}</span>
                      </div>
                      {transport.route_details && (
                        <div className="ml-5">
                          <span className="text-xs">{transport.route_details}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          <span>{transport.driver_name}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          <span>{transport.driver_phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-purple-500" />
                      <span>Capacity: {transport.capacity}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Bus className="h-4 w-4 text-green-500" />
                      <span>Bookings: {transport.bookings_count || 0}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleAvailability(transport)}
                      className={transport.is_available ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'}
                    >
                      {transport.is_available ? 'Disable' : 'Enable'}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedTransport(transport);
                        setIsEditModalOpen(true);
                      }}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteTransport(transport.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {transports.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Bus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Transport Routes</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Start by adding your first transport route.
              </p>
              <Button onClick={() => setIsAddModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Transport
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Edit Transport Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Transport</DialogTitle>
          </DialogHeader>
          {selectedTransport && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit_bus_number">Bus Number</Label>
                  <Input
                    id="edit_bus_number"
                    value={selectedTransport.bus_number}
                    onChange={(e) => setSelectedTransport({...selectedTransport, bus_number: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit_capacity">Capacity</Label>
                  <Input
                    id="edit_capacity"
                    type="number"
                    value={selectedTransport.capacity}
                    onChange={(e) => setSelectedTransport({...selectedTransport, capacity: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit_driver_name">Driver Name</Label>
                <Input
                  id="edit_driver_name"
                  value={selectedTransport.driver_name}
                  onChange={(e) => setSelectedTransport({...selectedTransport, driver_name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit_driver_phone">Driver Phone</Label>
                <Input
                  id="edit_driver_phone"
                  value={selectedTransport.driver_phone}
                  onChange={(e) => setSelectedTransport({...selectedTransport, driver_phone: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit_route_name">Route Name</Label>
                <Input
                  id="edit_route_name"
                  value={selectedTransport.route_name}
                  onChange={(e) => setSelectedTransport({...selectedTransport, route_name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit_route_details">Route Details</Label>
                <Input
                  id="edit_route_details"
                  value={selectedTransport.route_details || ''}
                  onChange={(e) => setSelectedTransport({...selectedTransport, route_details: e.target.value})}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit_is_available"
                  checked={selectedTransport.is_available}
                  onCheckedChange={(checked) => setSelectedTransport({...selectedTransport, is_available: checked})}
                />
                <Label htmlFor="edit_is_available">Available</Label>
              </div>
              <Button onClick={handleEditTransport} className="w-full">
                Update Transport
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TransportManagement;
