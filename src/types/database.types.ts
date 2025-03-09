export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      rides: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          start_location: string;
          end_location: string;
          date: string;
          time: string;
          price: number;
          available_seats: number;
          vehicle_type: string;
          vehicle_model: string;
          vehicle_color: string;
          license_plate: string;
          allow_pets: boolean;
          allow_smoking: boolean;
          allow_luggage: boolean;
          description: string | null;
          status: "active" | "completed" | "cancelled";
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          start_location: string;
          end_location: string;
          date: string;
          time: string;
          price: number;
          available_seats: number;
          vehicle_type: string;
          vehicle_model: string;
          vehicle_color: string;
          license_plate: string;
          allow_pets?: boolean;
          allow_smoking?: boolean;
          allow_luggage?: boolean;
          description?: string | null;
          status?: "active" | "completed" | "cancelled";
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          start_location?: string;
          end_location?: string;
          date?: string;
          time?: string;
          price?: number;
          available_seats?: number;
          vehicle_type?: string;
          vehicle_model?: string;
          vehicle_color?: string;
          license_plate?: string;
          allow_pets?: boolean;
          allow_smoking?: boolean;
          allow_luggage?: boolean;
          description?: string | null;
          status?: "active" | "completed" | "cancelled";
        };
      };
      bookings: {
        Row: {
          id: string;
          created_at: string;
          ride_id: string;
          user_id: string;
          seats: number;
          status: "pending" | "confirmed" | "cancelled" | "completed";
          payment_status: "pending" | "completed" | "refunded";
        };
        Insert: {
          id?: string;
          created_at?: string;
          ride_id: string;
          user_id: string;
          seats: number;
          status?: "pending" | "confirmed" | "cancelled" | "completed";
          payment_status?: "pending" | "completed" | "refunded";
        };
        Update: {
          id?: string;
          created_at?: string;
          ride_id?: string;
          user_id?: string;
          seats?: number;
          status?: "pending" | "confirmed" | "cancelled" | "completed";
          payment_status?: "pending" | "completed" | "refunded";
        };
      };
      messages: {
        Row: {
          id: string;
          created_at: string;
          sender_id: string;
          receiver_id: string;
          text: string;
          is_read: boolean;
          ride_id: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          sender_id: string;
          receiver_id: string;
          text: string;
          is_read?: boolean;
          ride_id?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          sender_id?: string;
          receiver_id?: string;
          text?: string;
          is_read?: boolean;
          ride_id?: string | null;
        };
      };
      profiles: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          full_name: string;
          avatar_url: string | null;
          bio: string | null;
          phone: string | null;
          rating: number | null;
          rides_completed: number;
          rides_offered: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          full_name: string;
          avatar_url?: string | null;
          bio?: string | null;
          phone?: string | null;
          rating?: number | null;
          rides_completed?: number;
          rides_offered?: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          full_name?: string;
          avatar_url?: string | null;
          bio?: string | null;
          phone?: string | null;
          rating?: number | null;
          rides_completed?: number;
          rides_offered?: number;
        };
      };
      reviews: {
        Row: {
          id: string;
          created_at: string;
          ride_id: string;
          reviewer_id: string;
          reviewed_id: string;
          rating: number;
          comment: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          ride_id: string;
          reviewer_id: string;
          reviewed_id: string;
          rating: number;
          comment?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          ride_id?: string;
          reviewer_id?: string;
          reviewed_id?: string;
          rating?: number;
          comment?: string | null;
        };
      };
      notifications: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          type: string;
          title: string;
          message: string;
          is_read: boolean;
          data: Json | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          type: string;
          title: string;
          message: string;
          is_read?: boolean;
          data?: Json | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          type?: string;
          title?: string;
          message?: string;
          is_read?: boolean;
          data?: Json | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
