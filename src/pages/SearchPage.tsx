import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Calendar, Clock, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import RideCard from "@/components/dashboard/RideCard";
import RideDetailsModal from "@/components/modals/RideDetailsModal";
import RideMap from "@/components/dashboard/RideMap";

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("list");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRideId, setSelectedRideId] = useState<string>("");
  const [showRideDetails, setShowRideDetails] = useState(false);

  // Sample rides data
  const rides = [
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

  const handleRideSelect = (rideId: string) => {
    setSelectedRideId(rideId);
    setShowRideDetails(true);
  };

  const handleBookRide = () => {
    setShowRideDetails(false);
    navigate("/");
    // In a real app, you would show the active ride status
  };

  const handleContactDriver = () => {
    navigate("/messages");
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-2xl font-bold mb-4">Find a Ride</h1>

      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search destinations..."
                className="pl-9 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">From</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Starting point" className="pl-9" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">To</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Destination" className="pl-9" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input type="date" className="pl-9" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input type="time" className="pl-9" />
                </div>
              </div>
            </div>
          )}

          <Tabs
            defaultValue="list"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="map">Map View</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      <TabsContent value="list" className="mt-0" hidden={activeTab !== "list"}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rides.map((ride) => (
            <RideCard
              key={ride.id}
              {...ride}
              onClick={() => handleRideSelect(ride.id)}
            />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="map" className="mt-0" hidden={activeTab !== "map"}>
        <div className="h-[calc(100vh-250px)]">
          <RideMap />
        </div>
      </TabsContent>

      {showRideDetails && (
        <RideDetailsModal
          isOpen={showRideDetails}
          onClose={() => setShowRideDetails(false)}
          onBook={handleBookRide}
          onContact={handleContactDriver}
        />
      )}
    </div>
  );
};

export default SearchPage;
