import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  DollarSign,
  Star,
  Car,
  MessageCircle,
  Phone,
  ArrowLeft,
  Edit,
  Trash,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const RideDetailsPage = () => {
  const { rideId } = useParams<{ rideId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("details");
  const [loading, setLoading] = useState(true);
  const [ride, setRide] = useState<any>(null);

  useEffect(() => {
    // Simulate API call to fetch ride details
    const fetchRideDetails = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Sample ride data
        setRide({
          id: rideId,
          startLocation: "San Francisco, CA",
          endLocation: "Los Angeles, CA",
          date: "May 15, 2023",
          time: "08:00 AM",
          price: 45,
          availableSeats: 3,
          bookedSeats: 1,
          status: "active",
          passengers: [
            {
              id: "p1",
              name: "Sarah Miller",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
              rating: 4.9,
            },
          ],
          vehicleType: "SUV",
          vehicleModel: "Toyota RAV4",
          vehicleColor: "Silver",
          licensePlate: "ABC123",
          description:
            "Comfortable ride with air conditioning. I usually listen to podcasts during the drive. I'll be making one quick stop for coffee.",
          allowPets: true,
          allowSmoking: false,
          allowLuggage: true,
          estimatedDuration: "5h 30m",
          estimatedDistance: "382 miles",
        });
      } catch (error) {
        console.error("Error fetching ride details:", error);
        toast({
          title: "Error",
          description: "Failed to load ride details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRideDetails();
  }, [rideId]);

  const handleEditRide = () => {
    navigate(`/edit-ride/${rideId}`);
  };

  const handleCancelRide = () => {
    // Show confirmation dialog
    if (
      window.confirm(
        "Are you sure you want to cancel this ride? This action cannot be undone.",
      )
    ) {
      // Simulate API call to cancel ride
      toast({
        title: "Ride Cancelled",
        description: "Your ride has been cancelled successfully.",
      });
      navigate("/");
    }
  };

  const handleContactPassenger = (passengerId: string) => {
    navigate(`/messages/${passengerId}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!ride) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Ride not found</h2>
          <p className="text-gray-500 mt-2">
            The ride you're looking for doesn't exist or has been removed.
          </p>
          <Button className="mt-4" onClick={() => navigate("/")}>
            Go Back Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-bold">Ride Details</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle>Route Information</CardTitle>
                <Badge
                  variant={ride.status === "active" ? "default" : "secondary"}
                >
                  {ride.status === "active" ? "Active" : "Completed"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="w-0.5 h-10 bg-gray-300 my-1"></div>
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-red-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="mb-3">
                      <p className="font-medium">{ride.startLocation}</p>
                      <p className="text-sm text-gray-500">Pickup point</p>
                    </div>
                    <div>
                      <p className="font-medium">{ride.endLocation}</p>
                      <p className="text-sm text-gray-500">Dropoff point</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{ride.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{ride.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>
                      {ride.bookedSeats}/
                      {ride.bookedSeats + ride.availableSeats} seats booked
                    </span>
                  </div>
                  <div className="flex items-center gap-1 font-medium text-green-600">
                    <DollarSign className="h-4 w-4" />
                    <span>${ride.price}/seat</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Vehicle Information</h3>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-gray-500" />
                    <span>Vehicle</span>
                  </div>
                  <div>
                    {ride.vehicleModel} ({ride.vehicleType})
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="ml-6">Color</span>
                  </div>
                  <div>{ride.vehicleColor}</div>

                  <div className="flex items-center gap-2">
                    <span className="ml-6">License Plate</span>
                  </div>
                  <div>{ride.licensePlate}</div>
                </div>
              </div>

              {ride.description && (
                <div className="space-y-2">
                  <h3 className="font-medium">Additional Information</h3>
                  <p className="text-sm text-gray-700">{ride.description}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Passengers</CardTitle>
            </CardHeader>
            <CardContent>
              {ride.passengers && ride.passengers.length > 0 ? (
                <div className="space-y-4">
                  {ride.passengers.map((passenger: any) => (
                    <div
                      key={passenger.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={passenger.avatar}
                            alt={passenger.name}
                          />
                          <AvatarFallback>
                            {passenger.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{passenger.name}</p>
                          <div className="flex items-center text-sm">
                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                            <span>{passenger.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleContactPassenger(passenger.id)}
                        >
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Message
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4 mr-1" />
                          Call
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <Users className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                  <p>No passengers have booked this ride yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ride Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full"
                variant="outline"
                onClick={handleEditRide}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Ride
              </Button>
              <Button
                className="w-full"
                variant="destructive"
                onClick={handleCancelRide}
              >
                <Trash className="h-4 w-4 mr-2" />
                Cancel Ride
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Earnings Estimate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Price per seat</span>
                  <span className="font-medium">${ride.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Total seats</span>
                  <span className="font-medium">
                    {ride.bookedSeats + ride.availableSeats}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Booked seats</span>
                  <span className="font-medium">{ride.bookedSeats}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-sm">Current earnings</span>
                  <span className="font-medium text-green-600">
                    ${ride.bookedSeats * ride.price}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Potential earnings</span>
                  <span className="font-medium text-green-600">
                    ${(ride.bookedSeats + ride.availableSeats) * ride.price}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RideDetailsPage;
