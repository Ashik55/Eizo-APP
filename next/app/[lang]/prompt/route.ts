import { supabaseServerClient } from "@/util/supabaseServerClient";
import { PromptData, PromptDataSchema } from "../../../../shared/schemas";
import { createResponse } from "@/util/network";
import { objectToCamel } from "ts-case-convert";
import { z } from "zod";

export const GET = async (request: Request): Promise<Response> => {
  console.log("GET /prompt");

  const url = new URL(request.url);
  const promptId = url.searchParams.get("promptId");

  if (!promptId) {
    return createResponse({
      ok: false,
      error: "Missing promptId parameter",
      message: "Please provide a promptId query parameter.",
    });
  }

  try {
    const { data: promptSnake, error } = await supabaseServerClient
      .from("prompts")
      .select()
      .eq("id", promptId)
      .single();

    const prompt = objectToCamel(promptSnake as object) as PromptData;

    if (error) {
      throw new Error(error.message);
    }

    const validatedData = PromptDataSchema.parse(prompt);

    return createResponse<PromptData>({
      ok: true,
      data: validatedData,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation failed:", JSON.stringify(error, null, 2));
    }
    return createResponse({
      ok: false,
      error: `[ERROR] /prompt : ${error}`,
      message: "An unexpected error occurred in /prompt",
    });
  }
};
