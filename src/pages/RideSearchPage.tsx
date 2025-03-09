import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import RideSearchForm, {
  SearchParams,
} from "@/components/search/RideSearchForm";
import RideSearchResults from "@/components/search/RideSearchResults";
import RideDetailsModal from "@/components/modals/RideDetailsModal";
import { useToast } from "@/components/ui/use-toast";

const RideSearchPage = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useState<SearchParams>(
    location.state?.searchParams || {
      startLocation: "",
      endLocation: "",
    },
  );
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRideId, setSelectedRideId] = useState<string>("");
  const [showRideDetails, setShowRideDetails] = useState(false);

  const handleSearch = (params: SearchParams) => {
    setSearchParams(params);
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleRideSelect = (rideId: string) => {
    setSelectedRideId(rideId);
    setShowRideDetails(true);
  };

  const handleBookRide = () => {
    setShowRideDetails(false);
    toast({
      title: "Ride Booked Successfully",
      description:
        "Your ride has been booked. You can see the status in your upcoming rides.",
    });
  };

  const handleContactDriver = () => {
    toast({
      title: "Message Sent",
      description: "You can continue the conversation in the messages tab.",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Find a Ride</h1>

        <div className="space-y-6">
          <RideSearchForm onSearch={handleSearch} className="mb-4" />

          <RideSearchResults
            searchParams={searchParams}
            onRideSelect={handleRideSelect}
            isLoading={isLoading}
          />
        </div>

        {showRideDetails && (
          <RideDetailsModal
            isOpen={showRideDetails}
            onClose={() => setShowRideDetails(false)}
            onBook={handleBookRide}
            onContact={handleContactDriver}
          />
        )}
      </div>
    </Layout>
  );
};

export default RideSearchPage;
