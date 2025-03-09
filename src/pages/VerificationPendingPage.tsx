import React from "react";
import { useNavigate } from "react-router-dom";
import { Clock, CheckCircle, Car, AlertCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const VerificationPendingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center">
              <Car className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-2xl">RideShare Connect</span>
          </div>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <Clock className="h-10 w-10 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">Verification Pending</CardTitle>
            <CardDescription>
              Your driver application is being reviewed
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <span>Documents submitted successfully</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-blue-500 mr-3" />
                <span>Verification in progress</span>
              </div>
              <div className="flex items-center text-gray-500">
                <CheckCircle className="h-5 w-5 mr-3 opacity-30" />
                <span>Account activation (pending)</span>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-700 mb-1">
                    What happens next?
                  </h3>
                  <p className="text-sm text-blue-600">
                    Our team will review your documents within 1-2 business
                    days. You'll receive an email notification once your driver
                    account is approved.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-3">
            <Button
              className="w-full"
              variant="outline"
              onClick={() => navigate("/")}
            >
              Go to Home
            </Button>
            <div className="text-sm text-center text-gray-500">
              Have questions?{" "}
              <a href="#" className="text-primary hover:underline">
                Contact Support
              </a>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default VerificationPendingPage;
