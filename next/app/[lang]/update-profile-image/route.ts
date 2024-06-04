import { createResponse, handleError } from "@/util/network";
import initializeSupabaseClient from "@/util/supabaseClient";
import {
  ProfilePhotoUpdate,
  ProfilePhotoUpdateSchema,
} from "../../../../shared/schemas";
import { supabaseServerClient as supabaseServer } from "@/util/supabaseServerClient";

// @ts-ignore
import { v4 } from "uuid";
import { cloudStorage } from "@/util/googleCloudStorage";

export async function POST(request: Request): Promise<Response> {
  try {
    const body = (await request.json()) as ProfilePhotoUpdate;

    ProfilePhotoUpdateSchema.parse(body);
    const supabaseClient = initializeSupabaseClient(request);

    // Verify user is logged in
    const user = await supabaseClient.auth.getUser();
    const userId = user?.data?.user?.id;

    if (!user) {
      throw new Error("Authentication required");
    }

    const UUID = v4() as string;
    const imageUrl = await uploadImage(UUID, body);

    if (!imageUrl) {
      throw new Error("Failed to upload image");
    }

    const { error } = await supabaseServer
      .from("users")
      .update({
        profile_image_url: imageUrl,
      })
      .eq("id", userId!)
      .select("*");

    if (error) {
      throw new Error(error.message);
    }

    return createResponse({
      ok: true,
      message: "Updated photo successfully",
    });
  } catch (error) {
    return handleError(error, "[ERROR] /update-profile-photo");
  }
}

async function uploadImage(
  UUID: string,
  body: ProfilePhotoUpdate,
): Promise<string> {
  const { imageData } = body;

  const fileName = `profile_photos/${UUID}.png`;
  const bucket = cloudStorage.bucket("eizoai");

  // Upload the image to Google Cloud Storage
  await bucket.file(fileName).save(Buffer.from(imageData, "base64"));

  return `https://storage.googleapis.com/eizoai/${fileName}`;
}
