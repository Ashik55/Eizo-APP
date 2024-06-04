import { supabaseServerClient } from "@/util/supabaseServerClient";
import { PromptData } from "../../../../shared/schemas";
import { createResponse } from "@/util/network";
import { objectToCamel } from "ts-case-convert";

export const GET = async (request: Request): Promise<Response> => {
  console.log("GET /prompts");

  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const showLimit = parseInt(url.searchParams.get("limit") || "10", 10);
  const userId = url.searchParams.get("userId");
  const isAll = url.searchParams.get("isAll") === "true";

  try {
    const query = supabaseServerClient
      .from("prompts")
      .select(
        `
    *,
    user:users (
      id,
      nickname,
      profile_image_url
    )
  `,
        { count: "exact", head: false },
      )
      .eq("status", "finished")
      .order("created_at", { ascending: false })
      .range((page - 1) * showLimit, page * showLimit - 1);

    if (userId) {
      query.eq("user_id", userId);
    }

    if (!isAll) {
      query.eq("public", true);
    }

    const { data: promptsSnake, count, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    const hasMore = (count || 0) > page * showLimit;

    const promptsCamel = objectToCamel(promptsSnake as object) as PromptData[];

    return createResponse<{ prompts: PromptData[]; hasMore: boolean }>({
      ok: true,
      data: {
        prompts: promptsCamel,
        hasMore,
      },
    });
  } catch (error) {
    return createResponse({
      ok: false,
      error: `[ERROR] /prompts : ${error}`,
      message: "An unexpected error occurred in /recent-prompts",
    });
  }
};
