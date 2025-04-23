
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { Leaf, MapPin, Calendar, Box, TrendingUp, AlertTriangle, Cloud, IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";
import type { User } from "@supabase/supabase-js";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState({
    farmers: 0,
    farms: 0,
    crops: 0,
    cropCycles: 0,
    inventory: 0,
    tasks: 0,
    pendingTasks: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // In a real application, these would be actual database queries
        // For now, we'll use mock data

        // Simulate API calls
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setStats({
          farmers: 24,
          farms: 38,
          crops: 16,
          cropCycles: 42,
          inventory: 87,
          tasks: 53,
          pendingTasks: 12,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Sample data for charts with Indian crops
  const cropYieldData = [
    { name: "Rice", yield: 4.8 },
    { name: "Wheat", yield: 5.2 },
    { name: "Bajra", yield: 6.1 },
    { name: "Potato", yield: 21.4 },
    { name: "Sugarcane", yield: 18.3 },
  ];

  const marketPriceData = [
    { month: "Jan", wheat: 2800, rice: 5200, bajra: 3200 },
    { month: "Feb", wheat: 3000, rice: 5300, bajra: 3400 },
    { month: "Mar", wheat: 2700, rice: 5100, bajra: 3600 },
    { month: "Apr", wheat: 2900, rice: 5400, bajra: 3800 },
    { month: "May", wheat: 3100, rice: 5600, bajra: 4000 },
    { month: "Jun", wheat: 3200, rice: 5800, bajra: 4100 },
  ];

  const inventoryData = [
    { name: "Seeds", value: 25 },
    { name: "Fertilizers", value: 35 },
    { name: "Pesticides", value: 20 },
    { name: "Equipment", value: 15 },
    { name: "Other", value: 5 },
  ];

  const COLORS = ['#2D5A27', '#68A357', '#A67B5B', '#654321', '#87CEEB'];

  const upcomingTasks = [
    { id: 1, name: "Harvest Rice Field A", date: "2025-04-25", status: "pending" },
    { id: 2, name: "Apply Fertilizer to Bajra", date: "2025-04-26", status: "pending" },
    { id: 3, name: "Soil Testing Field B", date: "2025-04-27", status: "pending" },
    { id: 4, name: "Irrigation Maintenance", date: "2025-04-28", status: "pending" },
  ];

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your farming operations in India and key metrics.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center space-x-2">
              <Leaf className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm font-medium">Farmers</CardTitle>
            </div>
            <Link
              to="/farmers"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium text-primary"
            >
              View
            </Link>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.farmers}</div>
            <p className="text-xs text-muted-foreground">
              Registered farmers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm font-medium">Farms</CardTitle>
            </div>
            <Link
              to="/farms"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium text-primary"
            >
              View
            </Link>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.farms}</div>
            <p className="text-xs text-muted-foreground">
              Registered farms
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center space-x-2">
              <Leaf className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm font-medium">Crops</CardTitle>
            </div>
            <Link
              to="/crops"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium text-primary"
            >
              View
            </Link>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.crops}</div>
            <p className="text-xs text-muted-foreground">
              Different crop varieties
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm font-medium">Active Cycles</CardTitle>
            </div>
            <Link
              to="/crop-cycles"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium text-primary"
            >
              View
            </Link>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.cropCycles}</div>
            <p className="text-xs text-muted-foreground">
              Active crop growing cycles
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Crop Yields (tons/acre)</CardTitle>
            <CardDescription>Average yield for major Indian crops</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cropYieldData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="yield" fill="#2D5A27" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Market Price Trends (₹/quintal)</CardTitle>
            <CardDescription>Last 6 months price trends in Indian Rupees</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={marketPriceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${value}`, 'Price']} />
                  <Legend />
                  <Line type="monotone" dataKey="wheat" stroke="#2D5A27" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="rice" stroke="#68A357" />
                  <Line type="monotone" dataKey="bajra" stroke="#A67B5B" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Inventory Distribution</CardTitle>
            <CardDescription>Breakdown of inventory by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={inventoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {inventoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Upcoming Tasks</CardTitle>
              <Link
                to="/tasks"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium text-primary"
              >
                View All
              </Link>
            </div>
            <CardDescription>Scheduled tasks for the next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <div className="font-medium">{task.name}</div>
                    <div className="text-sm text-muted-foreground">{task.date}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                      {task.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weather and Alerts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center space-x-2">
              <Cloud className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm font-medium">Weather Forecast - Delhi</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-2 text-center">
              {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, idx) => (
                <div key={day} className="flex flex-col items-center border rounded p-2">
                  <div className="font-medium">{day}</div>
                  <Cloud className={`h-6 w-6 my-1 ${idx === 2 ? "text-blue-500" : "text-yellow-500"}`} />
                  <div className="text-sm">{32 + idx}°C</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <CardTitle className="text-sm font-medium">Alerts</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md bg-amber-50 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-amber-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-amber-800">Pest Alert</h3>
                    <div className="mt-2 text-sm text-amber-700">
                      <p>Increased aphid activity detected in Wheat fields near Agra. Consider inspection.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-md bg-blue-50 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Cloud className="h-5 w-5 text-blue-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Weather Advisory</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>Heavy rain expected in Punjab on Wednesday. Consider delaying fertilizer application.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
