import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xacjzwjgirwvjvfajytz.supabase.co";
const supabaseKey = "sb_publishable_8fCvM49GE1VFIvVRGWfX3w_ZjZf780J";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);