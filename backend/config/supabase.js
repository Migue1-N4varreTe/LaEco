import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey = process.env.SUPABASE_ANON_KEY || "placeholder-key";
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_KEY || "placeholder-service-key";

// For development, create clients even with placeholder values
let supabase = null;
let supabaseAdmin = null;

try {
  // Client for general operations
  supabase = createClient(supabaseUrl, supabaseKey);

  // Admin client for service operations
  supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

  console.log(
    "✅ Supabase clients initialized (using placeholder values if needed)",
  );
} catch (error) {
  console.warn("⚠️ Supabase initialization failed:", error.message);
  console.warn("Please configure your Supabase environment variables in .env");
}

export { supabase, supabaseAdmin };
