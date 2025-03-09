import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { createRide } from "@/lib/api";
import {
  MapPin,
  Calendar,
  Clock,
  Car,
  Users,
  DollarSign,
  Info,
  ArrowRight,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

interface RideCreationFormProps {
  onSubmit?: (formData: RideFormData) => void;
  initialStep?: number;
}

interface RideFormData {
  startLocation: string;
  endLocation: string;
  date: string;
  time: string;
  vehicleType: string;
  vehicleModel: string;
  vehicleColor: string;
  licensePlate: string;
  availableSeats: number;
  price: number;
  description: string;
  allowPets: boolean;
  allowSmoking: boolean;
  allowLuggage: boolean;
}

const RideCreationForm = ({
  onSubmit = () => {},
  initialStep = 1,
}: RideCreationFormProps) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [formData, setFormData] = useState<RideFormData>({
    startLocation: "",
    endLocation: "",
    date: "",
    time: "",
    vehicleType: "Sedan",
    vehicleModel: "",
    vehicleColor: "",
    licensePlate: "",
    availableSeats: 3,
    price: 25,
    description: "",
    allowPets: false,
    allowSmoking: false,
    allowLuggage: true,
  });
  const [activeTab, setActiveTab] = useState("new");

  const handleChange = (
    field: keyof RideFormData,
    value: string | number | boolean,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    try {
      // Create ride in Supabase
      const rideData = {
        user_id: user.id,
        start_location: formData.startLocation,
        end_location: formData.endLocation,
        date: formData.date,
        time: formData.time,
        price: formData.price,
        available_seats: formData.availableSeats,
        vehicle_type: formData.vehicleType,
        vehicle_model: formData.vehicleModel,
        vehicle_color: formData.vehicleColor,
        license_plate: formData.licensePlate,
        allow_pets: formData.allowPets,
        allow_smoking: formData.allowSmoking,
        allow_luggage: formData.allowLuggage,
        description: formData.description,
        status: "active",
      };

      const newRide = await createRide(rideData);

      if (newRide) {
        onSubmit(formData);
      }
    } catch (error) {
      console.error("Error creating ride:", error);
      alert("Failed to create ride. Please try again.");
    }
  };

  return (
    <Card className="w-full max-w-[600px] mx-auto bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Create a Ride
        </CardTitle>
        <div className="flex justify-between items-center mt-4">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step === currentStep
                    ? "bg-primary text-white"
                    : step < currentStep
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                }`}
              >
                {step < currentStep ? <Check size={18} /> : step}
              </div>
              <span className="text-xs mt-1">
                {step === 1
                  ? "Route"
                  : step === 2
                    ? "Vehicle"
                    : step === 3
                      ? "Seats & Price"
                      : "Review"}
              </span>
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          {/* Step 1: Route Details */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="startLocation"
                  className="flex items-center gap-2"
                >
                  <MapPin size={16} className="text-primary" />
                  Pickup Location
                </Label>
                <Input
                  id="startLocation"
                  placeholder="Enter pickup location"
                  value={formData.startLocation}
                  onChange={(e) =>
                    handleChange("startLocation", e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="endLocation"
                  className="flex items-center gap-2"
                >
                  <MapPin size={16} className="text-primary" />
                  Destination
                </Label>
                <Input
                  id="endLocation"
                  placeholder="Enter destination"
                  value={formData.endLocation}
                  onChange={(e) => handleChange("endLocation", e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center gap-2">
                    <Calendar size={16} className="text-primary" />
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time" className="flex items-center gap-2">
                    <Clock size={16} className="text-primary" />
                    Time
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleChange("time", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Vehicle Information */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="vehicleType"
                  className="flex items-center gap-2"
                >
                  <Car size={16} className="text-primary" />
                  Vehicle Type
                </Label>
                <Select
                  value={formData.vehicleType}
                  onValueChange={(value) => handleChange("vehicleType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sedan">Sedan</SelectItem>
                    <SelectItem value="SUV">SUV</SelectItem>
                    <SelectItem value="Hatchback">Hatchback</SelectItem>
                    <SelectItem value="Minivan">Minivan</SelectItem>
                    <SelectItem value="Truck">Truck</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicleModel">Model</Label>
                  <Input
                    id="vehicleModel"
                    placeholder="e.g. Toyota Camry"
                    value={formData.vehicleModel}
                    onChange={(e) =>
                      handleChange("vehicleModel", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehicleColor">Color</Label>
                  <Input
                    id="vehicleColor"
                    placeholder="e.g. Blue"
                    value={formData.vehicleColor}
                    onChange={(e) =>
                      handleChange("vehicleColor", e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="licensePlate">License Plate</Label>
                <Input
                  id="licensePlate"
                  placeholder="Enter license plate number"
                  value={formData.licensePlate}
                  onChange={(e) => handleChange("licensePlate", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="text-sm font-medium mb-2">Ride Preferences</h3>
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="allowPets"
                      className="cursor-pointer flex items-center gap-2"
                    >
                      Pets Allowed
                    </Label>
                    <Switch
                      id="allowPets"
                      checked={formData.allowPets}
                      onCheckedChange={(checked) =>
                        handleChange("allowPets", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="allowSmoking"
                      className="cursor-pointer flex items-center gap-2"
                    >
                      Smoking Allowed
                    </Label>
                    <Switch
                      id="allowSmoking"
                      checked={formData.allowSmoking}
                      onCheckedChange={(checked) =>
                        handleChange("allowSmoking", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="allowLuggage"
                      className="cursor-pointer flex items-center gap-2"
                    >
                      Luggage Space Available
                    </Label>
                    <Switch
                      id="allowLuggage"
                      checked={formData.allowLuggage}
                      onCheckedChange={(checked) =>
                        handleChange("allowLuggage", checked)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Seats and Price */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label
                    htmlFor="availableSeats"
                    className="flex items-center gap-2"
                  >
                    <Users size={16} className="text-primary" />
                    Available Seats
                  </Label>
                  <span className="text-lg font-medium">
                    {formData.availableSeats}
                  </span>
                </div>
                <Slider
                  id="availableSeats"
                  min={1}
                  max={8}
                  step={1}
                  value={[formData.availableSeats]}
                  onValueChange={(value) =>
                    handleChange("availableSeats", value[0])
                  }
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1</span>
                  <span>8</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label htmlFor="price" className="flex items-center gap-2">
                    <DollarSign size={16} className="text-primary" />
                    Price per Seat
                  </Label>
                  <span className="text-lg font-medium">${formData.price}</span>
                </div>
                <Slider
                  id="price"
                  min={5}
                  max={100}
                  step={1}
                  value={[formData.price]}
                  onValueChange={(value) => handleChange("price", value[0])}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>$5</span>
                  <span>$100</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="flex items-center gap-2"
                >
                  <Info size={16} className="text-primary" />
                  Additional Information
                </Label>
                <Textarea
                  id="description"
                  placeholder="Add any additional details about your ride..."
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Route Details</h3>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <div className="font-medium">From:</div>
                  <div>{formData.startLocation}</div>
                  <div className="font-medium">To:</div>
                  <div>{formData.endLocation}</div>
                  <div className="font-medium">Date:</div>
                  <div>{formData.date}</div>
                  <div className="font-medium">Time:</div>
                  <div>{formData.time}</div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Vehicle Information</h3>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <div className="font-medium">Type:</div>
                  <div>{formData.vehicleType}</div>
                  <div className="font-medium">Model:</div>
                  <div>{formData.vehicleModel}</div>
                  <div className="font-medium">Color:</div>
                  <div>{formData.vehicleColor}</div>
                  <div className="font-medium">License Plate:</div>
                  <div>{formData.licensePlate}</div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Ride Details</h3>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <div className="font-medium">Available Seats:</div>
                  <div>{formData.availableSeats}</div>
                  <div className="font-medium">Price per Seat:</div>
                  <div>${formData.price}</div>
                  <div className="font-medium">Pets Allowed:</div>
                  <div>{formData.allowPets ? "Yes" : "No"}</div>
                  <div className="font-medium">Smoking Allowed:</div>
                  <div>{formData.allowSmoking ? "Yes" : "No"}</div>
                  <div className="font-medium">Luggage Space:</div>
                  <div>{formData.allowLuggage ? "Yes" : "No"}</div>
                </div>
              </div>

              {formData.description && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Additional Information</h3>
                  <p className="text-sm">{formData.description}</p>
                </div>
              )}
            </div>
          )}
        </form>
      </CardContent>

      <CardFooter className="flex justify-between">
        {currentStep > 1 ? (
          <Button type="button" variant="outline" onClick={handleBack}>
            Back
          </Button>
        ) : (
          <div></div>
        )}

        {currentStep < 4 ? (
          <Button type="button" onClick={handleNext} className="gap-1">
            Next <ArrowRight size={16} />
          </Button>
        ) : (
          <Button
            type="submit"
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700"
          >
            Publish Ride
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default RideCreationForm;
