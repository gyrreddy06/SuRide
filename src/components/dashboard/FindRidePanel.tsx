import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import RideFilters from "./RideFilters";
import RideMap from "./RideMap";
import RideList from "./RideList";
import { getRides } from "@/lib/api";
import { useSupabaseData } from "@/hooks/useSupabaseData";
import RideSearchForm from "@/components/search/RideSearchForm";

interface Route {
  id: string;
  startLocation: {
    id: string;
    name: string;
    lat: number;
    lng: number;
  };
  endLocation: {
    id: string;
    name: string;
    lat: number;
    lng: number;
  };
  driverId: string;
  price: number;
}

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

interface FilterValues {
  date: Date | undefined;
  vehicleType: string;
  minPrice: number;
  maxPrice: number;
}

interface FindRidePanelProps {
  className?: string;
  onRideSelect?: (rideId: string) => void;
}

const FindRidePanel = ({
  className = "",
  onRideSelect = () => {},
}: FindRidePanelProps) => {
  const navigate = useNavigate();
  const [selectedRouteId, setSelectedRouteId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<FilterValues>({
    date: undefined,
    vehicleType: "",
    minPrice: 0,
    maxPrice: 100,
  });

  // Fetch rides from Supabase
  const { data: ridesData, loading: ridesLoading } = useSupabaseData(
    getRides,
    [],
  );
  const [filteredRides, setFilteredRides] = useState<Ride[]>([]);

  // Sample routes data for the map
  const routes: Route[] = [
    {
      id: "1",
      startLocation: {
        id: "start1",
        name: "San Francisco",
        lat: 37.7749,
        lng: -122.4194,
      },
      endLocation: {
        id: "end1",
        name: "Los Angeles",
        lat: 34.0522,
        lng: -118.2437,
      },
      driverId: "driver1",
      price: 45,
    },
    {
      id: "2",
      startLocation: {
        id: "start2",
        name: "New York",
        lat: 40.7128,
        lng: -74.006,
      },
      endLocation: {
        id: "end2",
        name: "Boston",
        lat: 42.3601,
        lng: -71.0589,
      },
      driverId: "driver2",
      price: 35,
    },
    {
      id: "3",
      startLocation: {
        id: "start3",
        name: "Chicago",
        lat: 41.8781,
        lng: -87.6298,
      },
      endLocation: {
        id: "end3",
        name: "Detroit",
        lat: 42.3314,
        lng: -83.0458,
      },
      driverId: "driver3",
      price: 30,
    },
  ];

  // Process rides data from Supabase
  useEffect(() => {
    if (ridesData && ridesData.length > 0) {
      // Transform the data to match our Ride interface
      const transformedRides = ridesData.map((ride: any) => ({
        id: ride.id,
        startLocation: ride.start_location,
        endLocation: ride.end_location,
        date: ride.date,
        time: ride.time,
        price: ride.price,
        availableSeats: ride.available_seats,
        driverName: ride.profiles?.full_name || "Unknown Driver",
        driverRating: ride.profiles?.rating || 4.5,
        driverAvatar:
          ride.profiles?.avatar_url ||
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${ride.id}`,
        vehicleType: ride.vehicle_type,
      }));

      setFilteredRides(transformedRides);
    } else {
      // Fallback to sample data if no rides are found
      setFilteredRides(sampleRides);
    }
  }, [ridesData]);

  // Sample rides data for the list (fallback)
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
  ];

  const handleRouteSelect = (routeId: string) => {
    setSelectedRouteId(routeId);
    // In a real app, you might want to filter rides based on the selected route
  };

  const handleRideSelect = (rideId: string) => {
    // Pass the selected ride ID to the parent component
    onRideSelect(rideId);
  };

  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
    // Simulate loading when filters change
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  const handleSearch = (searchParams) => {
    navigate("/ride-search", { state: { searchParams } });
  };

  return (
    <Card className={`w-full h-full bg-white overflow-hidden ${className}`}>
      <div className="flex flex-col h-full">
        {/* Search form */}
        <div className="p-4 border-b">
          <RideSearchForm onSearch={handleSearch} />
        </div>

        {/* Filters section */}
        <div className="p-4 border-b">
          <RideFilters onFilterChange={handleFilterChange} />
        </div>

        {/* Map section */}
        <div className="p-4 border-b">
          <RideMap
            routes={routes}
            selectedRouteId={selectedRouteId}
            onRouteSelect={handleRouteSelect}
          />
        </div>

        {/* Ride list section */}
        <div className="flex-1 overflow-hidden">
          <RideList
            rides={filteredRides}
            onRideSelect={handleRideSelect}
            isLoading={isLoading || ridesLoading}
          />
        </div>
      </div>
    </Card>
  );
};

export default FindRidePanel;
