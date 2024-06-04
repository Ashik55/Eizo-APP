import { supabaseServerClient } from "@/util/supabaseServerClient";
import {
  PublishedImage,
  PublishedImageSchema,
} from "../../../../shared/schemas";
import { z } from "zod";
import { createResponse, handleError } from "@/util/network";
import { snakeToCamel } from "google-auth-library/build/src/util";

export const GET = async (request: Request): Promise<Response> => {
  console.log("GET /published-images");

  try {
    const { data: publishedImages, error } = await supabaseServerClient
      .from("published_images")
      .select(
        `
    id,
    userId:user_id,
    promptId:prompt_id,
    uploadedImageUrls:uploaded_image_urls,
    aspectRatio:aspect_ratio,
    user:users (
      id,
      nickname,
      profileImageUrl:profile_image_url
    )
  `,
        { count: "exact" },
      )
      .order("created_at", { ascending: false })
      .limit(2)
      .returns<PublishedImage[]>();

    if (error) {
      throw new Error(error.message);
    }

    const validatedData = z.array(PublishedImageSchema).parse(publishedImages);

    return createResponse<PublishedImage[]>({
      ok: true,
      data: validatedData,
    });
  } catch (error) {
    return handleError(error, "[ERROR] /published-images");
  }
};
