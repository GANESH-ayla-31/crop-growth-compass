
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Leaf, ChartBar, MapPin, User, Package, Calendar, Wand } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <header className="container mx-auto py-8 md:py-16 px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900 px-3 py-1 text-sm font-medium text-green-800 dark:text-green-300">
              <span>Agriculture Management Solution</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="text-farm-green-dark">Crop Growth</span> Compass
            </h1>
            <p className="text-xl text-muted-foreground">
              Complete farming database management system to optimize your agricultural operations, track growth, and maximize yields.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/login">
                <Button size="lg" className="bg-farm-green-dark hover:bg-farm-green-light text-white">
                  Get Started
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-lg h-64 md:h-80 rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80"
                alt="Farming landscape"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="bg-white dark:bg-gray-900 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Complete Farming Management</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Streamline your agricultural operations with our comprehensive system that tracks everything from crops to market prices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 border rounded-lg bg-card">
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                <User className="h-6 w-6 text-farm-green-dark dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Farmer Management</h3>
              <p className="text-muted-foreground">
                Maintain detailed records of all farmers, their farms, and contact information.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 border rounded-lg bg-card">
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6 text-farm-green-dark dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Crop Database</h3>
              <p className="text-muted-foreground">
                Track detailed information about crops, varieties, and ideal growing conditions.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 border rounded-lg bg-card">
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-farm-green-dark dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Growth Tracking</h3>
              <p className="text-muted-foreground">
                Monitor crop cycles from planting to harvest with detailed growth stage tracking.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 border rounded-lg bg-card">
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-farm-green-dark dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Inventory Management</h3>
              <p className="text-muted-foreground">
                Track seeds, fertilizers, pesticides, and equipment with detailed inventory records.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 border rounded-lg bg-card">
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                <ChartBar className="h-6 w-6 text-farm-green-dark dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Market Analysis</h3>
              <p className="text-muted-foreground">
                Keep track of market prices for crops to optimize selling decisions.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 border rounded-lg bg-card">
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                <Wand className="h-6 w-6 text-farm-green-dark dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Recommendations</h3>
              <p className="text-muted-foreground">
                Receive personalized farming recommendations based on soil conditions and crop data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-farm-green-dark text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to optimize your farming operations?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join Crop Growth Compass today and transform how you manage your agricultural business.
          </p>
          <Link to="/login">
            <Button size="lg" variant="secondary" className="bg-white text-farm-green-dark hover:bg-gray-100">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Leaf className="h-6 w-6 mr-2" />
              <span className="text-lg font-semibold">Crop Growth Compass</span>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                About
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Features
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Contact
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Crop Growth Compass. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
