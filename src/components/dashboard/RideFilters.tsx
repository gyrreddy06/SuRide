import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  Car,
  DollarSign,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface RideFiltersProps {
  onFilterChange?: (filters: FilterValues) => void;
  className?: string;
}

interface FilterValues {
  date: Date | undefined;
  vehicleType: string;
  minPrice: number;
  maxPrice: number;
}

const RideFilters = ({
  onFilterChange = () => {},
  className = "",
}: RideFiltersProps) => {
  const [date, setDate] = useState<Date>();
  const [vehicleType, setVehicleType] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    updateFilters({
      date: selectedDate,
      vehicleType,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    });
  };

  const handleVehicleTypeChange = (value: string) => {
    setVehicleType(value);
    updateFilters({
      date,
      vehicleType: value,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    });
  };

  const handlePriceRangeChange = (values: number[]) => {
    const newRange: [number, number] = [values[0], values[1]];
    setPriceRange(newRange);
    updateFilters({
      date,
      vehicleType,
      minPrice: newRange[0],
      maxPrice: newRange[1],
    });
  };

  const updateFilters = (filters: FilterValues) => {
    onFilterChange(filters);
  };

  const clearFilters = () => {
    setDate(undefined);
    setVehicleType("");
    setPriceRange([0, 100]);
    updateFilters({
      date: undefined,
      vehicleType: "",
      minPrice: 0,
      maxPrice: 100,
    });
  };

  const toggleFilters = () => {
    setIsFiltersVisible(!isFiltersVisible);
  };

  const activeFiltersCount = [
    date !== undefined,
    vehicleType !== "",
    priceRange[0] > 0 || priceRange[1] < 100,
  ].filter(Boolean).length;

  return (
    <div className={`w-full bg-white p-4 rounded-lg shadow-sm ${className}`}>
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center">
          <h3 className="text-lg font-medium">Find Available Rides</h3>
          <Button
            variant="outline"
            size="sm"
            className="ml-4 flex items-center gap-1"
            onClick={toggleFilters}
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <Badge
                variant="secondary"
                className="ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full"
              >
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search destinations..."
            className="w-full md:w-64"
          />
          <Button>Search</Button>
        </div>
      </div>

      {isFiltersVisible && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
          {/* Date Filter */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  {date ? format(date, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Vehicle Type Filter */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              <Car className="h-4 w-4" />
              Vehicle Type
            </Label>
            <Select value={vehicleType} onValueChange={handleVehicleTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select vehicle type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any</SelectItem>
                <SelectItem value="sedan">Sedan</SelectItem>
                <SelectItem value="suv">SUV</SelectItem>
                <SelectItem value="hatchback">Hatchback</SelectItem>
                <SelectItem value="minivan">Minivan</SelectItem>
                <SelectItem value="electric">Electric</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              Price Range (${priceRange[0]} - ${priceRange[1]})
            </Label>
            <Slider
              defaultValue={[0, 100]}
              value={priceRange}
              max={100}
              step={5}
              onValueChange={handlePriceRangeChange}
              className="py-4"
            />
          </div>

          <div className="md:col-span-3 flex justify-end">
            <Button variant="outline" onClick={clearFilters} className="mr-2">
              Clear Filters
            </Button>
            <Button onClick={() => setIsFiltersVisible(false)}>
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RideFilters;
