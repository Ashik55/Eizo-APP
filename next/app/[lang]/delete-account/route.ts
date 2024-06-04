import initializeSupabaseClient from "@/util/supabaseClient";
import { supabaseServerClient as supabaseServer } from "@/util/supabaseServerClient";
import { createResponse, handleError } from "@/util/network";

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  try {
    const supabaseClient = initializeSupabaseClient(request);

    // Verify user is logged in
    const data = await supabaseClient.auth.getUser();

    if (!data) {
      throw new Error("User not found");
    }

    // Delete user from Supabase
    const { error: deleteError } = await supabaseServer.auth.admin.deleteUser(
      data?.data?.user?.id!,
      true,
    );

    // Error while deleting user
    if (deleteError) {
      throw new Error("Something went wrong while deleting user!");
    }

    return createResponse({
      ok: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return handleError(error, "[ERROR] /delete-account");
  }
}
