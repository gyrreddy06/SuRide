import React, { useState } from "react";
import { Car, ArrowLeft, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import RideCreationForm from "../forms/RideCreationForm";

interface OfferRidePanelProps {
  onRideCreated?: (rideData: any) => void;
  onCancel?: () => void;
  className?: string;
}

const OfferRidePanel = ({
  onRideCreated = () => {},
  onCancel = () => {},
  className = "",
}: OfferRidePanelProps) => {
  const [activeTab, setActiveTab] = useState("new");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRideSubmit = (formData: any) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onRideCreated(formData);
    }, 1500);
  };

  return (
    <div className={`w-full h-full bg-gray-50 p-4 md:p-6 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-2xl font-bold">Offer a Ride</h2>
        </div>

        <Tabs
          defaultValue="new"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 w-full max-w-md mb-6">
            <TabsTrigger value="new" className="flex items-center gap-2">
              <Car className="h-4 w-4" />
              New Ride
            </TabsTrigger>
            <TabsTrigger value="recurring" className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4" />
              Recurring Rides
            </TabsTrigger>
          </TabsList>

          {activeTab === "new" && (
            <div className="flex justify-center">
              <RideCreationForm onSubmit={handleRideSubmit} />
            </div>
          )}

          {activeTab === "recurring" && (
            <Card className="w-full max-w-[600px] mx-auto bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                  Create Recurring Rides
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-center space-y-4">
                  <Car className="h-16 w-16 mx-auto text-gray-300" />
                  <h3 className="text-lg font-medium">Coming Soon</h3>
                  <p className="text-gray-500 max-w-md">
                    The ability to create recurring rides is coming soon. This
                    feature will allow you to set up regular commutes and
                    schedule multiple rides at once.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("new")}
                    className="mt-4"
                  >
                    Create a Single Ride Instead
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </Tabs>

        {isSubmitting && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-[300px] p-4">
              <CardContent className="flex flex-col items-center justify-center py-6">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                <p className="text-center">Creating your ride...</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferRidePanel;
