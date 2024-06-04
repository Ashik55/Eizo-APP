import { supabaseServerClient } from "@/util/supabaseServerClient";
import { PublishedImage, PublishedImageSchema } from "../../shared/schemas";

export const fetchPublishedImageById = async (id: number) => {
  const { data: publishedImage, error } = await supabaseServerClient
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
    )
    .eq("id", id)
    .single();

  return publishedImage;
};
