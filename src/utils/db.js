import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://inhlygnonkpslheuiypd.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImluaGx5Z25vbmtwc2xoZXVpeXBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY1ODA5NDAsImV4cCI6MjAyMjE1Njk0MH0.StHxa_jO17U7QLzZA4-kHJKofxKkdXKxLStNuBTnczY";
export const supabase = createClient(supabaseUrl, supabaseKey);
