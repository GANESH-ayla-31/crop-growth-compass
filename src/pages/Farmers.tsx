import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Farmer } from "@/types";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { User, Plus, Pencil, Trash } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const Farmers = () => {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentFarmer, setCurrentFarmer] = useState<Partial<Farmer>>({});
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchFarmers();
  }, []);

  const fetchFarmers = async () => {
    setLoading(true);
    try {
      // In a full application, this would fetch from Supabase
      // For now, let's use mock data
      const storedFarmers = localStorage.getItem('farmers');
      
      setTimeout(() => {
        let mockFarmers: Farmer[] = [
          {
            id: '1',
            first_name: 'John',
            last_name: 'Farmer',
            email: 'john@farmexample.com',
            phone: '555-123-4567',
            address: '123 Farm Road, Countryside',
            created_at: '2025-01-10T00:00:00',
            updated_at: '2025-01-10T00:00:00',
          },
          {
            id: '2',
            first_name: 'Sarah',
            last_name: 'Fields',
            email: 'sarah@farmexample.com',
            phone: '555-765-4321',
            address: '456 Harvest Lane, Ruraltown',
            created_at: '2025-01-15T00:00:00',
            updated_at: '2025-01-15T00:00:00',
          },
          {
            id: '3',
            first_name: 'Michael',
            last_name: 'Planter',
            email: 'michael@farmexample.com',
            phone: '555-987-6543',
            address: '789 Crop Circle, Agriville',
            created_at: '2025-02-05T00:00:00',
            updated_at: '2025-02-05T00:00:00',
          },
        ];
        
        if (storedFarmers) {
          mockFarmers = JSON.parse(storedFarmers);
        } else {
          localStorage.setItem('farmers', JSON.stringify(mockFarmers));
        }
        
        setFarmers(mockFarmers);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error("Error fetching farmers:", error);
      toast.error("Failed to load farmers");
      setLoading(false);
    }
  };

  const filteredFarmers = farmers.filter((farmer) => {
    const fullName = `${farmer.first_name} ${farmer.last_name}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase()) || 
           farmer.email.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentFarmer((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddFarmer = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const newFarmer: Farmer = {
        id: Date.now().toString(), // In real app, this would be handled by Supabase
        ...currentFarmer as Omit<Farmer, 'id' | 'created_at' | 'updated_at'>,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as Farmer;
      
      // In a real app, this would be saved to Supabase
      // const { data, error } = await supabase.from('farmers').insert([newFarmer]);
      
      // Add the new farmer to our state and localStorage
      const updatedFarmers = [...farmers, newFarmer];
      setFarmers(updatedFarmers);
      localStorage.setItem('farmers', JSON.stringify(updatedFarmers));
      
      toast.success("Farmer added successfully");
      setCurrentFarmer({});
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error adding farmer:", error);
      toast.error("Failed to add farmer");
    }
  };

  const handleEditFarmer = (farmer: Farmer) => {
    setCurrentFarmer({ ...farmer });
    setIsEditDialogOpen(true);
  };

  const handleUpdateFarmer = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const updatedFarmer = {
        ...currentFarmer,
        updated_at: new Date().toISOString(),
      };
      
      // In a real app, this would update the record in Supabase
      // const { data, error } = await supabase
      //   .from('farmers')
      //   .update(updatedFarmer)
      //   .eq('id', currentFarmer.id);
      
      // Update the farmer in our state and localStorage
      const updatedFarmers = farmers.map((f) => 
        f.id === currentFarmer.id ? updatedFarmer as Farmer : f
      );
      setFarmers(updatedFarmers);
      localStorage.setItem('farmers', JSON.stringify(updatedFarmers));
      
      toast.success("Farmer updated successfully");
      setCurrentFarmer({});
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating farmer:", error);
      toast.error("Failed to update farmer");
    }
  };

  const handleDeleteFarmer = async (id: string) => {
    try {
      // In a real app, this would delete from Supabase
      // const { data, error } = await supabase.from('farmers').delete().eq('id', id);
      
      // Remove the farmer from our state and localStorage
      const updatedFarmers = farmers.filter((f) => f.id !== id);
      setFarmers(updatedFarmers);
      localStorage.setItem('farmers', JSON.stringify(updatedFarmers));
      
      toast.success("Farmer deleted successfully");
    } catch (error) {
      console.error("Error deleting farmer:", error);
      toast.error("Failed to delete farmer");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Farmers</h1>
          <p className="text-muted-foreground">
            Manage your registered farmers and their details.
          </p>
        </div>
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Add Farmer</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {currentFarmer.id ? "Edit Farmer" : "Add New Farmer"}
              </DialogTitle>
              <DialogDescription>
                Fill in the farmer's details and save to {currentFarmer.id ? "update" : "add"} the record.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={currentFarmer.id ? handleUpdateFarmer : handleAddFarmer}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      id="first_name"
                      name="first_name"
                      value={currentFarmer.first_name || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      id="last_name"
                      name="last_name"
                      value={currentFarmer.last_name || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={currentFarmer.email || ""}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={currentFarmer.phone || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={currentFarmer.address || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {currentFarmer.id ? "Update" : "Add"} Farmer
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search farmers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <div className="flex justify-center">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredFarmers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      No farmers found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredFarmers.map((farmer) => (
                    <TableRow key={farmer.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <User className="h-5 w-5 text-muted-foreground" />
                          {farmer.first_name} {farmer.last_name}
                        </div>
                      </TableCell>
                      <TableCell>{farmer.email}</TableCell>
                      <TableCell>{farmer.phone}</TableCell>
                      <TableCell>{farmer.address}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditFarmer(farmer)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                            onClick={() => handleDeleteFarmer(farmer.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="border-t bg-muted/40 p-2">
            <div className="text-xs text-muted-foreground">
              Showing {filteredFarmers.length} of {farmers.length} farmers
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Farmers;
