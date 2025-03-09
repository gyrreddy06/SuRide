import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Car, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import RideCreationForm from "@/components/forms/RideCreationForm";

const CreateRidePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRideSubmit = (formData: any) => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);

      toast({
        title: "Ride Created Successfully",
        description:
          "Your ride has been published and is now available for booking.",
      });

      navigate("/");
    }, 1500);
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCancel}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-bold">Create a Ride</h2>
      </div>

      <div className="flex justify-center">
        <RideCreationForm onSubmit={handleRideSubmit} />
      </div>

      {isSubmitting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-[300px] p-4">
            <CardContent className="flex flex-col items-center justify-center py-6">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p className="text-center">Creating your ride...</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CreateRidePage;
