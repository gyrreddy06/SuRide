import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockRides } from "@/data/mockData";
import {
  Plus,
  Calendar,
  Clock,
  DollarSign,
  Users,
  Car,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const DriverDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("active");

  // Filter rides where current user is the driver (user1 - Alex Johnson)
  const activeRides = mockRides
    .filter((ride) => ride.driverId === "user1" && ride.status === "active")
    .map((ride) => ({
      id: ride.id,
      startLocation: ride.startLocation,
      endLocation: ride.endLocation,
      date: ride.date,
      time: ride.time,
      price: ride.price,
      availableSeats: ride.availableSeats,
      bookedSeats: Math.floor(Math.random() * 3), // Random number for demo
      status: ride.status,
    }));

  const pastRides = [
    {
      id: "3",
      startLocation: "Chicago, IL",
      endLocation: "Detroit, MI",
      date: "May 10, 2023",
      time: "09:15 AM",
      price: 30,
      availableSeats: 0,
      bookedSeats: 4,
      status: "completed",
      earnings: 120,
    },
    {
      id: "4",
      startLocation: "Seattle, WA",
      endLocation: "Portland, OR",
      date: "May 5, 2023",
      time: "07:45 AM",
      price: 25,
      availableSeats: 0,
      bookedSeats: 2,
      status: "completed",
      earnings: 50,
    },
  ];

  const handleCreateRide = () => {
    navigate("/offer-ride");
  };

  const handleViewRideDetails = (rideId: string) => {
    navigate(`/ride/${rideId}`);
  };

  // Calculate earnings
  const totalEarnings = pastRides.reduce((sum, ride) => sum + ride.earnings, 0);
  const totalRides = pastRides.length;
  const totalPassengers = pastRides.reduce(
    (sum, ride) => sum + ride.bookedSeats,
    0,
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Driver Dashboard</h1>
        <Button onClick={handleCreateRide} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Ride
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Earnings</p>
                <p className="text-2xl font-bold text-green-600">
                  ${totalEarnings}
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Rides</p>
                <p className="text-2xl font-bold">{totalRides}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Car className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Passengers</p>
                <p className="text-2xl font-bold">{totalPassengers}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs
        defaultValue="active"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="mb-4">
          <TabsTrigger value="active">Active Rides</TabsTrigger>
          <TabsTrigger value="past">Past Rides</TabsTrigger>
        </TabsList>

        {activeTab === "active" && (
          <div className="space-y-4">
            {activeRides.length > 0 ? (
              activeRides.map((ride) => (
                <Card
                  key={ride.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleViewRideDetails(ride.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200"
                          >
                            Active
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {ride.date} • {ride.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">
                            {ride.startLocation} → {ride.endLocation}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mt-3 md:mt-0">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">
                            {ride.bookedSeats}/
                            {ride.bookedSeats + ride.availableSeats} booked
                          </span>
                        </div>
                        <div className="flex items-center gap-1 font-medium text-green-600">
                          <DollarSign className="h-4 w-4" />
                          <span>${ride.price}/seat</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <Car className="h-12 w-12 text-gray-300 mb-2" />
                <p className="text-lg font-medium">No active rides</p>
                <p className="text-sm">Create a ride to start earning</p>
                <Button onClick={handleCreateRide} className="mt-4">
                  Create Ride
                </Button>
              </div>
            )}
          </div>
        )}

        {activeTab === "past" && (
          <div className="space-y-4">
            {pastRides.length > 0 ? (
              pastRides.map((ride) => (
                <Card
                  key={ride.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleViewRideDetails(ride.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="bg-gray-50 text-gray-700 border-gray-200"
                          >
                            Completed
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {ride.date} • {ride.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">
                            {ride.startLocation} → {ride.endLocation}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mt-3 md:mt-0">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">
                            {ride.bookedSeats} passengers
                          </span>
                        </div>
                        <div className="flex items-center gap-1 font-medium text-green-600">
                          <DollarSign className="h-4 w-4" />
                          <span>${ride.earnings} earned</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <p className="text-lg font-medium">No past rides</p>
                <p className="text-sm">Your ride history will appear here</p>
              </div>
            )}
          </div>
        )}
      </Tabs>
    </div>
  );
};

export default DriverDashboard;
