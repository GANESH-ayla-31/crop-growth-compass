
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://zezswzwqgqjlpvahsjvx.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InplenN3endxZ3FqbHB2YWhzanZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0MzU2MzcsImV4cCI6MjA2MTAxMTYzN30.qrVSkRNeiHolJZC8WJvmkZUKUigJlu1bov-wc07b31s";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
