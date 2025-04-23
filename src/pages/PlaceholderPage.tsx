
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IndianRupee, MapPin, Leaf } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage = ({ title }: PlaceholderPageProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">
          Manage and track your {title.toLowerCase()} data
        </p>
      </div>

      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {title === "Market Prices" ? (
              <IndianRupee className="h-5 w-5" />
            ) : title === "Farms" || title === "Soil Analysis" ? (
              <MapPin className="h-5 w-5" />
            ) : (
              <Leaf className="h-5 w-5" />
            )}
            Welcome to {title}
          </CardTitle>
          <CardDescription>
            This section will help you manage all aspects of {title.toLowerCase()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-center space-y-3">
              <h3 className="text-lg font-medium">Indian Agricultural Data</h3>
              <p className="text-muted-foreground max-w-md">
                This section will display information related to {title.toLowerCase()} with data relevant to Indian agriculture and prices in Rupees. Content is coming soon!
              </p>
              {title === "Market Prices" && (
                <div className="mt-4 border rounded-md p-4">
                  <h4 className="font-medium">Sample Prices in Indian Markets</h4>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <div>
                      <p className="font-medium">Rice</p>
                      <p className="flex items-center"><IndianRupee className="h-3 w-3 mr-1" /> 2,500/quintal</p>
                    </div>
                    <div>
                      <p className="font-medium">Wheat</p>
                      <p className="flex items-center"><IndianRupee className="h-3 w-3 mr-1" /> 2,100/quintal</p>
                    </div>
                    <div>
                      <p className="font-medium">Sugarcane</p>
                      <p className="flex items-center"><IndianRupee className="h-3 w-3 mr-1" /> 350/quintal</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlaceholderPage;
