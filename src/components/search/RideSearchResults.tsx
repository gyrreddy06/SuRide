import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import RideCard from "@/components/dashboard/RideCard";
import RideMap from "@/components/dashboard/RideMap";
import { SearchParams } from "./RideSearchForm";
import { RideCardSkeleton } from "@/components/LoadingState";

interface Ride {
  id: string;
  startLocation: string;
  endLocation: string;
  date: string;
  time: string;
  price: number;
  availableSeats: number;
  driverName: string;
  driverRating: number;
  driverAvatar: string;
  vehicleType: string;
}

interface RideSearchResultsProps {
  searchParams?: SearchParams;
  onRideSelect?: (rideId: string) => void;
  isLoading?: boolean;
  className?: string;
}

const RideSearchResults = ({
  searchParams,
  onRideSelect = () => {},
  isLoading = false,
  className = "",
}: RideSearchResultsProps) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("list");
  const [filteredRides, setFilteredRides] = useState<Ride[]>([]);

  // Get search params from location state if not provided as prop
  const params = searchParams ||
    location.state?.searchParams || {
      startLocation: "",
      endLocation: "",
    };

  // Sample rides data (in a real app, this would come from an API)
  const sampleRides: Ride[] = [
    {
      id: "1",
      startLocation: "San Francisco, CA",
      endLocation: "Los Angeles, CA",
      date: "May 15, 2023",
      time: "08:00 AM",
      price: 45,
      availableSeats: 3,
      driverName: "Alex Johnson",
      driverRating: 4.8,
      driverAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      vehicleType: "SUV",
    },
    {
      id: "2",
      startLocation: "New York, NY",
      endLocation: "Boston, MA",
      date: "May 16, 2023",
      time: "10:30 AM",
      price: 35,
      availableSeats: 2,
      driverName: "Sarah Miller",
      driverRating: 4.9,
      driverAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      vehicleType: "Sedan",
    },
    {
      id: "3",
      startLocation: "Chicago, IL",
      endLocation: "Detroit, MI",
      date: "May 17, 2023",
      time: "09:15 AM",
      price: 30,
      availableSeats: 4,
      driverName: "Michael Brown",
      driverRating: 4.7,
      driverAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      vehicleType: "Minivan",
    },
    {
      id: "4",
      startLocation: "Seattle, WA",
      endLocation: "Portland, OR",
      date: "May 18, 2023",
      time: "07:45 AM",
      price: 25,
      availableSeats: 2,
      driverName: "Emily Wilson",
      driverRating: 4.6,
      driverAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      vehicleType: "Hybrid",
    },
  ];

  // Filter rides based on search parameters
  useEffect(() => {
    // Simulate API call with loading state
    setFilteredRides([]);

    // In a real app, this would be an API call with the search parameters
    setTimeout(() => {
      const filtered = sampleRides.filter((ride) => {
        // Filter by destination
        if (
          params.endLocation &&
          !ride.endLocation
            .toLowerCase()
            .includes(params.endLocation.toLowerCase())
        ) {
          return false;
        }

        // Filter by starting point
        if (
          params.startLocation &&
          !ride.startLocation
            .toLowerCase()
            .includes(params.startLocation.toLowerCase())
        ) {
          return false;
        }

        // Filter by date (simplified for demo)
        if (params.date) {
          const searchDate = new Date(params.date).toLocaleDateString();
          const rideDate = new Date(ride.date).toLocaleDateString();
          if (searchDate !== rideDate) {
            return false;
          }
        }

        return true;
      });

      setFilteredRides(filtered);
    }, 1000);
  }, [params]);

  return (
    <div className={`w-full bg-white rounded-lg shadow-sm ${className}`}>
      <Tabs defaultValue="list" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
        </TabsList>

        <div className="mt-4">
          {activeTab === "list" && (
            <div className="p-4">
              {isLoading || filteredRides.length === 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {isLoading ? (
                    // Show skeletons while loading
                    Array(4)
                      .fill(0)
                      .map((_, i) => <RideCardSkeleton key={i} />)
                  ) : (
                    // Show no results message
                    <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-500">
                      <p className="text-lg font-medium">No rides found</p>
                      <p className="text-sm">
                        Try adjusting your search criteria
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <ScrollArea className="h-[calc(100vh-250px)]">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredRides.map((ride) => (
                      <RideCard
                        key={ride.id}
                        {...ride}
                        onClick={() => onRideSelect(ride.id)}
                      />
                    ))}
                  </div>
                </ScrollArea>
              )}
            </div>
          )}

          {activeTab === "map" && (
            <div className="h-[calc(100vh-200px)]">
              <RideMap />
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default RideSearchResults;
