import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CheckCircle, Star, Share2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import RatingReviewForm from "@/components/reviews/RatingReviewForm";

const RideCompletionPage = () => {
  const { rideId } = useParams<{ rideId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showRatingForm, setShowRatingForm] = useState(false);

  // Sample ride data
  const ride = {
    id: rideId || "ride-123",
    driverName: "Alex Johnson",
    driverAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    startLocation: "San Francisco, CA",
    endLocation: "Los Angeles, CA",
    date: "May 15, 2023",
    time: "08:00 AM",
    price: 45,
    serviceFee: 4.5,
    total: 49.5,
  };

  const handleRateRide = () => {
    setShowRatingForm(true);
  };

  const handleShareRide = () => {
    // In a real app, this would open a share dialog
    toast({
      title: "Share feature",
      description: "Sharing functionality would be implemented here",
    });
  };

  const handleReviewSubmit = (rating: number, comment: string) => {
    // In a real app, this would send the review to the backend
    console.log("Review submitted:", { rating, comment, rideId });

    // Hide the rating form
    setShowRatingForm(false);

    // Show success message
    toast({
      title: "Review submitted",
      description: "Thank you for your feedback!",
    });

    // Navigate back to home after a short delay
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const handleCancel = () => {
    setShowRatingForm(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        {!showRatingForm ? (
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Ride Completed!</CardTitle>
              <CardDescription>
                You've successfully completed your ride to {ride.endLocation}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Ride Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>From</span>
                    <span className="font-medium">{ride.startLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>To</span>
                    <span className="font-medium">{ride.endLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date & Time</span>
                    <span className="font-medium">
                      {ride.date}, {ride.time}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Paid</span>
                    <span className="font-medium text-green-600">
                      ${ride.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-700 text-center">
                  How was your ride with {ride.driverName}? Your feedback helps
                  improve the community.
                </p>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-3">
              <Button className="w-full" onClick={handleRateRide}>
                <Star className="h-4 w-4 mr-2" />
                Rate this Ride
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleShareRide}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share Ride Summary
              </Button>
              <Button variant="ghost" onClick={() => navigate("/")}>
                Back to Home
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-0">
              <RatingReviewForm
                userName={ride.driverName}
                userAvatar={ride.driverAvatar}
                rideId={ride.id}
                onSubmit={handleReviewSubmit}
                onCancel={handleCancel}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RideCompletionPage;
