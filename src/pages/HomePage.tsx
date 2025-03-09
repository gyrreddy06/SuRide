import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PassengerDashboard from "@/components/dashboard/PassengerDashboard";
import DriverDashboard from "@/components/dashboard/DriverDashboard";
import ModeToggle from "@/components/dashboard/ModeToggle";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { Car } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userType, setUserType] = useState<"passenger" | "driver">("passenger");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user } = useAuth();

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user is logged in via Supabase session
        const { data } = await supabase.auth.getSession();

        if (data.session) {
          setIsAuthenticated(true);
        } else {
          // Check localStorage fallback (for demo purposes)
          const isLoggedIn = localStorage.getItem("isLoggedIn");
          if (isLoggedIn === "true") {
            setIsAuthenticated(true);
          } else {
            navigate("/auth");
          }
        }
      } catch (error) {
        console.error("Auth check error:", error);
        navigate("/auth");
      }
    };

    checkAuth();
  }, [navigate]);

  const handleModeChange = (mode: "passenger" | "driver") => {
    setUserType(mode);
    toast({
      title: `Switched to ${mode === "passenger" ? "Passenger" : "Driver"} mode`,
      description:
        mode === "passenger"
          ? "You can now search for rides"
          : "You can now offer rides",
    });
  };

  return (
    <div className="px-3 py-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
            <Car className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl">RideShare</span>
        </div>
        <ModeToggle activeMode={userType} onModeChange={handleModeChange} />
      </div>

      {/* Main content area */}
      <div className="flex-1">
        {userType === "passenger" ? (
          <PassengerDashboard />
        ) : (
          <DriverDashboard />
        )}
      </div>
    </div>
  );
};

export default HomePage;
