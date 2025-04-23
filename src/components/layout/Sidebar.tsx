
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Leaf, 
  User, 
  MapPin, 
  Box, 
  Calendar, 
  TrendingUp, 
  ChartBar, 
  Cloud, 
  Thermometer,
  Package,
  Wand,
  Truck,
  Wrench,
  File
} from "lucide-react";

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}

function SidebarLink({ to, icon, label, active }: SidebarLinkProps) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

export function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <aside className="hidden md:flex bg-sidebar w-64 flex-col border-r">
      <div className="flex h-14 items-center border-b px-4">
        <Link to="/dashboard" className="flex items-center gap-2 font-semibold text-lg text-sidebar-foreground">
          <Leaf className="h-6 w-6" />
          <span>Crop Growth Compass</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2 px-4">
        <nav className="flex flex-col gap-1">
          <SidebarLink
            to="/dashboard"
            icon={<ChartBar className="h-4 w-4" />}
            label="Dashboard"
            active={pathname === "/dashboard"}
          />
          <SidebarLink
            to="/farmers"
            icon={<User className="h-4 w-4" />}
            label="Farmers"
            active={pathname === "/farmers"}
          />
          <SidebarLink
            to="/farms"
            icon={<MapPin className="h-4 w-4" />}
            label="Farms"
            active={pathname === "/farms"}
          />
          <SidebarLink
            to="/crops"
            icon={<Leaf className="h-4 w-4" />}
            label="Crops"
            active={pathname === "/crops"}
          />
          <SidebarLink
            to="/crop-cycles"
            icon={<Calendar className="h-4 w-4" />}
            label="Crop Cycles"
            active={pathname === "/crop-cycles"}
          />
          <SidebarLink
            to="/growth-records"
            icon={<TrendingUp className="h-4 w-4" />}
            label="Growth Records"
            active={pathname === "/growth-records"}
          />
          <SidebarLink
            to="/inventory"
            icon={<Box className="h-4 w-4" />}
            label="Inventory"
            active={pathname === "/inventory"}
          />
          <SidebarLink
            to="/suppliers"
            icon={<Truck className="h-4 w-4" />}
            label="Suppliers"
            active={pathname === "/suppliers"}
          />
          <SidebarLink
            to="/equipment"
            icon={<Wrench className="h-4 w-4" />}
            label="Equipment"
            active={pathname === "/equipment"}
          />
          <SidebarLink
            to="/market-prices"
            icon={<TrendingUp className="h-4 w-4" />}
            label="Market Prices"
            active={pathname === "/market-prices"}
          />
          <SidebarLink
            to="/weather"
            icon={<Cloud className="h-4 w-4" />}
            label="Weather"
            active={pathname === "/weather"}
          />
          <SidebarLink
            to="/soil"
            icon={<Thermometer className="h-4 w-4" />}
            label="Soil Analysis"
            active={pathname === "/soil"}
          />
          <SidebarLink
            to="/recommendations"
            icon={<Wand className="h-4 w-4" />}
            label="Recommendations"
            active={pathname === "/recommendations"}
          />
          <SidebarLink
            to="/reports"
            icon={<File className="h-4 w-4" />}
            label="Reports"
            active={pathname === "/reports"}
          />
        </nav>
      </div>
    </aside>
  );
}
