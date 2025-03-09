import React from "react";
import {
  Bell,
  MessageSquare,
  Car,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type NotificationType =
  | "ride_request"
  | "ride_confirmed"
  | "ride_cancelled"
  | "message"
  | "payment"
  | "system";

interface NotificationItemProps {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  actionLabel?: string;
  onAction?: () => void;
  onMarkAsRead?: (id: string) => void;
}

const NotificationItem = ({
  id,
  type,
  title,
  message,
  time,
  isRead,
  actionLabel,
  onAction,
  onMarkAsRead,
}: NotificationItemProps) => {
  const getIcon = () => {
    switch (type) {
      case "ride_request":
      case "ride_confirmed":
      case "ride_cancelled":
        return <Car className="h-5 w-5 text-blue-600" />;
      case "message":
        return <MessageSquare className="h-5 w-5 text-purple-600" />;
      case "payment":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "system":
      default:
        return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div
      className={`p-4 border rounded-lg ${!isRead ? "bg-blue-50" : "bg-white"}`}
    >
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
          {getIcon()}
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{title}</h3>
              <p className="text-sm text-gray-600 mt-1">{message}</p>
            </div>
            {!isRead && (
              <Badge
                variant="secondary"
                className="ml-2 bg-blue-100 text-blue-800"
              >
                New
              </Badge>
            )}
          </div>

          <div className="flex justify-between items-center mt-3">
            <span className="text-xs text-gray-500">{time}</span>

            <div className="flex gap-2">
              {!isRead && onMarkAsRead && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-8"
                  onClick={() => onMarkAsRead(id)}
                >
                  Mark as read
                </Button>
              )}

              {actionLabel && onAction && (
                <Button size="sm" className="text-xs h-8" onClick={onAction}>
                  {actionLabel}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
