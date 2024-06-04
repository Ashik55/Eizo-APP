import { supabaseServerClient } from "@/util/supabaseServerClient";
import { PublishedImage, PublishedImageSchema } from "../../shared/schemas";

export const fetchPromptById = async (id: number) => {
  const { data: promptSnake, error } = await supabaseServerClient
    .from("prompts")
    .select()
    .eq("id", id)
    .single();

  return promptSnake;
};
