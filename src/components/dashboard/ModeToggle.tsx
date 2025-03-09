import React, { useState } from "react";
import { Car, Search } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface ModeToggleProps {
  activeMode?: "find" | "offer";
  onModeChange?: (mode: "find" | "offer") => void;
  className?: string;
}

const ModeToggle = ({
  activeMode = "find",
  onModeChange = () => {},
  className = "",
}: ModeToggleProps) => {
  const [mode, setMode] = useState<"find" | "offer">(activeMode);

  const handleModeChange = (value: string) => {
    const newMode = value as "find" | "offer";
    setMode(newMode);
    onModeChange(newMode);
  };

  return (
    <div
      className={`bg-white w-full max-w-[280px] rounded-full shadow-sm ${className}`}
    >
      <Tabs
        defaultValue={mode}
        value={mode}
        onValueChange={handleModeChange}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 w-full h-10 rounded-full p-0.5">
          <TabsTrigger
            value="find"
            className="flex items-center justify-center gap-1 rounded-full text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Search className="h-3 w-3" />
            Find Ride
          </TabsTrigger>
          <TabsTrigger
            value="offer"
            className="flex items-center justify-center gap-1 rounded-full text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Car className="h-3 w-3" />
            Offer Ride
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default ModeToggle;
