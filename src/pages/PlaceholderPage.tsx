
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { IndianRupee, MapPin, Leaf, Tractor, Cloud, ChartBar, Package, Thermometer, Calendar, Phone } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage = ({ title }: PlaceholderPageProps) => {
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState({ name: '', phone: '', email: '' });
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [records, setRecords] = useState<any[]>([]);
  
  useEffect(() => {
    // Load data from localStorage if available
    const storageKey = title.toLowerCase().replace(/\s+/g, '_');
    const storedData = localStorage.getItem(storageKey);
    if (storedData) {
      setRecords(JSON.parse(storedData));
    }
    
    // For Growth Records, set up interval to show real-time updates
    if (title === "Growth Records") {
      const interval = setInterval(() => {
        setLastUpdated(new Date());
      }, 60000); // Update every minute for demo purposes
      
      return () => clearInterval(interval);
    }
  }, [title]);
  
  const saveData = (newData: any[]) => {
    const storageKey = title.toLowerCase().replace(/\s+/g, '_');
    localStorage.setItem(storageKey, JSON.stringify(newData));
    setRecords(newData);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Message sent to ${currentContact.name}`);
    setIsContactDialogOpen(false);
  };

  const handleContactDealer = (name: string, phone: string = "+91 98765 43210", email: string = "contact@example.com") => {
    setCurrentContact({ name, phone, email });
    setIsContactDialogOpen(true);
  };

  const getIcon = () => {
    switch (title) {
      case "Market Prices":
        return <IndianRupee className="h-5 w-5" />;
      case "Farms":
      case "Soil Analysis":
        return <MapPin className="h-5 w-5" />;
      case "Equipment":
        return <Tractor className="h-5 w-5" />;
      case "Weather":
        return <Cloud className="h-5 w-5" />;
      case "Growth Records":
        return <ChartBar className="h-5 w-5" />;
      case "Inventory":
        return <Package className="h-5 w-5" />;
      case "Crop Cycles":
        return <Calendar className="h-5 w-5" />;
      default:
        return <Leaf className="h-5 w-5" />;
    }
  };

  const renderContent = () => {
    switch (title) {
      case "Market Prices":
        return (
          <div className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Crop</TableHead>
                  <TableHead>Market</TableHead>
                  <TableHead>Price (₹/quintal)</TableHead>
                  <TableHead>Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { crop: "Rice", market: "Azadpur Mandi, Delhi", price: 2800, trend: "↑" },
                  { crop: "Wheat", market: "Indore Mandi, MP", price: 2400, trend: "→" },
                  { crop: "Bajra", market: "Jaipur Mandi, Rajasthan", price: 2100, trend: "↓" },
                  { crop: "Sugarcane", market: "Pune Market, Maharashtra", price: 350, trend: "↑" },
                ].map((row) => (
                  <TableRow key={row.crop}>
                    <TableCell>{row.crop}</TableCell>
                    <TableCell>{row.market}</TableCell>
                    <TableCell>₹{row.price}</TableCell>
                    <TableCell className={row.trend === "↑" ? "text-green-600" : row.trend === "↓" ? "text-red-600" : ""}>{row.trend}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );

      case "Weather":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { city: "Delhi", temp: "32°C", condition: "Sunny", humidity: "65%" },
              { city: "Mumbai", temp: "29°C", condition: "Cloudy", humidity: "78%" },
              { city: "Bangalore", temp: "24°C", condition: "Rain", humidity: "82%" },
            ].map((weather) => (
              <Card key={weather.city}>
                <CardHeader>
                  <CardTitle className="text-lg">{weather.city}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{weather.temp}</p>
                  <p>{weather.condition}</p>
                  <p>Humidity: {weather.humidity}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case "Soil Analysis":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { region: "Punjab Plains", ph: "6.8", nitrogen: "High", phosphorus: "Medium" },
              { region: "Maharashtra Black Soil", ph: "7.2", nitrogen: "Medium", phosphorus: "High" },
              { region: "Karnataka Red Soil", ph: "6.5", nitrogen: "Low", phosphorus: "Medium" },
              { region: "UP Alluvial Soil", ph: "7.0", nitrogen: "High", phosphorus: "High" },
            ].map((soil) => (
              <Card key={soil.region}>
                <CardHeader>
                  <CardTitle className="text-lg">{soil.region}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>pH Level: {soil.ph}</p>
                  <p>Nitrogen: {soil.nitrogen}</p>
                  <p>Phosphorus: {soil.phosphorus}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case "Inventory":
        return (
          <div className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { item: "Urea", category: "Fertilizer", quantity: "500 kg", supplier: "IndiaFertCorp", status: "In Stock", phone: "+91 98765 12345" },
                  { item: "DAP", category: "Fertilizer", quantity: "300 kg", supplier: "FarmChem Ltd.", status: "In Stock", phone: "+91 98123 45678" },
                  { item: "Wheat Seeds", category: "Seeds", quantity: "200 kg", supplier: "AgriSeeds India", status: "Low Stock", phone: "+91 87654 32109" },
                  { item: "Rice Seeds", category: "Seeds", quantity: "150 kg", supplier: "NationalSeeds Co.", status: "Low Stock", phone: "+91 76543 21098" },
                  { item: "Pesticides", category: "Chemicals", quantity: "100 L", supplier: "BioShield Ltd.", status: "In Stock", phone: "+91 65432 10987" },
                  { item: "Fungicides", category: "Chemicals", quantity: "80 L", supplier: "PlantProtect Inc.", status: "In Stock", phone: "+91 54321 09876" },
                  { item: "Growth Promoters", category: "Supplements", quantity: "50 kg", supplier: "GreenGrow Inc.", status: "Out of Stock", phone: "+91 43210 98765" },
                  { item: "Micronutrients", category: "Supplements", quantity: "75 kg", supplier: "NutriSoil Corp", status: "Low Stock", phone: "+91 32109 87654" },
                  { item: "Organic Compost", category: "Fertilizer", quantity: "1000 kg", supplier: "OrganicFarms", status: "In Stock", phone: "+91 21098 76543" },
                ].map((item) => (
                  <TableRow key={item.item}>
                    <TableCell>{item.item}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.supplier}</TableCell>
                    <TableCell className={
                      item.status === "In Stock" ? "text-green-600" :
                      item.status === "Low Stock" ? "text-amber-600" :
                      "text-red-600"
                    }>{item.status}</TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleContactDealer(item.supplier, item.phone)}
                        className="flex items-center gap-1"
                      >
                        <Phone className="h-3 w-3" />
                        <span>Contact</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );

      case "Equipment":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Mahindra 575", type: "Tractor", status: "Active", location: "Punjab Farm", supplier: "Mahindra Tractors", contact: "+91 97531 86420" },
              { name: "John Deere Harvester", type: "Harvester", status: "Maintenance", location: "UP Farm", supplier: "John Deere India", contact: "+91 86420 97531" },
              { name: "Sprinkler System", type: "Irrigation", status: "Active", location: "Maharashtra Farm", supplier: "AquaIrri Systems", contact: "+91 75319 86420" },
              { name: "Seed Drill", type: "Planting", status: "Inactive", location: "Storage", supplier: "Swaraj Agri", contact: "+91 64208 75319" },
              { name: "Rotavator", type: "Tilling", status: "Active", location: "Karnataka Farm", supplier: "VST Tillers", contact: "+91 53197 64208" },
              { name: "Power Tiller", type: "Tilling", status: "Active", location: "Tamil Nadu Farm", supplier: "Kamco Ltd", contact: "+91 42086 53197" },
              { name: "Thresher", type: "Processing", status: "Maintenance", location: "Service Center", supplier: "Punjab Agro", contact: "+91 31975 42086" },
              { name: "Solar Pump", type: "Irrigation", status: "Active", location: "Gujarat Farm", supplier: "Shakti Pumps", contact: "+91 20864 31975" },
            ].map((equipment) => (
              <Card key={equipment.name}>
                <CardHeader>
                  <CardTitle className="text-lg">{equipment.name}</CardTitle>
                  <CardDescription>{equipment.type}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className={`font-semibold ${
                    equipment.status === "Active" ? "text-green-600" :
                    equipment.status === "Maintenance" ? "text-amber-600" :
                    "text-red-600"
                  }`}>{equipment.status}</p>
                  <p>Location: {equipment.location}</p>
                  <p className="mt-2">Supplier: {equipment.supplier}</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleContactDealer(equipment.supplier, equipment.contact)}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Phone className="h-3 w-3" />
                    <span>Contact Dealer</span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        );

      case "Crop Cycles":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { crop: "Wheat", field: "North Field", sowingDate: "2025-03-15", harvestDate: "2025-07-15", status: "growing", progress: "45%" },
              { crop: "Rice", field: "East Field", sowingDate: "2025-04-01", harvestDate: "2025-08-30", status: "sowing", progress: "10%" },
              { crop: "Sugarcane", field: "South Field", sowingDate: "2024-12-01", harvestDate: "2025-11-30", status: "growing", progress: "60%" },
              { crop: "Cotton", field: "West Field", sowingDate: "2025-04-10", harvestDate: "2025-10-15", status: "planned", progress: "0%" },
              { crop: "Bajra", field: "Central Field", sowingDate: "2025-03-20", harvestDate: "2025-06-20", status: "growing", progress: "40%" },
              { crop: "Maize", field: "Northwest Field", sowingDate: "2025-04-05", harvestDate: "2025-07-25", status: "sowing", progress: "5%" },
              { crop: "Soybean", field: "Southeast Field", sowingDate: "2025-05-10", harvestDate: "2025-09-10", status: "planned", progress: "0%" },
              { crop: "Pulses", field: "Southwest Field", sowingDate: "2025-03-25", harvestDate: "2025-06-25", status: "growing", progress: "35%" },
            ].map((cycle) => (
              <Card key={cycle.field}>
                <CardHeader>
                  <CardTitle className="text-lg">{cycle.crop}</CardTitle>
                  <CardDescription>{cycle.field}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p>Sowing: {cycle.sowingDate}</p>
                    <p>Expected Harvest: {cycle.harvestDate}</p>
                    <div className="flex items-center gap-2">
                      <span className={
                        cycle.status === "growing" ? "text-green-600" :
                        cycle.status === "sowing" ? "text-blue-600" :
                        "text-amber-600"
                      }>{cycle.status}</span>
                      <span className="text-sm text-muted-foreground">({cycle.progress} complete)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                      <div 
                        className="bg-green-600 h-2.5 rounded-full" 
                        style={{ width: cycle.progress }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case "Growth Records":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Last updated: {lastUpdated.toLocaleString()}
              </p>
              <Button 
                size="sm"
                onClick={() => setLastUpdated(new Date())}
              >
                Refresh
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Crop</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Health</TableHead>
                  <TableHead>Last Inspection</TableHead>
                  <TableHead>Issues</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { crop: "Wheat - North Field", stage: "Vegetative", health: "Excellent", date: "2025-04-23", issues: "None", update: "Growing at expected rate" },
                  { crop: "Rice - East Field", stage: "Seedling", health: "Good", date: "2025-04-22", issues: "Minor pest presence", update: "Applied organic pesticides" },
                  { crop: "Sugarcane - South Field", stage: "Maturation", health: "Fair", date: "2025-04-21", issues: "Water stress", update: "Increased irrigation cycle" },
                  { crop: "Cotton - West Field", stage: "Pre-sowing", health: "N/A", date: "2025-04-20", issues: "Soil preparation pending", update: "Scheduled for next week" },
                  { crop: "Bajra - Central Field", stage: "Vegetative", health: "Good", date: "2025-04-23", issues: "None", update: "Applied fertilizer today" },
                  { crop: "Maize - Northwest Field", stage: "Seedling", health: "Excellent", date: "2025-04-22", issues: "None", update: "Germination completed" },
                  { crop: "Pulses - Southwest Field", stage: "Flowering", health: "Good", date: "2025-04-21", issues: "Minor nutrient deficiency", update: "Applied foliar spray" },
                  { crop: "Soybean - Southeast Field", stage: "Land preparation", health: "N/A", date: "2025-04-24", issues: "None", update: "Soil testing completed" },
                ].map((record) => (
                  <TableRow key={record.crop}>
                    <TableCell>{record.crop}</TableCell>
                    <TableCell>{record.stage}</TableCell>
                    <TableCell className={
                      record.health === "Excellent" ? "text-green-600" :
                      record.health === "Good" ? "text-blue-600" :
                      record.health === "Fair" ? "text-amber-600" :
                      "text-gray-600"
                    }>{record.health}</TableCell>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.issues}</TableCell>
                    <TableCell>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {record.update}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );

      case "Suppliers":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "AgriSeeds India Ltd.", type: "Seeds", location: "Punjab", rating: "Preferred", lastOrder: "2025-03-15", contact: "Rajesh Kumar", phone: "+91 98765 43210", email: "sales@agriseeds.in" },
              { name: "FertilizerCorp", type: "Fertilizers", location: "Maharashtra", rating: "Approved", lastOrder: "2025-04-01", contact: "Amit Patel", phone: "+91 87654 32109", email: "orders@fertilizercorp.com" },
              { name: "Green Equipment Co.", type: "Equipment", location: "Gujarat", rating: "Preferred", lastOrder: "2025-02-28", contact: "Suresh Mehta", phone: "+91 76543 21098", email: "info@greenequip.co.in" },
              { name: "Bio Pesticides Ltd.", type: "Pesticides", location: "Karnataka", rating: "Under Review", lastOrder: "2025-03-20", contact: "Kavita Sharma", phone: "+91 65432 10987", email: "support@biopest.in" },
              { name: "Irrigation Systems Inc.", type: "Equipment", location: "Haryana", rating: "Approved", lastOrder: "2025-04-10", contact: "Vikram Singh", phone: "+91 54321 09876", email: "sales@irrigationsys.com" },
              { name: "Organic Nutrients Pvt.", type: "Fertilizers", location: "Tamil Nadu", rating: "New", lastOrder: "2025-04-15", contact: "Lakshmi Narayan", phone: "+91 43210 98765", email: "info@organicnutrients.in" },
              { name: "Bharat Seeds Corp.", type: "Seeds", location: "Uttar Pradesh", rating: "Preferred", lastOrder: "2025-03-25", contact: "Ravi Verma", phone: "+91 32109 87654", email: "orders@bharatseeds.co.in" },
              { name: "AgroChemicals Ltd.", type: "Chemicals", location: "Andhra Pradesh", rating: "Approved", lastOrder: "2025-04-05", contact: "Priya Reddy", phone: "+91 21098 76543", email: "support@agrochemicals.com" },
              { name: "Farm Machinery Ltd.", type: "Equipment", location: "Rajasthan", rating: "Preferred", lastOrder: "2025-03-30", contact: "Deepak Joshi", phone: "+91 10987 65432", email: "sales@farmmachinery.co.in" },
            ].map((supplier) => (
              <Card key={supplier.name}>
                <CardHeader>
                  <CardTitle className="text-lg">{supplier.name}</CardTitle>
                  <CardDescription>{supplier.type}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p>Location: {supplier.location}</p>
                    <p>Last Order: {supplier.lastOrder}</p>
                    <p className={
                      supplier.rating === "Preferred" ? "text-green-600" :
                      supplier.rating === "Approved" ? "text-blue-600" :
                      supplier.rating === "Under Review" ? "text-amber-600" :
                      "text-gray-600"
                    }>Status: {supplier.rating}</p>
                    <div className="mt-3 border-t pt-3">
                      <p className="font-medium">{supplier.contact}</p>
                      <p className="text-sm text-muted-foreground">{supplier.phone}</p>
                      <p className="text-sm text-muted-foreground">{supplier.email}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleContactDealer(supplier.name, supplier.phone, supplier.email)}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Contact Supplier</span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        );

      default:
        return (
          <div className="text-center space-y-3">
            <h3 className="text-lg font-medium">Indian Agricultural Data</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              This section will display detailed information about {title.toLowerCase()}
              related to Indian agriculture and farming practices.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          {getIcon()}
          {title}
        </h1>
        <p className="text-muted-foreground">
          Manage and track your {title.toLowerCase()} data for Indian agricultural operations
        </p>
      </div>

      <Card className="border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getIcon()}
            {title} Overview
          </CardTitle>
          <CardDescription>
            Current status and key metrics for {title.toLowerCase()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderContent()}
        </CardContent>
      </Card>

      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact {currentContact.name}</DialogTitle>
            <DialogDescription>
              Send a message to this supplier or dealer.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleContactSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <h3 className="font-medium">Contact Information:</h3>
                <p>Phone: {currentContact.phone}</p>
                <p>Email: {currentContact.email}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Your Message</Label>
                <Input id="message" placeholder="Enter your message..." />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsContactDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Send Message</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlaceholderPage;
