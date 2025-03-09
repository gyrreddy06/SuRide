import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Car, FileText, Upload, CheckCircle, AlertCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

const DriverVerificationPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Form states
  const [vehicleInfo, setVehicleInfo] = useState({
    make: "",
    model: "",
    year: "",
    color: "",
    licensePlate: "",
    seats: "4",
  });

  const [documents, setDocuments] = useState({
    driversLicense: null,
    vehicleRegistration: null,
    insurance: null,
    profilePhoto: null,
  });

  const handleFileChange = (
    documentType: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      setDocuments({
        ...documents,
        [documentType]: e.target.files[0],
      });

      // Simulate upload progress
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
    }
  };

  const handleVehicleInfoChange = (field: string, value: string) => {
    setVehicleInfo({
      ...vehicleInfo,
      [field]: value,
    });
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      // Simulate API call for document verification
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Verification submitted successfully",
        description:
          "We'll review your documents and notify you once approved.",
      });

      navigate("/verification-pending");
    } catch (error) {
      console.error("Verification error:", error);
      toast({
        title: "Verification failed",
        description:
          "There was an error submitting your documents. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center">
              <Car className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-2xl">Driver Verification</span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Complete Your Driver Profile</CardTitle>
            <CardDescription>
              Please provide your vehicle information and required documents to
              become a verified driver.
            </CardDescription>

            <div className="flex justify-between items-center mt-6">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      s === step
                        ? "bg-primary text-white"
                        : s < step
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {s < step ? <CheckCircle size={18} /> : s}
                  </div>
                  <span className="text-xs mt-1">
                    {s === 1
                      ? "Vehicle Info"
                      : s === 2
                        ? "Documents"
                        : "Review"}
                  </span>
                </div>
              ))}
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="make">Vehicle Make</Label>
                    <Input
                      id="make"
                      placeholder="Toyota"
                      value={vehicleInfo.make}
                      onChange={(e) =>
                        handleVehicleInfoChange("make", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Vehicle Model</Label>
                    <Input
                      id="model"
                      placeholder="Camry"
                      value={vehicleInfo.model}
                      onChange={(e) =>
                        handleVehicleInfoChange("model", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      placeholder="2020"
                      value={vehicleInfo.year}
                      onChange={(e) =>
                        handleVehicleInfoChange("year", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="color">Color</Label>
                    <Input
                      id="color"
                      placeholder="Silver"
                      value={vehicleInfo.color}
                      onChange={(e) =>
                        handleVehicleInfoChange("color", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="licensePlate">License Plate</Label>
                    <Input
                      id="licensePlate"
                      placeholder="ABC123"
                      value={vehicleInfo.licensePlate}
                      onChange={(e) =>
                        handleVehicleInfoChange("licensePlate", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="seats">Available Seats</Label>
                    <Input
                      id="seats"
                      type="number"
                      min="1"
                      max="8"
                      value={vehicleInfo.seats}
                      onChange={(e) =>
                        handleVehicleInfoChange("seats", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="driversLicense">Driver's License</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    {documents.driversLicense ? (
                      <div className="space-y-2">
                        <CheckCircle className="h-8 w-8 text-green-500 mx-auto" />
                        <p className="text-sm font-medium">
                          {documents.driversLicense.name}
                        </p>
                        <Progress value={progress} className="h-2" />
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                        <p className="text-sm text-gray-500">
                          Upload a clear photo of your driver's license
                        </p>
                        <p className="text-xs text-gray-400">
                          JPG, PNG or PDF, max 5MB
                        </p>
                      </div>
                    )}
                    <Input
                      id="driversLicense"
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileChange("driversLicense", e)}
                      accept="image/jpeg,image/png,application/pdf"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-4"
                      onClick={() =>
                        document.getElementById("driversLicense")?.click()
                      }
                    >
                      {documents.driversLicense
                        ? "Replace File"
                        : "Select File"}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehicleRegistration">
                    Vehicle Registration
                  </Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    {documents.vehicleRegistration ? (
                      <div className="space-y-2">
                        <CheckCircle className="h-8 w-8 text-green-500 mx-auto" />
                        <p className="text-sm font-medium">
                          {documents.vehicleRegistration.name}
                        </p>
                        <Progress value={progress} className="h-2" />
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <FileText className="h-8 w-8 text-gray-400 mx-auto" />
                        <p className="text-sm text-gray-500">
                          Upload your vehicle registration document
                        </p>
                        <p className="text-xs text-gray-400">
                          JPG, PNG or PDF, max 5MB
                        </p>
                      </div>
                    )}
                    <Input
                      id="vehicleRegistration"
                      type="file"
                      className="hidden"
                      onChange={(e) =>
                        handleFileChange("vehicleRegistration", e)
                      }
                      accept="image/jpeg,image/png,application/pdf"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-4"
                      onClick={() =>
                        document.getElementById("vehicleRegistration")?.click()
                      }
                    >
                      {documents.vehicleRegistration
                        ? "Replace File"
                        : "Select File"}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profilePhoto">Profile Photo</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    {documents.profilePhoto ? (
                      <div className="space-y-2">
                        <div className="h-20 w-20 rounded-full mx-auto overflow-hidden">
                          <img
                            src={URL.createObjectURL(documents.profilePhoto)}
                            alt="Profile Preview"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <User className="h-8 w-8 text-gray-400 mx-auto" />
                        <p className="text-sm text-gray-500">
                          Upload a clear photo of yourself
                        </p>
                        <p className="text-xs text-gray-400">
                          JPG or PNG, max 5MB
                        </p>
                      </div>
                    )}
                    <Input
                      id="profilePhoto"
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileChange("profilePhoto", e)}
                      accept="image/jpeg,image/png"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-4"
                      onClick={() =>
                        document.getElementById("profilePhoto")?.click()
                      }
                    >
                      {documents.profilePhoto
                        ? "Replace Photo"
                        : "Select Photo"}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-3">Vehicle Information</h3>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <div className="font-medium">Make:</div>
                    <div>{vehicleInfo.make}</div>
                    <div className="font-medium">Model:</div>
                    <div>{vehicleInfo.model}</div>
                    <div className="font-medium">Year:</div>
                    <div>{vehicleInfo.year}</div>
                    <div className="font-medium">Color:</div>
                    <div>{vehicleInfo.color}</div>
                    <div className="font-medium">License Plate:</div>
                    <div>{vehicleInfo.licensePlate}</div>
                    <div className="font-medium">Available Seats:</div>
                    <div>{vehicleInfo.seats}</div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-3">Uploaded Documents</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      {documents.driversLicense ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                      )}
                      <span>Driver's License</span>
                    </div>
                    <div className="flex items-center">
                      {documents.vehicleRegistration ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                      )}
                      <span>Vehicle Registration</span>
                    </div>
                    <div className="flex items-center">
                      {documents.profilePhoto ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                      )}
                      <span>Profile Photo</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-blue-700 mb-1">
                        Verification Process
                      </h3>
                      <p className="text-sm text-blue-600">
                        Your documents will be reviewed within 1-2 business
                        days. You'll receive an email notification once your
                        driver account is approved.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between">
            {step > 1 ? (
              <Button
                type="button"
                variant="outline"
                onClick={handlePreviousStep}
              >
                Back
              </Button>
            ) : (
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/auth")}
              >
                Cancel
              </Button>
            )}

            <Button type="button" onClick={handleNextStep} disabled={loading}>
              {loading
                ? "Processing..."
                : step < 3
                  ? "Continue"
                  : "Submit for Verification"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DriverVerificationPage;
