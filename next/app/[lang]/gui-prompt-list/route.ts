import { createResponse, handleError } from "@/util/network";
import { GuiPromptData, GuiPromptDataSchema } from "../../../../shared/schemas";
import { z } from "zod";
import { GUI_PROMPT_LIST } from "../../../../shared/GUI_PROMPT_LIST";

export async function GET(request: Request): Promise<Response> {
  console.log("GET /gui-prompt-list");

  try {
    const validatedData = z.array(GuiPromptDataSchema).parse(GUI_PROMPT_LIST);
    return createResponse<GuiPromptData[]>({
      ok: true,
      data: validatedData,
    });
  } catch (error) {
    return handleError(error, "[ERROR] /gui-prompt-list");
  }
}
