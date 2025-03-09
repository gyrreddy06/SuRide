import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/database.types";

// Set default values for Supabase URL and key for development
// These are placeholders that will prevent the app from crashing
// In a real app, these would be set in environment variables
const supabaseUrl = "https://iuvovmfdyihlogoymvaa.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1dm92bWZkeWlobG9nb3ltdmFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NDAyMDMsImV4cCI6MjA1NzAxNjIwM30.duAx4SRxBCPv3u8OUc8EIUVfysoAPbDb_CKm9fY4vKM";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
