import React, { useState } from "react";
import { Search, Filter, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RideCard from "./RideCard";
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

interface RideListProps {
  rides?: Ride[];
  onRideSelect?: (rideId: string) => void;
  isLoading?: boolean;
}

const RideList = ({
  rides = [
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
    {
      id: "5",
      startLocation: "Austin, TX",
      endLocation: "Houston, TX",
      date: "May 19, 2023",
      time: "11:00 AM",
      price: 28,
      availableSeats: 3,
      driverName: "David Garcia",
      driverRating: 4.9,
      driverAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      vehicleType: "Electric",
    },
  ],
  onRideSelect = (id) => console.log(`Selected ride: ${id}`),
  isLoading = false,
}: RideListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Filter rides based on search term
  const filteredRides = rides.filter((ride) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      ride.startLocation.toLowerCase().includes(searchLower) ||
      ride.endLocation.toLowerCase().includes(searchLower) ||
      ride.driverName.toLowerCase().includes(searchLower)
    );
  });

  // Filter rides based on view mode
  const displayRides =
    activeTab === "all"
      ? filteredRides
      : activeTab === "today"
        ? filteredRides.filter((ride) => ride.date === "May 15, 2023") // Just for demo
        : filteredRides.filter((ride) => ride.price < 30); // Just for demo

  return (
    <div className="w-full h-full bg-gray-50 flex flex-col">
      <div className="p-4 border-b bg-white">
        <div className="flex items-center gap-2 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by location or driver"
              className="pl-9 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="shrink-0">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="all" onClick={() => setActiveTab("all")}>
              All Rides
            </TabsTrigger>
            <TabsTrigger value="today" onClick={() => setActiveTab("today")}>
              Today
            </TabsTrigger>
            <TabsTrigger value="budget" onClick={() => setActiveTab("budget")}>
              Budget
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {isLoading ? (
        <div className="flex-1 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <RideCardSkeleton key={i} />
            ))}
          </div>
        </div>
      ) : displayRides.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <MapPin className="h-12 w-12 text-gray-300 mb-2" />
          <h3 className="text-lg font-medium text-gray-900">No rides found</h3>
          <p className="text-gray-500 text-center mt-1">
            Try adjusting your search or filters to find available rides
          </p>
        </div>
      ) : (
        <ScrollArea className="flex-1 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-4">
            {displayRides.map((ride) => (
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
  );
};

export default RideList;
