import React from "react";
import { MapPin, Calendar, Clock, Users, DollarSign, Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface RideCardProps {
  id?: string;
  startLocation?: string;
  endLocation?: string;
  date?: string;
  time?: string;
  price?: number;
  availableSeats?: number;
  driverName?: string;
  driverRating?: number;
  driverAvatar?: string;
  vehicleType?: string;
  onClick?: () => void;
}

const RideCard = ({
  id = "1",
  startLocation = "San Francisco, CA",
  endLocation = "Los Angeles, CA",
  date = "May 15, 2023",
  time = "08:00 AM",
  price = 45,
  availableSeats = 3,
  driverName = "Alex Johnson",
  driverRating = 4.8,
  driverAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  vehicleType = "SUV",
  onClick = () => {},
}: RideCardProps) => {
  return (
    <Card className="w-full h-[160px] bg-white overflow-hidden hover:shadow-md transition-shadow duration-300 rounded-xl">
      <CardHeader className="p-3 pb-0 flex flex-row justify-between items-start">
        <div>
          <div className="flex items-center gap-1 text-xs font-medium">
            <MapPin className="h-3 w-3 text-gray-500" />
            <span className="truncate max-w-[120px]">{startLocation}</span>
            <span className="mx-0.5">→</span>
            <span className="truncate max-w-[120px]">{endLocation}</span>
          </div>
          <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-500">
            <div className="flex items-center gap-0.5">
              <Calendar className="h-2.5 w-2.5" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-0.5">
              <Clock className="h-2.5 w-2.5" />
              <span>{time}</span>
            </div>
          </div>
        </div>
        <Badge variant="secondary" className="text-[10px] h-5 px-1.5">
          {vehicleType}
        </Badge>
      </CardHeader>

      <CardContent className="p-3 pt-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <Avatar className="h-7 w-7">
              <AvatarImage src={driverAvatar} alt={driverName} />
              <AvatarFallback>{driverName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-xs font-medium">{driverName}</div>
              <div className="flex items-center text-[10px]">
                <Star className="h-2.5 w-2.5 text-yellow-500 mr-0.5 fill-yellow-500" />
                <span>{driverRating}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-0.5">
              <Users className="h-3 w-3 text-gray-500" />
              <span className="text-xs">{availableSeats} seats</span>
            </div>
            <div className="flex items-center gap-0.5 font-medium text-green-600">
              <DollarSign className="h-3 w-3" />
              <span className="text-sm">${price}</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-3 pt-0">
        <Button
          onClick={onClick}
          className="w-full h-7 text-xs rounded-full"
          size="sm"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RideCard;
