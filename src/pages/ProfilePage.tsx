import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { getUserProfile, getUserBookings } from "@/lib/api";
import { useSupabaseData } from "@/hooks/useSupabaseData";
import {
  User,
  Star,
  Car,
  CreditCard,
  Clock,
  Settings,
  ChevronRight,
  LogOut,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Edit,
  Plus,
  Trash,
  DollarSign,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ProfileSkeleton } from "@/components/LoadingState";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("personal");
  const [editMode, setEditMode] = useState(false);
  const { user } = useAuth();

  // Fetch user profile from Supabase
  const { data: profileData, loading: profileLoading } = useSupabaseData(
    () => (user ? getUserProfile(user.id) : Promise.resolve([])),
    [user?.id],
  );

  // Fetch user bookings from Supabase
  const { data: bookingsData, loading: bookingsLoading } = useSupabaseData(
    () => (user ? getUserBookings(user.id) : Promise.resolve([])),
    [user?.id],
  );

  // Process profile data from Supabase
  const [profile, setProfile] = useState({
    name: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    joinDate: "January 2022",
    rating: 4.8,
    ridesCompleted: 24,
    ridesOffered: 12,
    bio: "Regular commuter between San Francisco and Los Angeles. I enjoy meeting new people and sharing rides to make travel more affordable and eco-friendly.",
  });

  // Vehicle information
  const [vehicle, setVehicle] = useState({
    make: "Toyota",
    model: "Camry",
    year: "2020",
    color: "Silver",
    licensePlate: "ABC123",
    seats: 4,
  });

  // Payment methods
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: "1",
      type: "visa",
      last4: "4242",
      expiry: "04/25",
      isDefault: true,
    },
    {
      id: "2",
      type: "mastercard",
      last4: "8888",
      expiry: "09/24",
      isDefault: false,
    },
  ]);

  // Settings
  const [settings, setSettings] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: true,
    rideUpdates: true,
    messageNotifications: true,
    promotionalEmails: false,
    language: "English",
  });

  useEffect(() => {
    if (profileData && profileData.length > 0) {
      const userData = profileData[0];
      setProfile({
        name: userData.full_name || "User",
        avatar:
          userData.avatar_url ||
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id}`,
        email: user?.email || "user@example.com",
        phone: userData.phone || "+1 (555) 123-4567",
        joinDate: new Date(userData.created_at).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        }),
        rating: userData.rating || 4.5,
        ridesCompleted: userData.rides_completed || 0,
        ridesOffered: userData.rides_offered || 0,
        bio: userData.bio || "No bio provided.",
      });
    }
  }, [profileData, user]);

  // Sample rides history
  const rides = [
    {
      id: "1",
      type: "passenger",
      date: "May 15, 2023",
      from: "San Francisco, CA",
      to: "Los Angeles, CA",
      driver: "Alex Johnson",
      price: 45,
      status: "completed",
    },
    {
      id: "2",
      type: "driver",
      date: "May 10, 2023",
      from: "Los Angeles, CA",
      to: "San Diego, CA",
      passengers: 3,
      earned: 75,
      status: "completed",
    },
    {
      id: "3",
      type: "passenger",
      date: "April 28, 2023",
      from: "San Francisco, CA",
      to: "San Jose, CA",
      driver: "Emily Wilson",
      price: 25,
      status: "completed",
    },
    {
      id: "4",
      type: "driver",
      date: "April 20, 2023",
      from: "San Francisco, CA",
      to: "Sacramento, CA",
      passengers: 2,
      earned: 60,
      status: "completed",
    },
  ];

  const handleSaveProfile = async () => {
    try {
      if (!user) return;

      // Update profile in Supabase
      const updatedProfile = await updateUserProfile(user.id, {
        full_name: profile.name,
        phone: profile.phone,
        bio: profile.bio,
        // avatar_url would be updated separately with storage upload
      });

      if (updatedProfile) {
        toast({
          title: "Profile Updated",
          description: "Your profile has been updated successfully.",
        });
        setEditMode(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Update Failed",
        description:
          "There was an error updating your profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSaveVehicle = () => {
    toast({
      title: "Vehicle Information Updated",
      description: "Your vehicle information has been updated successfully.",
    });
    setEditMode(false);
  };

  const handleAddPaymentMethod = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Adding new payment methods will be available soon.",
    });
  };

  const handleRemovePaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
    toast({
      title: "Payment Method Removed",
      description: "The payment method has been removed successfully.",
    });
  };

  const handleSetDefaultPaymentMethod = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    );
    toast({
      title: "Default Payment Method Updated",
      description: "Your default payment method has been updated.",
    });
  };

  const handleToggleSetting = (setting: string) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting as keyof typeof settings],
    });
    toast({
      title: "Setting Updated",
      description: `${setting} has been ${settings[setting as keyof typeof settings] ? "disabled" : "enabled"}.`,
    });
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem("isLoggedIn");
      navigate("/auth");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const updateUserProfile = async (userId: string, data: any) => {
    // This is a mock function that would normally call the API
    // For demo purposes, we'll just return the data
    return data;
  };

  return (
    <div className="container mx-auto px-4 py-4">
      {profileLoading ? (
        <ProfileSkeleton />
      ) : (
        <div className="flex flex-col items-center mb-6">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          <div className="flex items-center mt-1">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
            <span className="font-medium">{profile.rating}</span>
            <span className="text-gray-500 mx-1">•</span>
            <span className="text-gray-500 text-sm">
              Member since {profile.joinDate}
            </span>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="text-center">
              <div className="font-bold">{profile.ridesCompleted}</div>
              <div className="text-xs text-gray-500">Rides Taken</div>
            </div>
            <div className="text-center">
              <div className="font-bold">{profile.ridesOffered}</div>
              <div className="text-xs text-gray-500">Rides Offered</div>
            </div>
          </div>
        </div>
      )}

      <Tabs
        defaultValue="personal"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid grid-cols-5 w-full mb-4">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="vehicle">Vehicle</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal" className="mt-0">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl">Personal Information</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditMode(!editMode)}
                className="h-8"
              >
                <Edit className="h-4 w-4 mr-1" />
                {editMode ? "Cancel" : "Edit"}
              </Button>
            </CardHeader>
            <CardContent>
              {editMode ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                      disabled
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) =>
                        setProfile({ ...profile, phone: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) =>
                        setProfile({ ...profile, bio: e.target.value })
                      }
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setEditMode(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleSaveProfile}>Save Changes</Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-y-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium">Name</span>
                    </div>
                    <div className="text-sm">{profile.name}</div>

                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium">Email</span>
                    </div>
                    <div className="text-sm">{profile.email}</div>

                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium">Phone</span>
                    </div>
                    <div className="text-sm">{profile.phone}</div>

                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium">Member Since</span>
                    </div>
                    <div className="text-sm">{profile.joinDate}</div>
                  </div>

                  <Separator className="my-3" />

                  <div>
                    <h3 className="text-sm font-medium mb-2">Bio</h3>
                    <p className="text-sm text-gray-700">{profile.bio}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vehicle Information Tab */}
        <TabsContent value="vehicle" className="mt-0">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl">Vehicle Information</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditMode(!editMode)}
                className="h-8"
              >
                <Edit className="h-4 w-4 mr-1" />
                {editMode ? "Cancel" : "Edit"}
              </Button>
            </CardHeader>
            <CardContent>
              {editMode ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="make">Make</Label>
                      <Input
                        id="make"
                        value={vehicle.make}
                        onChange={(e) =>
                          setVehicle({ ...vehicle, make: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="model">Model</Label>
                      <Input
                        id="model"
                        value={vehicle.model}
                        onChange={(e) =>
                          setVehicle({ ...vehicle, model: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="year">Year</Label>
                      <Input
                        id="year"
                        value={vehicle.year}
                        onChange={(e) =>
                          setVehicle({ ...vehicle, year: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="color">Color</Label>
                      <Input
                        id="color"
                        value={vehicle.color}
                        onChange={(e) =>
                          setVehicle({ ...vehicle, color: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="licensePlate">License Plate</Label>
                      <Input
                        id="licensePlate"
                        value={vehicle.licensePlate}
                        onChange={(e) =>
                          setVehicle({
                            ...vehicle,
                            licensePlate: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="seats">Available Seats</Label>
                      <Input
                        id="seats"
                        type="number"
                        min="1"
                        max="8"
                        value={vehicle.seats}
                        onChange={(e) =>
                          setVehicle({
                            ...vehicle,
                            seats: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setEditMode(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleSaveVehicle}>Save Changes</Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-y-3">
                    <div className="flex items-center gap-2">
                      <Car className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium">Vehicle</span>
                    </div>
                    <div className="text-sm">
                      {vehicle.make} {vehicle.model}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium ml-6">Year</span>
                    </div>
                    <div className="text-sm">{vehicle.year}</div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium ml-6">Color</span>
                    </div>
                    <div className="text-sm">{vehicle.color}</div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium ml-6">
                        License Plate
                      </span>
                    </div>
                    <div className="text-sm">{vehicle.licensePlate}</div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium ml-6">
                        Available Seats
                      </span>
                    </div>
                    <div className="text-sm">{vehicle.seats}</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="mt-0">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl">Payment Methods</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleAddPaymentMethod}
                className="h-8"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Method
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-gray-700" />
                      </div>
                      <div>
                        <div className="font-medium">
                          {method.type === "visa" ? "Visa" : "Mastercard"} ••••{" "}
                          {method.last4}
                        </div>
                        <div className="text-xs text-gray-500">
                          Expires {method.expiry}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {method.isDefault ? (
                        <Badge variant="outline" className="mr-2">
                          Default
                        </Badge>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-xs"
                          onClick={() =>
                            handleSetDefaultPaymentMethod(method.id)
                          }
                        >
                          Set Default
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500"
                        onClick={() => handleRemovePaymentMethod(method.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">
                    Transaction History
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <div className="font-medium">Ride to Los Angeles</div>
                        <div className="text-red-600 font-medium">-$45.00</div>
                      </div>
                      <div className="text-sm text-gray-500">May 15, 2023</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <div className="font-medium">
                          Earnings from San Diego ride
                        </div>
                        <div className="text-green-600 font-medium">
                          +$75.00
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">May 10, 2023</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">App Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="font-medium">Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">
                          Email Notifications
                        </p>
                        <p className="text-xs text-gray-500">
                          Receive emails about your activity
                        </p>
                      </div>
                      <Button
                        variant={
                          settings.emailNotifications ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() =>
                          handleToggleSetting("emailNotifications")
                        }
                      >
                        {settings.emailNotifications ? "On" : "Off"}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">
                          Push Notifications
                        </p>
                        <p className="text-xs text-gray-500">
                          Receive notifications on your device
                        </p>
                      </div>
                      <Button
                        variant={
                          settings.pushNotifications ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => handleToggleSetting("pushNotifications")}
                      >
                        {settings.pushNotifications ? "On" : "Off"}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Ride Updates</p>
                        <p className="text-xs text-gray-500">
                          Get notified about changes to your rides
                        </p>
                      </div>
                      <Button
                        variant={settings.rideUpdates ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleToggleSetting("rideUpdates")}
                      >
                        {settings.rideUpdates ? "On" : "Off"}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">
                          Message Notifications
                        </p>
                        <p className="text-xs text-gray-500">
                          Get notified when you receive messages
                        </p>
                      </div>
                      <Button
                        variant={
                          settings.messageNotifications ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() =>
                          handleToggleSetting("messageNotifications")
                        }
                      >
                        {settings.messageNotifications ? "On" : "Off"}
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="font-medium">Privacy</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">
                          Promotional Emails
                        </p>
                        <p className="text-xs text-gray-500">
                          Receive emails about promotions and news
                        </p>
                      </div>
                      <Button
                        variant={
                          settings.promotionalEmails ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => handleToggleSetting("promotionalEmails")}
                      >
                        {settings.promotionalEmails ? "On" : "Off"}
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="font-medium">Account</h3>
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Ride History Tab */}
        <TabsContent value="history" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Ride History</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-300px)]">
                <div className="space-y-3">
                  {rides.map((ride) => (
                    <Card key={ride.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <Badge
                              variant={
                                ride.type === "driver" ? "secondary" : "outline"
                              }
                            >
                              {ride.type === "driver" ? "Driver" : "Passenger"}
                            </Badge>
                            <div className="text-sm text-gray-500 mt-1">
                              {ride.date}
                            </div>
                          </div>
                          <Badge
                            variant={
                              ride.status === "completed"
                                ? "success"
                                : "default"
                            }
                          >
                            {ride.status}
                          </Badge>
                        </div>
                        <div className="mb-2">
                          <div className="font-medium flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-gray-500" />
                            {ride.from} → {ride.to}
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          {ride.type === "passenger" ? (
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1 text-gray-500" />
                              <span>Driver: {ride.driver}</span>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1 text-gray-500" />
                              <span>{ride.passengers} passengers</span>
                            </div>
                          )}
                          <div className="font-medium flex items-center">
                            <DollarSign className="h-4 w-4 mr-0.5" />
                            <span
                              className={
                                ride.type === "passenger"
                                  ? "text-red-600"
                                  : "text-green-600"
                              }
                            >
                              {ride.type === "passenger"
                                ? `-$${ride.price}`
                                : `+$${ride.earned}`}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
