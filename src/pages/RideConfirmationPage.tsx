import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  MapPin,
  Calendar,
  Clock,
  CreditCard,
  User,
  Car,
  Download,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import PaymentReceipt from "@/components/payments/PaymentReceipt";

const RideConfirmationPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [countdown, setCountdown] = useState(5);
  const [showReceipt, setShowReceipt] = useState(false);

  // Sample ride data
  const ride = {
    id: "1",
    startLocation: "San Francisco, CA",
    endLocation: "Los Angeles, CA",
    date: "May 15, 2023",
    time: "08:00 AM",
    price: 45,
    serviceFee: 4.5,
    total: 49.5,
    driverName: "Alex Johnson",
    driverRating: 4.8,
    driverAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    vehicleType: "SUV",
    vehicleModel: "Toyota RAV4",
    vehicleColor: "Silver",
  };

  // Countdown effect for auto-redirect
  useEffect(() => {
    if (countdown > 0 && !showReceipt) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !showReceipt) {
      navigate("/");
    }
  }, [countdown, navigate, showReceipt]);

  const handleViewRide = () => {
    toast({
      title: "Ride booked successfully",
      description: "You can view your upcoming ride in the dashboard.",
    });
    navigate("/");
  };

  const handleViewReceipt = () => {
    setShowReceipt(true);
  };

  const handleDownloadReceipt = () => {
    toast({
      title: "Receipt Downloaded",
      description: "Your receipt has been downloaded successfully.",
    });
    // In a real app, this would trigger a download
  };

  const handleBackToConfirmation = () => {
    setShowReceipt(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        {showReceipt ? (
          <div className="space-y-4">
            <PaymentReceipt
              receiptId={`REC-${Date.now().toString().slice(-6)}`}
              amount={ride.price}
              date={ride.date}
              startLocation={ride.startLocation}
              endLocation={ride.endLocation}
              driverName={ride.driverName}
              vehicleInfo={`${ride.vehicleModel} (${ride.vehicleColor})`}
              onDownload={handleDownloadReceipt}
            />
            <Button
              variant="outline"
              className="w-full"
              onClick={handleBackToConfirmation}
            >
              Back to Confirmation
            </Button>
          </div>
        ) : (
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Booking Confirmed!</CardTitle>
              <CardDescription>
                Your ride has been successfully booked
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
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
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">{ride.driverName}</p>
                    <p className="text-sm text-gray-500">Driver</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Car className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {ride.vehicleModel} ({ride.vehicleColor})
                    </p>
                    <p className="text-sm text-gray-500">{ride.vehicleType}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Payment Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Base fare</span>
                    <span className="font-medium">
                      ${ride.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Service fee</span>
                    <span className="font-medium">
                      ${ride.serviceFee.toFixed(2)}
                    </span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="font-bold text-green-600">
                      ${ride.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <CreditCard className="h-4 w-4" />
                <span>Paid with Visa ending in 4242</span>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-3">
              <div className="grid grid-cols-2 gap-3 w-full">
                <Button onClick={handleViewRide}>View My Ride</Button>
                <Button variant="outline" onClick={handleViewReceipt}>
                  <Download className="h-4 w-4 mr-2" />
                  View Receipt
                </Button>
              </div>
              {!showReceipt && (
                <p className="text-sm text-center text-gray-500">
                  Redirecting to dashboard in {countdown} seconds...
                </p>
              )}
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RideConfirmationPage;
