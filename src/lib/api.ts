import { supabase } from "./supabase";
import { Database } from "@/types/database.types";

// Ride related functions
export async function getRides() {
  const { data, error } = await supabase
    .from("rides")
    .select("*, profiles(full_name, avatar_url, rating)")
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching rides:", error);
    return [];
  }

  return data;
}

export async function getRideById(id: string) {
  const { data, error } = await supabase
    .from("rides")
    .select("*, profiles(full_name, avatar_url, rating)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching ride ${id}:`, error);
    return null;
  }

  return data;
}

export async function createRide(
  rideData: Database["public"]["Tables"]["rides"]["Insert"],
) {
  const { data, error } = await supabase
    .from("rides")
    .insert(rideData)
    .select()
    .single();

  if (error) {
    console.error("Error creating ride:", error);
    return null;
  }

  return data;
}

export async function updateRide(
  id: string,
  rideData: Database["public"]["Tables"]["rides"]["Update"],
) {
  const { data, error } = await supabase
    .from("rides")
    .update(rideData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating ride ${id}:`, error);
    return null;
  }

  return data;
}

// Booking related functions
export async function createBooking(
  bookingData: Database["public"]["Tables"]["bookings"]["Insert"],
) {
  const { data, error } = await supabase
    .from("bookings")
    .insert(bookingData)
    .select()
    .single();

  if (error) {
    console.error("Error creating booking:", error);
    return null;
  }

  // Update available seats in the ride
  const { data: rideData } = await supabase
    .from("rides")
    .select("available_seats")
    .eq("id", bookingData.ride_id)
    .single();

  if (rideData) {
    const newAvailableSeats = rideData.available_seats - bookingData.seats;
    await supabase
      .from("rides")
      .update({ available_seats: newAvailableSeats })
      .eq("id", bookingData.ride_id);
  }

  return data;
}

export async function getUserBookings(userId: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, rides(*, profiles(full_name, avatar_url, rating))")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(`Error fetching bookings for user ${userId}:`, error);
    return [];
  }

  return data;
}

// Message related functions
export async function getConversations(userId: string) {
  // This is a simplified approach - in a real app you'd need a more complex query
  const { data: sentMessages, error: sentError } = await supabase
    .from("messages")
    .select("*, profiles!receiver_id(full_name, avatar_url)")
    .eq("sender_id", userId)
    .order("created_at", { ascending: false });

  const { data: receivedMessages, error: receivedError } = await supabase
    .from("messages")
    .select("*, profiles!sender_id(full_name, avatar_url)")
    .eq("receiver_id", userId)
    .order("created_at", { ascending: false });

  if (sentError || receivedError) {
    console.error("Error fetching conversations:", sentError || receivedError);
    return [];
  }

  // Combine and process to get unique conversations
  const allMessages = [...(sentMessages || []), ...(receivedMessages || [])];
  const conversations: Record<string, any> = {};

  allMessages.forEach((message) => {
    const otherUserId =
      message.sender_id === userId ? message.receiver_id : message.sender_id;

    if (
      !conversations[otherUserId] ||
      new Date(message.created_at) >
        new Date(conversations[otherUserId].created_at)
    ) {
      conversations[otherUserId] = {
        id: otherUserId,
        name: message.profiles?.full_name || "User",
        avatar: message.profiles?.avatar_url,
        lastMessage: message.text,
        time: message.created_at,
        unread: message.sender_id !== userId && !message.is_read ? 1 : 0,
      };
    } else if (message.sender_id !== userId && !message.is_read) {
      conversations[otherUserId].unread += 1;
    }
  });

  return Object.values(conversations);
}

export async function getMessages(userId: string, otherUserId: string) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
    .or(`sender_id.eq.${otherUserId},receiver_id.eq.${otherUserId}`)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching messages:", error);
    return [];
  }

  // Mark messages as read
  const unreadMessages = data
    .filter((msg) => msg.receiver_id === userId && !msg.is_read)
    .map((msg) => msg.id);

  if (unreadMessages.length > 0) {
    await supabase
      .from("messages")
      .update({ is_read: true })
      .in("id", unreadMessages);
  }

  return data;
}

export async function sendMessage(
  messageData: Database["public"]["Tables"]["messages"]["Insert"],
) {
  const { data, error } = await supabase
    .from("messages")
    .insert(messageData)
    .select()
    .single();

  if (error) {
    console.error("Error sending message:", error);
    return null;
  }

  return data;
}

// Profile related functions
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error(`Error fetching profile for user ${userId}:`, error);
    return null;
  }

  return data;
}

export async function updateUserProfile(
  userId: string,
  profileData: Database["public"]["Tables"]["profiles"]["Update"],
) {
  const { data, error } = await supabase
    .from("profiles")
    .update(profileData)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    console.error(`Error updating profile for user ${userId}:`, error);
    return null;
  }

  return data;
}

// Notification related functions
export async function getNotifications(userId: string) {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(`Error fetching notifications for user ${userId}:`, error);
    return [];
  }

  return data;
}

export async function markNotificationAsRead(notificationId: string) {
  const { error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("id", notificationId);

  if (error) {
    console.error(
      `Error marking notification ${notificationId} as read:`,
      error,
    );
    return false;
  }

  return true;
}

export async function createNotification(
  notificationData: Database["public"]["Tables"]["notifications"]["Insert"],
) {
  const { data, error } = await supabase
    .from("notifications")
    .insert(notificationData)
    .select()
    .single();

  if (error) {
    console.error("Error creating notification:", error);
    return null;
  }

  return data;
}
