import initializeSupabaseClient from "@/util/supabaseClient";
import { supabaseServerClient as supabaseServer } from "@/util/supabaseServerClient";
import { createResponse, handleError } from "@/util/network";
import { objectToCamel } from "ts-case-convert";
import { User, UserSchema } from "../../../../shared/schemas";
// import { User, UserSchema } from "@/shared/schemas";

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  try {
    const supabaseClient = initializeSupabaseClient(request);

    // Verify user is logged in
    const user = await supabaseClient.auth.getUser();

    if (!user) {
      throw new Error("Authentication required");
    }

    // Delete user from Supabase

    const { data, error } = await supabaseServer
      .from("users")
      .select("*")
      .eq("id", user?.data?.user?.id!)
      .single();

    if (error) {
      console.error("Error getting user data:", error);
      throw new Error("User not found");
    }

    const camelCasedUserData = objectToCamel(data as object) as User;
    const validatedData = UserSchema.parse(camelCasedUserData);

    return createResponse<User>({
      ok: true,
      data: validatedData,
    });
  } catch (error) {
    return handleError(error, "[ERROR] /account-data");
  }
}
