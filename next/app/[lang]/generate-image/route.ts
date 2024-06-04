import { Storage } from "@google-cloud/storage";
import { v4 } from "uuid";
import initializeSupabaseClient from "@/util/supabaseClient";
import { createResponse, handleError } from "@/util/network";
import { checkUserCredits, subtractUserCredits } from "@/lib/creditsApi";
import { supabaseServerClient } from "@/util/supabaseServerClient";
import { Json } from "../../../../shared/types/supabase";
import {
  Fields,
  GenerateImageRequestBody,
  PromptData,
  PromptDataSchema,
} from "../../../../shared/schemas";
import { AsyncTaskResult, Image } from "../../../../shared/schemaNovita";
import { objectToCamel, objectToSnake } from "ts-case-convert";
import axios from "axios/index";
import { fetchPromptById } from "@/lib/fetchPromptById";

const storage = new Storage({
  projectId: "eizo-413609",
  credentials: {
    client_email: "eizoai@eizo-413609.iam.gserviceaccount.com",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCYSc3Qti6LPs2T\ntYrlOh4zqveDQGkfL+DxEon/1wKAgHcr32BnHna28R7JysizW8AJLy5mhEmjMM5N\np5qRZTUj5mACrmSmdyOYQKKrg3ixU1If56ATogdbN/0MhYcHU4uOO5nB+eH5q41y\n7P8Q3XQATWPVBrHwY1B+HbFr1BOOemswF38c0Y6/9Hxy+/ebd4H/qy+3iTbqQGiS\nVGgUUR/Ggc+bfSCgsM1C+5XYi6oRutTtzjLh7uy/GNg7NXIVCPxItRWh7Wd4RHbo\nTCiIr197+B+oRcgAjGPR6cvJFpqr69Ylvaew8M0o6CfBtp8FOwp8gyKZGSIsaNuD\n5bqHh2CvAgMBAAECggEAOSMvyoggLHRy02HA7EKDBGW4GhG3n1Dqd+i5yDjWonoQ\nvHBCDk6awgbzw0iHRuw8v/Vo1mP58PWl4fLphnXPm1mbWkYuU1rOCxjtL6bTSMz3\nOitAnz0iv3HhSqpqwC/zY3kvNl1YEMHx/1W2WZCNLnPa6hlp98R7deYUJF3cvI7T\npHwHT8QkeQizWn2bD1Hay5KkI5seNxJkHcK58wOU8UImOOTcurz/siYBESMQP7ae\nwnCwSgotXkiGI1jVKKH+7VErb2pVzMZ2Oq/InJvpdgHwc9NC5hGBfV+Xz7lDm9Pm\nU4VnErG8OQyjUsbHD+KdaBSpERVkb/dR3ZjkjReAiQKBgQDKfSrF/IbdmUv9T9Bh\nUtNPO1Hc5G84VzxaOojxQuHyFgtMbHbuBMqzzf8YZK7Dn7ZYe0xD96V9XzD8pwj0\n+IBiuBSJM5yib7/2j+r73SXUSC+XYt0NJYzGyjx//s9IVUZa0YFbbPhcS4Z1/cpF\nF+fRC9HX/0RPB/bhkuqldhjPNQKBgQDAiHNaGwoxP4IApnSVmO7jA1ehJ9XVnWOz\njlnUUCHwQ9+jqoKVb5TTThfj1Z9QbELyulRYegy5LK8Uz281ZQEKbdeq9fRY+YXV\nfHRBSl1OVugKxwfwstP5c3vPVPRXWw4yEl3wysQILsxfqJpyyDEdR/v1bgwyQUa4\nP25vt9040wKBgCKSDhxxScFJq9yapNQI5QTQ9uAErCxtUGODPOAb8CF5vAIXPpLS\nhJ0AHX5XqjLB8MrYeiPcgweNmfp4tiHEz36LOQ5XnnVpKNf6qD7J+extSprJCT52\nW7uQyZV8tnz9+h4FSNWIHDr9tf4tDzyOoUhigTgkX9AyZucKQz9ukzvFAoGBAKFm\nAaUog7vTLE0VPShnQuMlWyFqvnRLc1gDXkSARGMg0upltwBEwLL+hUJmQx5tExZd\novVkoyPcVI0Sc3yERoISoLfdZU/tJQdZRC+zglJ4wh6+yGY70z0LVV/yLL7KQzUw\ndnWz1O+zI3qRYaAVOC7+uDX/YdQDKqCr9A1NSfMnAoGAFRnqGDHzXhS0wM4nwpYk\nwGQcSMsCc6tvDjYCHxUV4MNAldRGsgxLi9N5W87a6tCEgMUVwxgIMbXKmPP8V0+z\n4rkO/jzcZQQkw88D8lCwezIJDZxvHyag2Q5EIklf2g4HMLMYj7Mnvb6eCizER/Qb\nMmMK5veUncOTCam0HNY0nj0=\n-----END PRIVATE KEY-----\n",
  },
});

