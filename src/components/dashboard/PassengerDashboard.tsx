import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Calendar, Clock, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import RideCard from "@/components/dashboard/RideCard";
import RideDetailsModal from "@/components/modals/RideDetailsModal";
import { mockRides } from "@/data/mockData";

const PassengerDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRideId, setSelectedRideId] = useState<string>("");
  const [showRideDetails, setShowRideDetails] = useState(false);
  const [activeTab, setActiveTab] = useState("available");

  // Use mock rides data
  const rides = mockRides;

  const handleRideSelect = (rideId: string) => {
    setSelectedRideId(rideId);
    setShowRideDetails(true);
  };

  const handleBookRide = () => {
    setShowRideDetails(false);
    navigate("/ride-confirmation");
  };

  const handleContactDriver = () => {
    navigate("/messages");
  };

  const handleSearch = () => {
    navigate("/search");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Find a Ride</h1>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Where are you going?"
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
              <Button onClick={handleSearch}>Search</Button>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
          </div>
        </CardContent>
      </Card>

      <Tabs
        defaultValue="available"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="mb-4">
          <TabsTrigger value="available">Available Rides</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Trips</TabsTrigger>
          <TabsTrigger value="past">Past Rides</TabsTrigger>
        </TabsList>

        {activeTab === "available" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rides.map((ride) => (
              <RideCard
                key={ride.id}
                {...ride}
                onClick={() => handleRideSelect(ride.id)}
              />
            ))}
          </div>
        )}

        {activeTab === "upcoming" && (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <p className="text-lg font-medium">No upcoming trips</p>
            <p className="text-sm">Book a ride to see it here</p>
          </div>
        )}

        {activeTab === "past" && (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <p className="text-lg font-medium">No past rides</p>
            <p className="text-sm">Your ride history will appear here</p>
          </div>
        )}
      </Tabs>

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

export default PassengerDashboard;
