import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  DollarSign,
  Star,
  Car,
  MessageCircle,
  Shield,
  CheckCircle,
  X,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import PaymentModal from "./PaymentModal";

interface RideDetailsModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onBook?: () => void;
  onContact?: () => void;
  ride?: {
    id: string;
    driverId: string;
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
    vehicleModel?: string;
    vehicleColor?: string;
    licensePlate?: string;
    description?: string;
    allowPets?: boolean;
    allowSmoking?: boolean;
    allowLuggage?: boolean;
    estimatedDuration?: string;
    estimatedDistance?: string;
  };
}

const RideDetailsModal = ({
  isOpen = true,
  onClose = () => {},
  onBook = () => {},
  onContact = () => {},
  ride = {
    id: "1",
    driverId: "user1",
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
  },
}: RideDetailsModalProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleBookRide = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentComplete = () => {
    setShowPaymentModal(false);
    onClose();
    navigate("/ride-confirmation");
  };

  const handleContactDriver = () => {
    // Navigate to messages page with the driver's ID
    navigate(`/messages/${ride.driverId}`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <DialogTitle className="text-xl font-bold">
              Ride Details
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Route summary */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="w-0.5 h-12 bg-gray-300 my-1"></div>
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
            </div>
            <div className="flex-1">
              <div className="mb-3">
                <div className="text-sm font-medium">{ride.startLocation}</div>
                <div className="text-xs text-gray-500">
                  {ride.date} • {ride.time}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">{ride.endLocation}</div>
                <div className="text-xs text-gray-500 flex items-center gap-2">
                  <span>{ride.estimatedDuration}</span>
                  <span>•</span>
                  <span>{ride.estimatedDistance}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-green-600">
                ${ride.price}
              </div>
              <div className="text-xs text-gray-500">per seat</div>
            </div>
          </div>
        </div>

        <Tabs
          defaultValue="details"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="driver">Driver</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          {activeTab === "details" && (
            <div className="space-y-4 pt-4">
              {/* Ride details */}
              <div className="space-y-3">
                <h3 className="font-medium">Ride Information</h3>

                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>Date</span>
                  </div>
                  <div>{ride.date}</div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>Departure Time</span>
                  </div>
                  <div>{ride.time}</div>

                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>Available Seats</span>
                  </div>
                  <div>{ride.availableSeats}</div>
                </div>
              </div>

              <Separator />

              {/* Vehicle details */}
              <div className="space-y-3">
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

              <Separator />

              {/* Preferences */}
              <div className="space-y-3">
                <h3 className="font-medium">Ride Preferences</h3>

                <div className="flex flex-wrap gap-3">
                  <Badge
                    variant={ride.allowPets ? "default" : "outline"}
                    className="flex items-center gap-1"
                  >
                    {ride.allowPets ? (
                      <CheckCircle className="h-3 w-3" />
                    ) : (
                      <X className="h-3 w-3" />
                    )}
                    Pets Allowed
                  </Badge>
                  <Badge
                    variant={ride.allowSmoking ? "default" : "outline"}
                    className="flex items-center gap-1"
                  >
                    {ride.allowSmoking ? (
                      <CheckCircle className="h-3 w-3" />
                    ) : (
                      <X className="h-3 w-3" />
                    )}
                    Smoking Allowed
                  </Badge>
                  <Badge
                    variant={ride.allowLuggage ? "default" : "outline"}
                    className="flex items-center gap-1"
                  >
                    {ride.allowLuggage ? (
                      <CheckCircle className="h-3 w-3" />
                    ) : (
                      <X className="h-3 w-3" />
                    )}
                    Luggage Space
                  </Badge>
                </div>
              </div>

              {ride.description && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <h3 className="font-medium">Additional Information</h3>
                    <p className="text-sm text-gray-700">{ride.description}</p>
                  </div>
                </>
              )}
            </div>
          )}

          {activeTab === "driver" && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={ride.driverAvatar} alt={ride.driverName} />
                  <AvatarFallback>{ride.driverName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-medium">{ride.driverName}</h3>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span>{ride.driverRating}</span>
                    <span className="text-gray-500">(124 reviews)</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Member since January 2022
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span className="font-medium">Verified Driver</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Phone number verified</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Email verified</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>ID verified</span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <h4 className="font-medium mb-2">About {ride.driverName}</h4>
                <p className="text-sm text-gray-700">
                  Hi there! I'm a regular commuter between {ride.startLocation}{" "}
                  and {ride.endLocation}. I enjoy meeting new people and sharing
                  rides to make travel more affordable and eco-friendly. I'm a
                  careful driver with a clean driving record.
                </p>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-2xl font-bold">{ride.driverRating}</div>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${star <= Math.round(ride.driverRating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-2">
                      (124 reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Sample reviews */}
              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 pb-4 mb-4 last:border-0"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=reviewer${index}`}
                      />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">User {index}</div>
                      <div className="text-xs text-gray-500">
                        May {index + 10}, 2023
                      </div>
                    </div>
                    <div className="ml-auto flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-3 w-3 ${star <= 5 - (index % 2) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    {index === 1
                      ? "Great driver! Very punctual and the car was clean and comfortable. Would definitely ride with them again."
                      : index === 2
                        ? "The ride was smooth and the driver was very friendly. We had a nice conversation during the trip."
                        : "On time and got me to my destination safely. The driver was professional and respectful."}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Tabs>

        <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-4">
          <Button
            variant="outline"
            className="flex-1 gap-2"
            onClick={handleContactDriver}
          >
            <MessageCircle className="h-4 w-4" />
            Contact Driver
          </Button>
          <Button className="flex-1 gap-2 bg-primary" onClick={handleBookRide}>
            <DollarSign className="h-4 w-4" />
            Book Ride
          </Button>
        </DialogFooter>

        <div className="text-xs text-center text-gray-500 mt-2 flex items-center justify-center gap-1">
          <AlertCircle className="h-3 w-3" />
          Report an issue with this ride
        </div>
      </DialogContent>

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          amount={ride.price}
          rideName={`${ride.startLocation} to ${ride.endLocation}`}
          onPaymentComplete={handlePaymentComplete}
        />
      )}
    </Dialog>
  );
};

export default RideDetailsModal;