export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  console.log("POST /generate-image");
  try {
    const json = await request.json();
    const {
      fields,
      selectedRatio,
      selectedCategoryAndPromptItem,
      skipAds,
      stylePromptItemId,
      textPrompt,
    }: GenerateImageRequestBody = json;

    console.log("json:", JSON.stringify(json, null, 2));

    const supabaseClient = initializeSupabaseClient(request);

    // Verify User Authenticated
    const userAuthDetails = await supabaseClient.auth.getUser();
    const userId = userAuthDetails?.data?.user?.id;

    if (!userId) {
      throw new Error("User ID is missing");
    }

    // if (skipAds) {
    //   await processSkipAds(userId);
    // }

    const insertedPromptId = await insertPrompt(
      userId,
      fields,
      selectedRatio,
      selectedCategoryAndPromptItem,
      stylePromptItemId,
      textPrompt,
    );
    const snakeFields = objectToSnake(fields as object);

    console.log("snakeFields:", JSON.stringify(snakeFields, null, 2));

    // return;
    const responseNovita = await axios.post(
      "https://api.novita.ai/v3/async/txt2img",
      {
        request: snakeFields,
        extra: {
          response_image_type: "jpeg",
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NOVITA_API_TOKEN}`,
        },
      },
    );

    const responseNovitaJson = responseNovita.data;
    console.log(
      "responseNovitaData::: ",
      JSON.stringify(responseNovitaJson, null, 2),
    );
    // const aa = await responseNovita.data;

    // @ts-ignore
    const taskId = responseNovita.data.task_id;

    console.log("taskId: ", taskId);

    // @ts-ignore
    if (!taskId) {
      throw new Error("No task ID found in response.");
    }

    await otherProcesses(taskId, insertedPromptId);

    const prompt = await fetchPromptById(insertedPromptId);

    const camelPrompt = objectToCamel(prompt as object) as PromptData;

    const validatedData = PromptDataSchema.parse(camelPrompt);

    return createResponse<PromptData>({
      ok: true,
      data: validatedData,
    });
  } catch (error) {
    return handleError(error, "[ERROR] /generate-image");
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchTaskResult(
  taskId: string,
  insertedPromptId: number,
  maxAttempts: number = 30,
): Promise<AsyncTaskResult> {
  const NOVITA_API_ENDPOINT = `https://api.novita.ai/v3/async/task-result?task_id=${taskId}`;
  try {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      await sleep(800); // Delay between retries

      const response = await axios.get<AsyncTaskResult>(NOVITA_API_ENDPOINT, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${NOVITA_API_TOKEN}`,
        },
      });

      const asyncTaskResult = response.data as AsyncTaskResult;

      // @ts-ignore
      const status = asyncTaskResult?.task.status;

      // If the task status is either "SUCCEED" or "FAILED", break the loop and return the result
      if (status === "TASK_STATUS_SUCCEED" || status === "TASK_STATUS_FAILED") {
        console.log("Final Task Result:", asyncTaskResult);
        return asyncTaskResult;
      } else if (status === "TASK_STATUS_QUEUED") {
        await updatePrompt(insertedPromptId, {
          status: "queue",
        });
      }
    }
    // After exhausting all attempts, if no return has occurred, it means the task has not succeeded or failed within the attempts
    throw new Error(
      "Task did not complete within the maximum number of attempts.",
    );
  } catch (e) {
    console.error("Error fetching task result:", e);
    throw e; // Rethrow or handle error as needed
  }
}

async function updatePrompt(id: number, updates: object): Promise<void> {
  const snakeUpdates = objectToSnake(updates);

  console.log(`id: ${id}`, JSON.stringify(snakeUpdates, null, 2));
  const { error } = await supabaseServerClient
    .from("prompts")
    .update(snakeUpdates)
    .eq("id", id);

  if (error) throw new Error(`Failed to update prompt. ${error.message}`);
}

async function otherProcesses(taskId: string, insertedPromptId: number) {
  try {
    const taskResult = await fetchTaskResult(taskId, insertedPromptId);

    if (!taskResult || !taskResult?.images || taskResult.images.length < 1) {
      throw new Error("No images found or task processing incomplete.");
    }

    // @ts-ignore
    const uploadedImageUrls = await uploadImage(taskResult?.images);

    console.log(
      "uploadedImageUrls:",
      JSON.stringify(uploadedImageUrls, null, 2),
    );
    console.log("taskResult:", JSON.stringify(taskResult, null, 2));

    // Final update with actual image URLs
    await updatePrompt(insertedPromptId, {
      responseFromNovita: taskResult,
      uploadedImageUrls: uploadedImageUrls,
      status: "finished",
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error processing task result.");
  }
}

// export interface NovitaAiImageData {
//   image_url: string;
//   image_url_ttl: number;
//   image_type: "jpeg" | "png" | "webp";
//   nsfw_detection_result: object;
// }
const uploadImage = async (novitaAiImageData: Image[]): Promise<string[]> => {
  console.log("uploadImage:", JSON.stringify(novitaAiImageData, null, 2));
  const uploadedUrls: string[] = await Promise.all(
    novitaAiImageData.map(async (novitaAiImageData) => {
      try {
        const imageUrl = novitaAiImageData.image_url;
        const UUID = v4();
        const response = await fetch(imageUrl);

        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${response.statusText}`);
        }

        const buffer = await response.arrayBuffer();
        const fileName = `ugc_novitaai/${UUID}.png`;
        const bucket = storage.bucket("eizoai");

        await bucket.file(fileName).save(Buffer.from(buffer), {
          metadata: {
            contentType: "image/png",
            metadata: {
              "x-goog-meta-test": "data",
            },
          },
        });

        return `https://storage.googleapis.com/eizoai/${fileName}`;
      } catch (error) {
        // @ts-ignore
        console.error(`Error uploading image: ${error.message}`);
        return ""; // Return an empty string or handle the error as needed
      }
    }),
  );

  return uploadedUrls.filter((url) => url !== ""); // Filter out any empty strings
};

