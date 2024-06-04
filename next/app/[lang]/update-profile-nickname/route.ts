import { createResponse, handleError } from "@/util/network";
import initializeSupabaseClient from "@/util/supabaseClient";
import {
  ProfileNicknameUpdate,
  ProfileNicknameUpdateSchema,
} from "../../../../shared/schemas";
import { supabaseServerClient as supabaseServer } from "@/util/supabaseServerClient";

export async function POST(request: Request): Promise<Response> {
  try {
    const body = (await request.json()) as ProfileNicknameUpdate;

    // Validate request body
    ProfileNicknameUpdateSchema.parse(body);
    const supabaseClient = initializeSupabaseClient(request);

    // Verify user is logged in
    const user = await supabaseClient.auth.getUser();
    const userId = user?.data?.user?.id;

    if (!user) {
      throw new Error("Authentication required");
    }

    const { error } = await supabaseServer
      .from("users")
      .update({
        nickname: body.nickname,
      })
      .eq("id", userId!)
      .select("*");

    if (error) {
      throw new Error(error.message);
    }

    return createResponse({
      ok: true,
      message: "Updated nickname successfully",
    });
  } catch (error) {
    return handleError(error, "[ERROR] /update-profile-nickname");
  }
}
