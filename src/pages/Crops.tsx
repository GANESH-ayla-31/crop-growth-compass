
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Crop } from "@/types";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Leaf, Plus, Pencil, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Crops = () => {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentCrop, setCurrentCrop] = useState<Partial<Crop>>({});
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    setLoading(true);
    try {
      // In a full application, this would fetch from Supabase
      // For now, let's use mock data
      setTimeout(() => {
        const mockCrops: Crop[] = [
          {
            id: '1',
            name: 'Wheat',
            variety: 'Hard Red Winter',
            growth_duration: 120,
            ideal_soil_type: 'Loamy',
            ideal_temperature_min: 15,
            ideal_temperature_max: 25,
            ideal_rainfall_min: 500,
            ideal_rainfall_max: 900,
            created_at: '2025-01-15T00:00:00',
            updated_at: '2025-01-15T00:00:00',
          },
          {
            id: '2',
            name: 'Corn',
            variety: 'Sweet Corn',
            growth_duration: 90,
            ideal_soil_type: 'Loamy',
            ideal_temperature_min: 18,
            ideal_temperature_max: 32,
            ideal_rainfall_min: 500,
            ideal_rainfall_max: 800,
            created_at: '2025-01-20T00:00:00',
            updated_at: '2025-01-20T00:00:00',
          },
          {
            id: '3',
            name: 'Soybean',
            variety: 'Round-Up Ready',
            growth_duration: 100,
            ideal_soil_type: 'Clay Loam',
            ideal_temperature_min: 20,
            ideal_temperature_max: 30,
            ideal_rainfall_min: 450,
            ideal_rainfall_max: 700,
            created_at: '2025-02-05T00:00:00',
            updated_at: '2025-02-05T00:00:00',
          },
          {
            id: '4',
            name: 'Rice',
            variety: 'Jasmine',
            growth_duration: 135,
            ideal_soil_type: 'Clay',
            ideal_temperature_min: 21,
            ideal_temperature_max: 35,
            ideal_rainfall_min: 900,
            ideal_rainfall_max: 2000,
            created_at: '2025-02-10T00:00:00',
            updated_at: '2025-02-10T00:00:00',
          },
          {
            id: '5',
            name: 'Potato',
            variety: 'Russet',
            growth_duration: 80,
            ideal_soil_type: 'Sandy Loam',
            ideal_temperature_min: 15,
            ideal_temperature_max: 25,
            ideal_rainfall_min: 400,
            ideal_rainfall_max: 650,
            created_at: '2025-02-15T00:00:00',
            updated_at: '2025-02-15T00:00:00',
          },
        ];
        setCrops(mockCrops);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error("Error fetching crops:", error);
      toast.error("Failed to load crops");
      setLoading(false);
    }
  };

  const filteredCrops = crops.filter((crop) => {
    const cropName = crop.name.toLowerCase();
    const cropVariety = crop.variety.toLowerCase();
    const query = searchQuery.toLowerCase();

    return cropName.includes(query) || cropVariety.includes(query);
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentCrop((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentCrop((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleAddCrop = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newCrop: Crop = {
        id: Date.now().toString(), // In real app, this would be handled by Supabase
        ...currentCrop as Omit<Crop, 'id' | 'created_at' | 'updated_at'>,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as Crop;

      // In a real app, this would be saved to Supabase
      // const { data, error } = await supabase.from('crops').insert([newCrop]);

      // Add the new crop to our state
      setCrops((prev) => [...prev, newCrop]);

      toast.success("Crop added successfully");
      setCurrentCrop({});
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error adding crop:", error);
      toast.error("Failed to add crop");
    }
  };

  const handleEditCrop = (crop: Crop) => {
    setCurrentCrop({ ...crop });
    setIsEditDialogOpen(true);
  };

  const handleUpdateCrop = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updatedCrop = {
        ...currentCrop,
        updated_at: new Date().toISOString(),
      };

      // In a real app, this would update the record in Supabase
      // const { data, error } = await supabase
      //   .from('crops')
      //   .update(updatedCrop)
      //   .eq('id', currentCrop.id);

      // Update the crop in our state
      setCrops((prev) =>
        prev.map((c) => (c.id === currentCrop.id ? updatedCrop as Crop : c))
      );

      toast.success("Crop updated successfully");
      setCurrentCrop({});
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating crop:", error);
      toast.error("Failed to update crop");
    }
  };

  const handleDeleteCrop = async (id: string) => {
    try {
      // In a real app, this would delete from Supabase
      // const { data, error } = await supabase.from('crops').delete().eq('id', id);

      // Remove the crop from our state
      setCrops((prev) => prev.filter((c) => c.id !== id));

      toast.success("Crop deleted successfully");
    } catch (error) {
      console.error("Error deleting crop:", error);
      toast.error("Failed to delete crop");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Crops</h1>
          <p className="text-muted-foreground">
            Manage your crop database and growing specifications.
          </p>
        </div>
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Add Crop</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {currentCrop.id ? "Edit Crop" : "Add New Crop"}
              </DialogTitle>
              <DialogDescription>
                Fill in the crop details and save to {currentCrop.id ? "update" : "add"} the record.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={currentCrop.id ? handleUpdateCrop : handleAddCrop}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Crop Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={currentCrop.name || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="variety">Variety</Label>
                    <Input
                      id="variety"
                      name="variety"
                      value={currentCrop.variety || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="growth_duration">Growth Duration (days)</Label>
                    <Input
                      id="growth_duration"
                      name="growth_duration"
                      type="number"
                      min="1"
                      value={currentCrop.growth_duration || ""}
                      onChange={handleNumberInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ideal_soil_type">Ideal Soil Type</Label>
                    <Input
                      id="ideal_soil_type"
                      name="ideal_soil_type"
                      value={currentCrop.ideal_soil_type || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ideal_temperature_min">Min Temperature (°C)</Label>
                    <Input
                      id="ideal_temperature_min"
                      name="ideal_temperature_min"
                      type="number"
                      value={currentCrop.ideal_temperature_min || ""}
                      onChange={handleNumberInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ideal_temperature_max">Max Temperature (°C)</Label>
                    <Input
                      id="ideal_temperature_max"
                      name="ideal_temperature_max"
                      type="number"
                      value={currentCrop.ideal_temperature_max || ""}
                      onChange={handleNumberInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ideal_rainfall_min">Min Rainfall (mm/year)</Label>
                    <Input
                      id="ideal_rainfall_min"
                      name="ideal_rainfall_min"
                      type="number"
                      value={currentCrop.ideal_rainfall_min || ""}
                      onChange={handleNumberInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ideal_rainfall_max">Max Rainfall (mm/year)</Label>
                    <Input
                      id="ideal_rainfall_max"
                      name="ideal_rainfall_max"
                      type="number"
                      value={currentCrop.ideal_rainfall_max || ""}
                      onChange={handleNumberInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {currentCrop.id ? "Update" : "Add"} Crop
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search crops..."
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
                  <TableHead>Crop Name</TableHead>
                  <TableHead>Variety</TableHead>
                  <TableHead>Growth Duration</TableHead>
                  <TableHead>Ideal Soil Type</TableHead>
                  <TableHead>Temperature Range</TableHead>
                  <TableHead>Rainfall Range</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex justify-center">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredCrops.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      No crops found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCrops.map((crop) => (
                    <TableRow key={crop.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Leaf className="h-5 w-5 text-muted-foreground" />
                          {crop.name}
                        </div>
                      </TableCell>
                      <TableCell>{crop.variety}</TableCell>
                      <TableCell>{crop.growth_duration} days</TableCell>
                      <TableCell>{crop.ideal_soil_type}</TableCell>
                      <TableCell>
                        {crop.ideal_temperature_min} - {crop.ideal_temperature_max} °C
                      </TableCell>
                      <TableCell>
                        {crop.ideal_rainfall_min} - {crop.ideal_rainfall_max} mm/year
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditCrop(crop)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                            onClick={() => handleDeleteCrop(crop.id)}
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
              Showing {filteredCrops.length} of {crops.length} crops
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Crops;