async function processSkipAds(userId: string): Promise<void> {
  const response = await checkUserCredits(userId);
  const { ok, data } = await response.json();

  if (!ok) {
    console.error("Error checking user credits");
    throw new Error("Error checking user credits");
  }

  if (data && data.credits) {
    const subtractResponse = await subtractUserCredits(
      userId,
      data.credits,
      60,
    );
    const { ok: subtractOk } = await subtractResponse.json();

    if (!subtractOk) {
      console.error("Error subtracting user credits");
      throw new Error("Error subtracting user credits");
    }
  }
}

async function insertPrompt(
  userId: string,
  fields: Fields,
  selectedRatio: string,
  selectedCategoryAndPromptItem: unknown,
  stylePromptItemId: string,
  textPrompt: string,
): Promise<number> {
  const { error: insertError, data: insertedPrompt } =
    await supabaseServerClient
      .from("prompts")
      .insert({
        user_id: userId,
        status: "processing",
        fields: objectToSnake(fields) as unknown as Json,
        gui_prompts: {
          selectedRatio,
          selectedCategoryAndPromptItem,
        } as Json,
        text_prompt: textPrompt,
        style_prompt_item_id: stylePromptItemId,
      })
      .select("id")
      .single();

  if (insertError) {
    console.error("Error inserting prompt:", insertError);
    throw new Error("Failed to insert prompt.");
  }

  const insertedPromptId = insertedPrompt?.id;

  if (!insertedPromptId) {
    throw new Error("Failed to retrieve inserted prompt ID.");
  }

  return insertedPromptId;
}
