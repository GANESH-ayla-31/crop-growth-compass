
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Farmers from "./pages/Farmers";
import Farms from "./pages/Farms";
import Crops from "./pages/Crops";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./pages/PlaceholderPage"; // We'll create this next

// Layout
import { AppLayout } from "./components/layout/AppLayout";

// Initialize Supabase client and Query client
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes */}
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/farmers" element={<Farmers />} />
              <Route path="/farms" element={<Farms />} />
              <Route path="/crops" element={<Crops />} />
              
              {/* Added routes for all sidebar links */}
              <Route path="/crop-cycles" element={<PlaceholderPage title="Crop Cycles" />} />
              <Route path="/growth-records" element={<PlaceholderPage title="Growth Records" />} />
              <Route path="/inventory" element={<PlaceholderPage title="Inventory" />} />
              <Route path="/suppliers" element={<PlaceholderPage title="Suppliers" />} />
              <Route path="/equipment" element={<PlaceholderPage title="Equipment" />} />
              <Route path="/market-prices" element={<PlaceholderPage title="Market Prices" />} />
              <Route path="/weather" element={<PlaceholderPage title="Weather" />} />
              <Route path="/soil" element={<PlaceholderPage title="Soil Analysis" />} />
              <Route path="/recommendations" element={<PlaceholderPage title="Recommendations" />} />
              <Route path="/reports" element={<PlaceholderPage title="Reports" />} />
              <Route path="/tasks" element={<PlaceholderPage title="Tasks" />} />
            </Route>
            
            {/* Catch all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
