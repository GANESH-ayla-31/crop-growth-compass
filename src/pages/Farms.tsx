
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
import { Farm, Farmer } from "@/types";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { MapPin, Plus, Pencil, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Farms = () => {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentFarm, setCurrentFarm] = useState<Partial<Farm>>({});
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // In a full application, this would fetch from Supabase
      // For now, let's use mock data
      setTimeout(() => {
        const mockFarmers: Farmer[] = [
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
        setFarmers(mockFarmers);

        const mockFarms: Farm[] = [
          {
            id: '1',
            name: 'Green Valley',
            location: 'Northern Valley, Countryside',
            size: 120,
            size_unit: 'acres',
            farmer_id: '1',
            soil_type: 'Loamy',
            created_at: '2025-01-12T00:00:00',
            updated_at: '2025-01-12T00:00:00',
          },
          {
            id: '2',
            name: 'Sunset Fields',
            location: 'Western Plains, Ruraltown',
            size: 85,
            size_unit: 'acres',
            farmer_id: '2',
            soil_type: 'Sandy Loam',
            created_at: '2025-01-17T00:00:00',
            updated_at: '2025-01-17T00:00:00',
          },
          {
            id: '3',
            name: 'Mountain Creek Farm',
            location: 'Eastern Heights, Agriville',
            size: 150,
            size_unit: 'acres',
            farmer_id: '3',
            soil_type: 'Clay',
            created_at: '2025-02-08T00:00:00',
            updated_at: '2025-02-08T00:00:00',
          },
          {
            id: '4',
            name: 'Riverside Plots',
            location: 'Southern River, Countryside',
            size: 65,
            size_unit: 'acres',
            farmer_id: '1',
            soil_type: 'Silty',
            created_at: '2025-02-15T00:00:00',
            updated_at: '2025-02-15T00:00:00',
          },
        ];
        setFarms(mockFarms);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error("Error fetching farms data:", error);
      toast.error("Failed to load farms data");
      setLoading(false);
    }
  };

  const getFarmerName = (farmerId: string) => {
    const farmer = farmers.find((f) => f.id === farmerId);
    return farmer ? `${farmer.first_name} ${farmer.last_name}` : "Unknown";
  };

  const filteredFarms = farms.filter((farm) => {
    const farmName = farm.name.toLowerCase();
    const farmerName = getFarmerName(farm.farmer_id).toLowerCase();
    const location = farm.location.toLowerCase();
    const query = searchQuery.toLowerCase();

    return (
      farmName.includes(query) ||
      farmerName.includes(query) ||
      location.includes(query)
    );
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentFarm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setCurrentFarm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddFarm = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newFarm: Farm = {
        id: Date.now().toString(), // In real app, this would be handled by Supabase
        ...currentFarm as Omit<Farm, 'id' | 'created_at' | 'updated_at'>,
        size: Number(currentFarm.size),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as Farm;

      // In a real app, this would be saved to Supabase
      // const { data, error } = await supabase.from('farms').insert([newFarm]);

      // Add the new farm to our state
      setFarms((prev) => [...prev, newFarm]);

      toast.success("Farm added successfully");
      setCurrentFarm({});
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error adding farm:", error);
      toast.error("Failed to add farm");
    }
  };

  const handleEditFarm = (farm: Farm) => {
    setCurrentFarm({ ...farm });
    setIsEditDialogOpen(true);
  };

  const handleUpdateFarm = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updatedFarm = {
        ...currentFarm,
        size: Number(currentFarm.size),
        updated_at: new Date().toISOString(),
      };

      // In a real app, this would update the record in Supabase
      // const { data, error } = await supabase
      //   .from('farms')
      //   .update(updatedFarm)
      //   .eq('id', currentFarm.id);

      // Update the farm in our state
      setFarms((prev) =>
        prev.map((f) => (f.id === currentFarm.id ? updatedFarm as Farm : f))
      );

      toast.success("Farm updated successfully");
      setCurrentFarm({});
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating farm:", error);
      toast.error("Failed to update farm");
    }
  };

  const handleDeleteFarm = async (id: string) => {
    try {
      // In a real app, this would delete from Supabase
      // const { data, error } = await supabase.from('farms').delete().eq('id', id);

      // Remove the farm from our state
      setFarms((prev) => prev.filter((f) => f.id !== id));

      toast.success("Farm deleted successfully");
    } catch (error) {
      console.error("Error deleting farm:", error);
      toast.error("Failed to delete farm");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Farms</h1>
          <p className="text-muted-foreground">
            Manage your registered farms and their details.
          </p>
        </div>
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Add Farm</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {currentFarm.id ? "Edit Farm" : "Add New Farm"}
              </DialogTitle>
              <DialogDescription>
                Fill in the farm details and save to {currentFarm.id ? "update" : "add"} the record.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={currentFarm.id ? handleUpdateFarm : handleAddFarm}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Farm Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={currentFarm.name || ""}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={currentFarm.location || ""}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="size">Size</Label>
                    <Input
                      id="size"
                      name="size"
                      type="number"
                      min="0"
                      step="0.01"
                      value={currentFarm.size || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="size_unit">Unit</Label>
                    <Select
                      value={currentFarm.size_unit || ""}
                      onValueChange={(value) => handleSelectChange("size_unit", value)}
                    >
                      <SelectTrigger id="size_unit">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="acres">Acres</SelectItem>
                        <SelectItem value="hectares">Hectares</SelectItem>
                        <SelectItem value="sqm">Square Meters</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="farmer_id">Farmer</Label>
                  <Select
                    value={currentFarm.farmer_id || ""}
                    onValueChange={(value) => handleSelectChange("farmer_id", value)}
                  >
                    <SelectTrigger id="farmer_id">
                      <SelectValue placeholder="Select farmer" />
                    </SelectTrigger>
                    <SelectContent>
                      {farmers.map((farmer) => (
                        <SelectItem key={farmer.id} value={farmer.id}>
                          {farmer.first_name} {farmer.last_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="soil_type">Soil Type</Label>
                  <Select
                    value={currentFarm.soil_type || ""}
                    onValueChange={(value) => handleSelectChange("soil_type", value)}
                  >
                    <SelectTrigger id="soil_type">
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Loamy">Loamy</SelectItem>
                      <SelectItem value="Sandy">Sandy</SelectItem>
                      <SelectItem value="Clay">Clay</SelectItem>
                      <SelectItem value="Silty">Silty</SelectItem>
                      <SelectItem value="Sandy Loam">Sandy Loam</SelectItem>
                      <SelectItem value="Clay Loam">Clay Loam</SelectItem>
                      <SelectItem value="Silt Loam">Silt Loam</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {currentFarm.id ? "Update" : "Add"} Farm
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search farms..."
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
                  <TableHead>Farm Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Soil Type</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex justify-center">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredFarms.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      No farms found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredFarms.map((farm) => (
                    <TableRow key={farm.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-muted-foreground" />
                          {farm.name}
                        </div>
                      </TableCell>
                      <TableCell>{farm.location}</TableCell>
                      <TableCell>
                        {farm.size} {farm.size_unit}
                      </TableCell>
                      <TableCell>{farm.soil_type}</TableCell>
                      <TableCell>{getFarmerName(farm.farmer_id)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditFarm(farm)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                            onClick={() => handleDeleteFarm(farm.id)}
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
              Showing {filteredFarms.length} of {farms.length} farms
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Farms;
