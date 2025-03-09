import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  DollarSign,
  Star,
  MessageCircle,
  CreditCard,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface RideDetailsModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onBook?: () => void;
  onContact?: () => void;
  ride?: {
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
    vehicleModel?: string;
    vehicleColor?: string;
    allowPets?: boolean;
    allowSmoking?: boolean;
    allowLuggage?: boolean;
    description?: string;
  };
}

const BookingModal = ({
  isOpen = true,
  onClose = () => {},
  onBook = () => {},
  onContact = () => {},
  ride = {
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
    vehicleModel: "Toyota RAV4",
    vehicleColor: "Silver",
    allowPets: true,
    allowSmoking: false,
    allowLuggage: true,
    description:
      "I drive regularly between SF and LA for work. I'm a calm driver and usually listen to podcasts. Happy to chat or let you rest during the journey.",
  },
}: RideDetailsModalProps) => {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader className="relative">
          <DialogTitle className="text-xl font-bold">Ride Details</DialogTitle>
          <DialogClose className="absolute right-0 top-0">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>

        <div className="space-y-4">
          {/* Route information */}
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

            <div className="flex items-center justify-between mt-4 text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>{ride.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-gray-500" />
                <span>{ride.time}</span>
              </div>
              <Badge variant="outline" className="text-xs">
                {ride.vehicleType}
              </Badge>
            </div>
          </div>

          {/* Driver information */}
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={ride.driverAvatar} alt={ride.driverName} />
                <AvatarFallback>{ride.driverName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{ride.driverName}</div>
                <div className="flex items-center text-sm">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                  <span>{ride.driverRating} (124 rides)</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="ml-auto"
                onClick={onContact}
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                Contact
              </Button>
            </div>
          </div>

          {/* Tabs for details and reviews */}
          <Tabs
            defaultValue="details"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
            </TabsList>

            {activeTab === "details" && (
              <div className="space-y-4 pt-4">
                {/* Ride details */}
                <div className="grid grid-cols-2 gap-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>Available Seats</span>
                  </div>
                  <div className="text-right font-medium">
                    {ride.availableSeats}
                  </div>

                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <span>Price per Seat</span>
                  </div>
                  <div className="text-right font-medium text-green-600">
                    ${ride.price}
                  </div>

                  <div className="flex items-center gap-2">
                    <span>Vehicle</span>
                  </div>
                  <div className="text-right">
                    {ride.vehicleModel} ({ride.vehicleColor})
                  </div>

                  <div className="flex items-center gap-2">
                    <span>Pets Allowed</span>
                  </div>
                  <div className="text-right">
                    {ride.allowPets ? "Yes" : "No"}
                  </div>

                  <div className="flex items-center gap-2">
                    <span>Smoking Allowed</span>
                  </div>
                  <div className="text-right">
                    {ride.allowSmoking ? "Yes" : "No"}
                  </div>

                  <div className="flex items-center gap-2">
                    <span>Luggage Space</span>
                  </div>
                  <div className="text-right">
                    {ride.allowLuggage ? "Yes" : "No"}
                  </div>
                </div>

                {ride.description && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">
                      About this ride
                    </h4>
                    <p className="text-sm text-gray-600">{ride.description}</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "payment" && (
              <div className="space-y-4 pt-4">
                {/* Payment details */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">Price Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Base fare</span>
                      <span className="font-medium">${ride.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Service fee</span>
                      <span className="font-medium">
                        ${(ride.price * 0.1).toFixed(2)}
                      </span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between">
                      <span className="font-medium">Total</span>
                      <span className="font-bold text-green-600">
                        ${(ride.price * 1.1).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium mb-2">Payment Method</h4>
                  <div className="border rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-6 bg-blue-600 rounded">
                        <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold">
                          VISA
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          Visa ending in 4242
                        </p>
                        <p className="text-xs text-gray-500">Expires 12/24</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Change
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium mb-2">Booking Terms</h4>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>
                      • By booking this ride, you agree to the RideShare Connect
                      Terms of Service
                    </p>
                    <p>
                      • Cancellations made more than 24 hours before departure
                      are eligible for a full refund
                    </p>
                    <p>
                      • Cancellations made less than 24 hours before departure
                      are subject to a 50% fee
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Tabs>

          {/* Price summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Price Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Base fare</span>
                <span>${ride.price}</span>
              </div>
              <div className="flex justify-between">
                <span>Service fee</span>
                <span>${(ride.price * 0.1).toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${(ride.price * 1.1).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-4">
          <Button variant="outline" className="flex-1" onClick={onContact}>
            <MessageCircle className="h-4 w-4 mr-2" />
            Contact Driver
          </Button>
          <Button
            className="flex-1 bg-green-600 hover:bg-green-700"
            onClick={onBook}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Book Ride
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
