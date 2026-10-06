import { createClient } from "@supabase/supabase-js";

// Substitua com as informações que você pegou no painel do Supabase
const SUPABASE_URL = "https://mpgjxtwhfrklkmndpmaq.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wZ2p4dHdoZnJrbGttbmRwbWFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA3MTk0MjIsImV4cCI6MjEwNjI5NTQyMn0.RgK8yh4v9cOOh6PcSX2Eu3agWldNJHyzU47xQPGGgO8";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
