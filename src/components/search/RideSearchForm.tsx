import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Calendar, Clock, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";

interface RideSearchFormProps {
  onSearch?: (searchParams: SearchParams) => void;
  className?: string;
}

export interface SearchParams {
  startLocation: string;
  endLocation: string;
  date?: Date;
  time?: string;
  showFilters?: boolean;
}

const RideSearchForm = ({
  onSearch = () => {},
  className = "",
}: RideSearchFormProps) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState<SearchParams>({
    startLocation: "",
    endLocation: "",
    date: undefined,
    time: "",
    showFilters: false,
  });

  const handleInputChange = (
    field: keyof SearchParams,
    value: string | Date | boolean,
  ) => {
    setSearchParams((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleFilters = () => {
    setSearchParams((prev) => ({
      ...prev,
      showFilters: !prev.showFilters,
    }));
  };

  const handleSearch = () => {
    onSearch(searchParams);
    navigate("/search", { state: { searchParams } });
  };

  return (
    <Card className={`w-full bg-white shadow-sm ${className}`}>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Where are you going?"
                className="pl-9 w-full"
                value={searchParams.endLocation}
                onChange={(e) =>
                  handleInputChange("endLocation", e.target.value)
                }
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleFilters}
              className={searchParams.showFilters ? "bg-gray-100" : ""}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {searchParams.showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-sm font-medium">From</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Starting point"
                    className="pl-9"
                    value={searchParams.startLocation}
                    onChange={(e) =>
                      handleInputChange("startLocation", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-sm font-medium">To</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Destination"
                    className="pl-9"
                    value={searchParams.endLocation}
                    onChange={(e) =>
                      handleInputChange("endLocation", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-sm font-medium">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal relative pl-9"
                    >
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      {searchParams.date ? (
                        format(searchParams.date, "PPP")
                      ) : (
                        <span className="text-gray-500">Select date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={searchParams.date}
                      onSelect={(date) => handleInputChange("date", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-1">
                <Label className="text-sm font-medium">Time</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="time"
                    className="pl-9"
                    value={searchParams.time}
                    onChange={(e) => handleInputChange("time", e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          <Button
            className="w-full md:w-auto md:self-end"
            onClick={handleSearch}
            disabled={!searchParams.endLocation}
          >
            Search Rides
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RideSearchForm;
