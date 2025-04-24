import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IndianRupee, MapPin, Leaf, Tractor, Cloud, ChartBar, Package, Thermometer, Calendar } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage = ({ title }: PlaceholderPageProps) => {
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
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { item: "Urea", category: "Fertilizer", quantity: "500 kg", status: "In Stock" },
                  { item: "Wheat Seeds", category: "Seeds", quantity: "200 kg", status: "Low Stock" },
                  { item: "Pesticides", category: "Chemicals", quantity: "100 L", status: "In Stock" },
                  { item: "Growth Promoters", category: "Supplements", quantity: "50 kg", status: "Out of Stock" },
                ].map((item) => (
                  <TableRow key={item.item}>
                    <TableCell>{item.item}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell className={
                      item.status === "In Stock" ? "text-green-600" :
                      item.status === "Low Stock" ? "text-amber-600" :
                      "text-red-600"
                    }>{item.status}</TableCell>
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
              { name: "Mahindra 575", type: "Tractor", status: "Active", location: "Punjab Farm" },
              { name: "John Deere Harvester", type: "Harvester", status: "Maintenance", location: "UP Farm" },
              { name: "Sprinkler System", type: "Irrigation", status: "Active", location: "Maharashtra Farm" },
              { name: "Seed Drill", type: "Planting", status: "Inactive", location: "Storage" },
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
                  <p>{equipment.location}</p>
                </CardContent>
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
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case "Growth Records":
        return (
          <div className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Crop</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Health</TableHead>
                  <TableHead>Last Inspection</TableHead>
                  <TableHead>Issues</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { crop: "Wheat - North Field", stage: "Vegetative", health: "Excellent", date: "2025-04-23", issues: "None" },
                  { crop: "Rice - East Field", stage: "Seedling", health: "Good", date: "2025-04-22", issues: "Minor pest presence" },
                  { crop: "Sugarcane - South Field", stage: "Maturation", health: "Fair", date: "2025-04-21", issues: "Water stress" },
                  { crop: "Cotton - West Field", stage: "Pre-sowing", health: "N/A", date: "2025-04-20", issues: "Soil preparation pending" },
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
              { name: "AgriSeeds India Ltd.", type: "Seeds", location: "Punjab", rating: "Preferred", lastOrder: "2025-03-15" },
              { name: "FertilizerCorp", type: "Fertilizers", location: "Maharashtra", rating: "Approved", lastOrder: "2025-04-01" },
              { name: "Green Equipment Co.", type: "Equipment", location: "Gujarat", rating: "Preferred", lastOrder: "2025-02-28" },
              { name: "Bio Pesticides Ltd.", type: "Pesticides", location: "Karnataka", rating: "Under Review", lastOrder: "2025-03-20" },
              { name: "Irrigation Systems Inc.", type: "Equipment", location: "Haryana", rating: "Approved", lastOrder: "2025-04-10" },
              { name: "Organic Nutrients Pvt.", type: "Fertilizers", location: "Tamil Nadu", rating: "New", lastOrder: "2025-04-15" },
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
                  </div>
                </CardContent>
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
    </div>
  );
};

export default PlaceholderPage;
