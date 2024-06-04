import { createClient } from "@supabase/supabase-js";
import { Database } from "../../shared/types/supabase";

function initializeSupabaseClient(request: Request) {
  // Ensure the environment variables are defined
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    throw new Error(
      "Supabase URL and/or ANON KEY are not defined in environment variables.",
    );
  }

  // Extract the Authorization header from the incoming request
  const authorizationHeader = request.headers.get("Authorization");

  // Initialize and return the Supabase client
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      global: {
        // @ts-ignore - Ignoring TypeScript error for demonstration purposes
        headers: { Authorization: authorizationHeader },
      },
      auth: {
        autoRefreshToken: false,
      },
    },
  );
}

export default initializeSupabaseClient;
