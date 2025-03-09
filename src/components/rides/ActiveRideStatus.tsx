import React, { useState, useEffect } from "react";
import {
  MapPin,
  Navigation,
  Car,
  Phone,
  MessageSquare,
  AlertTriangle,
  Clock,
  User,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ActiveRideStatusProps {
  rideId?: string;
  driverName?: string;
  driverAvatar?: string;
  driverRating?: number;
  driverPhone?: string;
  startLocation?: string;
  endLocation?: string;
  startTime?: string;
  estimatedArrival?: string;
  currentLocation?: string;
  progress?: number;
  status?: "waiting" | "in_progress" | "arriving" | "completed";
  onSendMessage?: () => void;
  onCallDriver?: () => void;
  onSOS?: () => void;
  onCancel?: () => void;
}

const ActiveRideStatus = ({
  rideId = "R-12345",
  driverName = "Michael Chen",
  driverAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
  driverRating = 4.9,
  driverPhone = "+1 (555) 123-4567",
  startLocation = "123 Main St, San Francisco, CA",
  endLocation = "456 Market St, San Francisco, CA",
  startTime = "10:30 AM",
  estimatedArrival = "11:15 AM",
  currentLocation = "Approaching Pine Street",
  progress = 65,
  status = "in_progress",
  onSendMessage = () => {},
  onCallDriver = () => {},
  onSOS = () => {},
  onCancel = () => {},
}: ActiveRideStatusProps) => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [activeTab, setActiveTab] = useState("status");

  useEffect(() => {
    // Update current time every minute
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  const getStatusBadge = () => {
    switch (status) {
      case "waiting":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200"
          >
            Waiting for driver
          </Badge>
        );
      case "in_progress":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            In progress
          </Badge>
        );
      case "arriving":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Arriving soon
          </Badge>
        );
      case "completed":
        return (
          <Badge
            variant="outline"
            className="bg-gray-50 text-gray-700 border-gray-200"
          >
            Completed
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Active Ride</CardTitle>
          {getStatusBadge()}
        </div>
        <div className="text-sm text-gray-500">
          Ride #{rideId} • Current time: {currentTime || "--:--"}
        </div>
      </CardHeader>

      <Tabs
        defaultValue="status"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="w-full">
          <TabsTrigger value="status">Status</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>

        {activeTab === "status" && (
          <div className="p-4">
            {/* Driver info */}
            <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
              <Avatar className="h-12 w-12 border-2 border-primary">
                <AvatarImage src={driverAvatar} alt={driverName} />
                <AvatarFallback>{driverName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-medium">{driverName}</div>
                <div className="text-sm text-gray-500 flex items-center">
                  <span className="flex items-center">★ {driverRating}</span>
                  <span className="mx-2">•</span>
                  <Car className="h-3 w-3 mr-1" /> Toyota Camry (White)
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={onCallDriver}
                  title="Call driver"
                >
                  <Phone className="h-4 w-4" />
                </Button>

                <Button
                  size="icon"
                  variant="outline"
                  onClick={onSendMessage}
                  title="Message driver"
                >
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Ride progress */}
            <div className="space-y-2 mt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Ride progress</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />

              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" /> Started: {startTime}
                </div>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" /> ETA: {estimatedArrival}
                </div>
              </div>
            </div>

            {/* Route details */}
            <div className="space-y-3 bg-gray-50 p-3 rounded-lg mt-4">
              <div className="flex items-start space-x-3">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <MapPin className="h-3 w-3 text-green-600" />
                  </div>
                  <div className="w-0.5 h-10 bg-gray-200 my-1"></div>
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                    <MapPin className="h-3 w-3 text-red-600" />
                  </div>
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <div className="font-medium text-sm">Pickup</div>
                    <div className="text-xs text-gray-500">{startLocation}</div>
                  </div>
                  <div>
                    <div className="font-medium text-sm">Destination</div>
                    <div className="text-xs text-gray-500">{endLocation}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Current status */}
            <div className="bg-blue-50 p-3 rounded-lg mt-4">
              <div className="flex items-center">
                <Navigation className="h-4 w-4 text-blue-600 mr-2" />
                <div>
                  <div className="text-sm font-medium text-blue-700">
                    Current Location
                  </div>
                  <div className="text-xs text-blue-600">{currentLocation}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "details" && (
          <div className="p-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Ride Details</h3>
                <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Ride ID</span>
                    <span className="text-sm font-medium">{rideId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Status</span>
                    <span className="text-sm font-medium">
                      {status.replace("_", " ").charAt(0).toUpperCase() +
                        status.replace("_", " ").slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Start Time</span>
                    <span className="text-sm font-medium">{startTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">
                      Estimated Arrival
                    </span>
                    <span className="text-sm font-medium">
                      {estimatedArrival}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Driver Information</h3>
                <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Name</span>
                    <span className="text-sm font-medium">{driverName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Rating</span>
                    <span className="text-sm font-medium">
                      ★ {driverRating}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Phone</span>
                    <span className="text-sm font-medium">{driverPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Vehicle</span>
                    <span className="text-sm font-medium">
                      Toyota Camry (White)
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Safety Tips</h3>
                <div className="bg-gray-50 p-3 rounded-lg space-y-2 text-sm text-gray-600">
                  <p>
                    • Verify the driver's identity before entering the vehicle
                  </p>
                  <p>
                    • Share your ride details with a friend or family member
                  </p>
                  <p>• Always wear your seatbelt during the ride</p>
                  <p>• Use the SOS button in case of emergency</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Tabs>

      <Separator />

      <CardFooter className="flex justify-between py-4">
        <Button
          variant="destructive"
          size="sm"
          className="gap-1"
          onClick={onSOS}
        >
          <AlertTriangle className="h-4 w-4" />
          SOS
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="gap-1"
          onClick={onCancel}
        >
          Cancel Ride
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ActiveRideStatus;
