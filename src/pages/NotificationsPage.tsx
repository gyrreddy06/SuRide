import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getNotifications, markNotificationAsRead } from "@/lib/api";
import { mockNotifications } from "@/data/mockData";
import { useSupabaseData } from "@/hooks/useSupabaseData";
import { Bell, Calendar, MapPin, Car, DollarSign, User, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NotificationSkeleton } from "@/components/LoadingState";

interface Notification {
  id: string;
  type:
    | "ride_request"
    | "ride_accepted"
    | "ride_canceled"
    | "payment"
    | "system";
  title: string;
  message: string;
  time: string;
  read: boolean;
  data?: {
    userId?: string;
    userName?: string;
    userAvatar?: string;
    rideId?: string;
    from?: string;
    to?: string;
    date?: string;
    amount?: number;
  };
}

const NotificationsPage = () => {
  const { user } = useAuth();

  // Fetch notifications from Supabase
  const { data: supabaseNotifications, loading } = useSupabaseData(
    () => (user ? getNotifications(user.id) : Promise.resolve([])),
    [user?.id],
  );

  // Process notifications from mock data
  const [notifications, setNotifications] = React.useState<Notification[]>(
    mockNotifications.map((notif) => ({
      id: notif.id,
      type: notif.type as any,
      title: notif.title,
      message: notif.message,
      time: formatTimeAgo(notif.createdAt),
      read: notif.isRead,
      data: notif.data,
    })),
  );

  // Helper function to format time
  function formatTimeAgo(date: Date) {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    return date.toLocaleDateString();
  }

  // Update notifications when data is fetched from Supabase
  useEffect(() => {
    if (supabaseNotifications && supabaseNotifications.length > 0) {
      // Transform the data to match our Notification interface
      const transformedNotifications = supabaseNotifications.map(
        (notification: any) => ({
          id: notification.id,
          type: notification.type as any,
          title: notification.title,
          message: notification.message,
          time: new Date(notification.created_at).toLocaleString(),
          read: notification.is_read,
          data: notification.data,
        }),
      );

      setNotifications(transformedNotifications);
    }
  }, [supabaseNotifications]);

  const markAsRead = async (id: string) => {
    if (!user) return;

    try {
      // Mark notification as read in Supabase
      const success = await markNotificationAsRead(id);

      if (success) {
        setNotifications(
          notifications.map((notification) =>
            notification.id === id
              ? { ...notification, read: true }
              : notification,
          ),
        );
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true })),
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id),
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "ride_request":
        return <User className="h-5 w-5 text-blue-500" />;
      case "ride_accepted":
        return <Car className="h-5 w-5 text-green-500" />;
      case "payment":
        return <DollarSign className="h-5 w-5 text-green-500" />;
      case "ride_canceled":
        return <X className="h-5 w-5 text-red-500" />;
      case "system":
        return <Bell className="h-5 w-5 text-primary" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Notifications</h1>
        {unreadCount > 0 && (
          <Button variant="ghost" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        )}
      </div>

      <ScrollArea className="h-[calc(100vh-140px)]">
        {loading ? (
          <NotificationSkeleton />
        ) : notifications.length > 0 ? (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`${!notification.read ? "border-l-4 border-l-primary" : ""}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                      {notification.data?.userAvatar ? (
                        <Avatar>
                          <AvatarImage
                            src={notification.data.userAvatar}
                            alt={notification.data.userName || ""}
                          />
                          <AvatarFallback>
                            {notification.data.userName?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        getNotificationIcon(notification.type)
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{notification.title}</h3>
                          <p className="text-sm text-gray-600">
                            {notification.message}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      {notification.data && notification.data.from && (
                        <div className="mt-2 bg-gray-50 p-2 rounded-md text-sm">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-gray-500" />
                            <span>
                              {notification.data.from} → {notification.data.to}
                            </span>
                          </div>
                          {notification.data.date && (
                            <div className="flex items-center gap-1 mt-1">
                              <Calendar className="h-3 w-3 text-gray-500" />
                              <span>{notification.data.date}</span>
                            </div>
                          )}
                          {notification.data.amount && (
                            <div className="flex items-center gap-1 mt-1 text-green-600 font-medium">
                              <DollarSign className="h-3 w-3" />
                              <span>${notification.data.amount}</span>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">
                          {notification.time}
                        </span>
                        {!notification.read && (
                          <Badge
                            variant="outline"
                            className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark as read
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-gray-500">
            <Bell className="h-12 w-12 text-gray-300 mb-2" />
            <p>No notifications</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default NotificationsPage;
