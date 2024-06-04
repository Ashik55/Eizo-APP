import { createResponse, handleError } from "@/util/network";
import { supabaseServerClient } from "@/util/supabaseServerClient";

export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  try {
    const { promptId, isPublic } = await request.json();

    // Check if the request has the required parameters
    if (!promptId || typeof isPublic !== "boolean") {
      return handleError(
        "Prompt ID and isPublic are required",
        "[ERROR] /api/update-public-status: Missing or invalid parameters",
      );
    }

    // Update the public status of the prompt
    const { error: updateError } = await supabaseServerClient
      .from("prompts")
      .update({ public: isPublic })
      .eq("id", promptId);

    if (updateError) {
      return handleError(
        updateError,
        "[ERROR] /api/update-public-status: Error updating prompt public status",
      );
    }

    return createResponse({
      ok: true,
      message: `Prompt public status updated to ${isPublic}`,
    });
  } catch (error) {
    return handleError(
      error,
      "[ERROR] /api/update-public-status: Unexpected error",
    );
  }
}
