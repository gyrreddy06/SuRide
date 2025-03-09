import React, { useState, useEffect } from "react";
import { MapPin, Navigation, Car } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

interface Route {
  id: string;
  startLocation: Location;
  endLocation: Location;
  waypoints?: Location[];
  driverId: string;
  price: number;
}

interface RideMapProps {
  routes?: Route[];
  selectedRouteId?: string;
  onRouteSelect?: (routeId: string) => void;
  userLocation?: { lat: number; lng: number };
  zoom?: number;
}

const RideMap = ({
  routes = [
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
  ],
  selectedRouteId = "",
  onRouteSelect = () => {},
  userLocation = { lat: 39.8283, lng: -98.5795 }, // Center of US as default
  zoom = 4,
}: RideMapProps) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("map");

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="w-full h-[400px] bg-slate-100 overflow-hidden relative">
      <CardContent className="p-0 h-full">
        <Tabs
          defaultValue="map"
          value={activeTab}
          onValueChange={setActiveTab}
          className="h-full"
        >
          <div className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm rounded-md shadow-md">
            <TabsList>
              <TabsTrigger value="map">Map</TabsTrigger>
              <TabsTrigger value="satellite">Satellite</TabsTrigger>
              <TabsTrigger value="traffic">Traffic</TabsTrigger>
            </TabsList>
          </div>

          {activeTab === "map" && (
            <div className="p-0">
              {/* Map container */}
              <div className="w-full h-full bg-slate-200 relative">
                {/* Simulated map with gradient background */}
                <div
                  className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: mapLoaded ? 1 : 0.3,
                    transition: "opacity 0.5s ease-in-out",
                  }}
                >
                  {!mapLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
                      <p className="ml-3 text-blue-700 font-medium">
                        Loading map...
                      </p>
                    </div>
                  )}

                  {/* Route lines and markers */}
                  {mapLoaded &&
                    routes.map((route) => (
                      <div key={route.id} className="absolute inset-0">
                        {/* Simulated route line */}
                        <div
                          className={`absolute h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transform rotate-45 rounded-full ${
                            selectedRouteId === route.id
                              ? "opacity-100"
                              : "opacity-50"
                          }`}
                          style={{
                            width: "60%",
                            left: "20%",
                            top: "50%",
                            transform: `rotate(${Math.random() * 90 - 45}deg)`,
                            boxShadow:
                              selectedRouteId === route.id
                                ? "0 0 8px rgba(59, 130, 246, 0.5)"
                                : "none",
                          }}
                          onClick={() => onRouteSelect(route.id)}
                        ></div>

                        {/* Start location marker */}
                        <div
                          className={`absolute p-1 rounded-full bg-green-500 border-2 ${
                            selectedRouteId === route.id
                              ? "border-white"
                              : "border-green-300"
                          } cursor-pointer transform hover:scale-110 transition-transform`}
                          style={{
                            left: `${20 + Math.random() * 20}%`,
                            top: `${30 + Math.random() * 20}%`,
                          }}
                          onClick={() => onRouteSelect(route.id)}
                          title={`${route.startLocation.name} (Pickup point)`}
                        >
                          <MapPin className="h-4 w-4 text-white" />
                        </div>

                        {/* End location marker */}
                        <div
                          className={`absolute p-1 rounded-full bg-red-500 border-2 ${
                            selectedRouteId === route.id
                              ? "border-white"
                              : "border-red-300"
                          } cursor-pointer transform hover:scale-110 transition-transform`}
                          style={{
                            left: `${60 + Math.random() * 20}%`,
                            top: `${40 + Math.random() * 20}%`,
                          }}
                          onClick={() => onRouteSelect(route.id)}
                          title={`${route.endLocation.name} (Dropoff point)`}
                        >
                          <MapPin className="h-4 w-4 text-white" />
                        </div>

                        {/* Car icon for active rides */}
                        {selectedRouteId === route.id && (
                          <div
                            className="absolute p-1 rounded-full bg-blue-600 border-2 border-white animate-pulse"
                            style={{
                              left: "40%",
                              top: "45%",
                            }}
                          >
                            <Car className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                    ))}

                  {/* User location */}
                  {mapLoaded && (
                    <div
                      className="absolute p-1.5 rounded-full bg-blue-600 border-2 border-white shadow-lg cursor-pointer z-10 animate-pulse"
                      style={{
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                      title="Your Location"
                    >
                      <Navigation className="h-5 w-5 text-white" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "satellite" && (
            <div className="p-0">
              <div className="w-full h-full bg-slate-200 relative">
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1569336415962-a4bd9f69c07b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: mapLoaded ? 1 : 0.3,
                    transition: "opacity 0.5s ease-in-out",
                  }}
                >
                  {!mapLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
                      <p className="ml-3 text-blue-700 font-medium">
                        Loading satellite view...
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "traffic" && (
            <div className="p-0">
              <div className="w-full h-full bg-slate-200 relative">
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1594489573800-dbe5626eb89d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: mapLoaded ? 1 : 0.3,
                    transition: "opacity 0.5s ease-in-out",
                  }}
                >
                  {!mapLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
                      <p className="ml-3 text-blue-700 font-medium">
                        Loading traffic data...
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </Tabs>

        {/* Map controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <Button
            size="icon"
            variant="secondary"
            className="bg-white/90 hover:bg-white shadow-md"
          >
            <span className="text-lg font-bold">+</span>
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="bg-white/90 hover:bg-white shadow-md"
          >
            <span className="text-lg font-bold">-</span>
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="bg-white/90 hover:bg-white shadow-md"
          >
            <Navigation className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RideMap;
