import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://inhlygnonkpslheuiypd.supabase.co";

const supabaseAdminKey = process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY;

export const supabaseAdmin = createClient(supabaseUrl, supabaseAdminKey);
export const supabase = createClient(
  supabaseUrl,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);
