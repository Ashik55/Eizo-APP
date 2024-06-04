// npx ts-node --transpileOnly --esm scripts/createGuiImageItem.ts

import fs from "fs";
import axios from "axios";
import { Storage } from "@google-cloud/storage";
import util from "util";
import { objectToCamel } from "ts-case-convert";

const API_BASE_URL = "https://api.novita.ai/v3/async";
const API_KEY = "ce5cd576-150b-48e0-81b1-11dafe088cd0";

const CATEGORY = "model";
// const PROMPT_NAME = "House";
const NOVITA_IMAGE_URL =
  "https://next-app-static.s3.amazonaws.com/images-prod/xG1nkqKTMzGDvpLrqFT7WA/65b02613-02e7-46be-b671-5f1865e6334b/width=450/1877514.jpeg";
const MODEL_FILE_NAME = "crystalClearXL_ccxl_97637.safetensors";
const MODEL_NAME = "Crystal Clear XL";
const MODEL_IMAGE_FILE_NAME = extractBaseName(MODEL_FILE_NAME);
const PROMPT_ITEM_ID = extractBaseName(MODEL_FILE_NAME);
const params = {
  extra: {
    response_image_type: "jpeg",
  },
  request: {
    model_name: MODEL_FILE_NAME,
    prompt: `beautiful cyborg with black exterior wall, ultra 4k, photorealist`,
    negative_prompt: "nsfw, worst_quality, bad hands, bad eyes, sexy outfit",
    width: 512,
    height: 512,
    sampler_name: "DPM++ 2S a Karras",
    guidance_scale: 5,
    steps: 30,
    image_num: 1,
    clip_skip: 1,
    seed: -1,
    hires_fix: {
      target_width: 768,
      target_height: 768,
      strength: 0.6,
    },
  },
};

async function generateAndDownloadImage() {
  const headers = {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  };

  const response = await axios.post(`${API_BASE_URL}/txt2img`, params, {
    headers,
  });

  const taskId = response.data.task_id;
  if (taskId) {
    let taskStatus = "";
    while (
      taskStatus !== "TASK_STATUS_SUCCEED" &&
      taskStatus !== "TASK_STATUS_FAILED"
    ) {
      const progressRes = await axios.get(
        `${API_BASE_URL}/task-result?task_id=${taskId}`,
        { headers },
      );
      const task = progressRes.data.task;
      taskStatus = task.status;

      if (taskStatus === "TASK_STATUS_SUCCEED") {
        console.log("finished!", progressRes.data.images);

        console.log(
          util.inspect(params.request, {
            showHidden: false,
            depth: null,
            colors: true,
          }),
        );

        // JSONファイルに保存
        if (progressRes.data.images) {
          fs.writeFileSync(
            "./scripts/result.json",
            JSON.stringify(progressRes.data.images, null, 2),
          );
        } else {
          console.warn(
            "progressRes.data.images is undefined. Skipping saving to JSON file.",
          );
        }

        // 画像をダウンロードして保存
        if (progressRes.data.images) {
          for (let index = 0; index < progressRes.data.images.length; index++) {
            const image = progressRes.data.images[index];
            const response = await axios({
              method: "get",
              url: image.image_url,
              responseType: "stream",
            });
            const writer = fs.createWriteStream(
              `./scripts/image.${image.image_type}`,
            );
            response.data.pipe(writer);
            await new Promise((resolve) => {
              writer.on("finish", resolve);
            });
            console.log(`Image ${index} downloaded successfully`);
          }
        } else {
          console.warn(
            "progressRes.data.images is undefined. Skipping downloading images.",
          );
        }
      } else if (taskStatus === "TASK_STATUS_FAILED") {
        console.warn("Task failed:", task.reason);
      } else {
        console.log(`Task status: ${taskStatus}`);
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

const storage = new Storage({
  projectId: "eizo-413609",
  credentials: {
    client_email: "eizoai@eizo-413609.iam.gserviceaccount.com",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCYSc3Qti6LPs2T\ntYrlOh4zqveDQGkfL+DxEon/1wKAgHcr32BnHna28R7JysizW8AJLy5mhEmjMM5N\np5qRZTUj5mACrmSmdyOYQKKrg3ixU1If56ATogdbN/0MhYcHU4uOO5nB+eH5q41y\n7P8Q3XQATWPVBrHwY1B+HbFr1BOOemswF38c0Y6/9Hxy+/ebd4H/qy+3iTbqQGiS\nVGgUUR/Ggc+bfSCgsM1C+5XYi6oRutTtzjLh7uy/GNg7NXIVCPxItRWh7Wd4RHbo\nTCiIr197+B+oRcgAjGPR6cvJFpqr69Ylvaew8M0o6CfBtp8FOwp8gyKZGSIsaNuD\n5bqHh2CvAgMBAAECggEAOSMvyoggLHRy02HA7EKDBGW4GhG3n1Dqd+i5yDjWonoQ\nvHBCDk6awgbzw0iHRuw8v/Vo1mP58PWl4fLphnXPm1mbWkYuU1rOCxjtL6bTSMz3\nOitAnz0iv3HhSqpqwC/zY3kvNl1YEMHx/1W2WZCNLnPa6hlp98R7deYUJF3cvI7T\npHwHT8QkeQizWn2bD1Hay5KkI5seNxJkHcK58wOU8UImOOTcurz/siYBESMQP7ae\nwnCwSgotXkiGI1jVKKH+7VErb2pVzMZ2Oq/InJvpdgHwc9NC5hGBfV+Xz7lDm9Pm\nU4VnErG8OQyjUsbHD+KdaBSpERVkb/dR3ZjkjReAiQKBgQDKfSrF/IbdmUv9T9Bh\nUtNPO1Hc5G84VzxaOojxQuHyFgtMbHbuBMqzzf8YZK7Dn7ZYe0xD96V9XzD8pwj0\n+IBiuBSJM5yib7/2j+r73SXUSC+XYt0NJYzGyjx//s9IVUZa0YFbbPhcS4Z1/cpF\nF+fRC9HX/0RPB/bhkuqldhjPNQKBgQDAiHNaGwoxP4IApnSVmO7jA1ehJ9XVnWOz\njlnUUCHwQ9+jqoKVb5TTThfj1Z9QbELyulRYegy5LK8Uz281ZQEKbdeq9fRY+YXV\nfHRBSl1OVugKxwfwstP5c3vPVPRXWw4yEl3wysQILsxfqJpyyDEdR/v1bgwyQUa4\nP25vt9040wKBgCKSDhxxScFJq9yapNQI5QTQ9uAErCxtUGODPOAb8CF5vAIXPpLS\nhJ0AHX5XqjLB8MrYeiPcgweNmfp4tiHEz36LOQ5XnnVpKNf6qD7J+extSprJCT52\nW7uQyZV8tnz9+h4FSNWIHDr9tf4tDzyOoUhigTgkX9AyZucKQz9ukzvFAoGBAKFm\nAaUog7vTLE0VPShnQuMlWyFqvnRLc1gDXkSARGMg0upltwBEwLL+hUJmQx5tExZd\novVkoyPcVI0Sc3yERoISoLfdZU/tJQdZRC+zglJ4wh6+yGY70z0LVV/yLL7KQzUw\ndnWz1O+zI3qRYaAVOC7+uDX/YdQDKqCr9A1NSfMnAoGAFRnqGDHzXhS0wM4nwpYk\nwGQcSMsCc6tvDjYCHxUV4MNAldRGsgxLi9N5W87a6tCEgMUVwxgIMbXKmPP8V0+z\n4rkO/jzcZQQkw88D8lCwezIJDZxvHyag2Q5EIklf2g4HMLMYj7Mnvb6eCizER/Qb\nMmMK5veUncOTCam0HNY0nj0=\n-----END PRIVATE KEY-----\n",
  },
});

async function uploadImageToGCS(
  imagePath: string,
  destination: string,
): Promise<string> {
  try {
    const bucket = storage.bucket("eizoai");
    await bucket.upload(imagePath, {
      gzip: true,
      metadata: {
        contentType: "image/jpeg",
      },
      destination: destination,
    });

    return `https://storage.googleapis.com/eizoai/${destination}`;
  } catch (error) {
    console.error("Error uploading image to GCS:", error);
    return "failed";
  }
}

async function downloadFromNovitaAndUploadToGCS(novitaImageUrl: string) {
  const response = await axios({
    method: "get",
    url: novitaImageUrl,
    responseType: "stream",
  });
  const writer = fs.createWriteStream(
    `./scripts/${MODEL_IMAGE_FILE_NAME}.jpeg`,
  );
  response.data.pipe(writer);
  await new Promise((resolve) => {
    writer.on("finish", resolve);
  });
  return await uploadImageToGCS(
    `./scripts/${MODEL_IMAGE_FILE_NAME}.jpeg`,
    `prompt_options/model/${MODEL_IMAGE_FILE_NAME}.jpeg`,
  );
}

async function main() {
  // await generateAndDownloadImage();
  // return

  // const fullPath = `./scripts/image.jpeg`;
  // const publicUrl = await uploadImageToGCS(fullPath, `prompt_options/${CATEGORY}/${convertText(PROMPT_NAME)}.jpeg`);
  // console.log(`Image uploaded to Google Cloud Storage: ${publicUrl}`);

  const modelImageUrl =
    await downloadFromNovitaAndUploadToGCS(NOVITA_IMAGE_URL);

  // const subPromptItem = {
  //   promptItemId: convertText(PROMPT_NAME),
  //   name: PROMPT_NAME,
  //   imageUrl: publicUrl,
  //   textPrompt: PROMPT_NAME,
  // }

  // console.log("SUB PromptItem:::::::::::::::::::::::::::");
  // console.log(util.inspect(subPromptItem, { showHidden: false, depth: null, colors: true }));

  console.log("MAIN PromptItem:::::::::::::::::::::::::::");
  const mainPromptItem = {
    promptItemId: PROMPT_ITEM_ID,
    name: MODEL_NAME,
    imageUrl: modelImageUrl,
    fields: params.request,
  };
  console.log(
    util.inspect(objectToCamel(mainPromptItem), {
      showHidden: false,
      depth: null,
      colors: true,
    }),
  );

  return;
}

async function generateAndUploadImages(promptName: string) {
  const params = {
    extra: {
      response_image_type: "jpeg",
    },
    request: {
      model_name: MODEL_FILE_NAME,
      prompt: `1girl, beautiful woman, ${promptName}, realistic, professional photography, (smooth hands:1.1), ultra 4k, photorealist`,
      negative_prompt: "nsfw, worst_quality, bad hands, bad eyes, sexy outfit",
      width: 512,
      height: 512,
      sampler_name: "DPM++ 2S a Karras",
      guidance_scale: 5,
      steps: 30,
      image_num: 1,
      clip_skip: 1,
      seed: -1,
      hires_fix: {
        target_width: 768,
        target_height: 768,
        strength: 0.6,
      },
    },
  };

  const headers = {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  };

  const response = await axios.post(`${API_BASE_URL}/txt2img`, params, {
    headers,
  });

  const taskId = response.data.task_id;
  if (taskId) {
    let taskStatus = "";
    while (
      taskStatus !== "TASK_STATUS_SUCCEED" &&
      taskStatus !== "TASK_STATUS_FAILED"
    ) {
      const progressRes = await axios.get(
        `${API_BASE_URL}/task-result?task_id=${taskId}`,
        { headers },
      );
      const task = progressRes.data.task;
      taskStatus = task.status;

      if (taskStatus === "TASK_STATUS_SUCCEED") {
        console.log("Finished generating image for:", promptName);

        // 画像をダウンロードして保存
        if (progressRes.data.images) {
          for (let index = 0; index < progressRes.data.images.length; index++) {
            const image = progressRes.data.images[index];
            const response = await axios({
              method: "get",
              url: image.image_url,
              responseType: "stream",
            });
            const writer = fs.createWriteStream(
              `./scripts/${convertText(promptName)}.${image.image_type}`,
            );
            response.data.pipe(writer);
            await new Promise((resolve) => {
              writer.on("finish", resolve);
            });
            console.log(
              `Image ${index} downloaded successfully for:`,
              promptName,
            );

            const fullPath = `./scripts/${convertText(promptName)}.${image.image_type}`;
            const publicUrl = await uploadImageToGCS(
              fullPath,
              `prompt_options/${CATEGORY}/${convertText(promptName)}.${image.image_type}`,
            );
            console.log(
              `Image uploaded to Google Cloud Storage for ${promptName}: ${publicUrl}`,
            );
          }
        } else {
          console.warn(
            "progressRes.data.images is undefined. Skipping downloading and uploading images for:",
            promptName,
          );
        }
      } else if (taskStatus === "TASK_STATUS_FAILED") {
        console.warn("Task failed for", promptName, ":", task.reason);
      } else {
        console.log(`Task status for ${promptName}: ${taskStatus}`);
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
}

const appropriateWomenClothing: string[] = [
  // "Simple T-shirt and Jeans",
  // "Business Suit",
  // "Evening Gown",
  // "Cocktail Dress",
  // "Wedding Dress",
  // "School Uniform",
  // "Sportswear",
  // "Pajamas",
  // "Coat",
  // "Raincoat",
  // "Hoodie",
  // "Sweatshirt",
  // "Tank Top",
  // "Polo Shirt",
  // "Button-down Shirt",
  // "Blouse",
  // "Skirt",
  // "Shorts",
  // "Cargo Pants",
  // "Leggings",
  // "Dress Shirt",
  // "Necktie",
  // "Bow Tie",
  // "Vest",
  // "Cardigan",
  // "Sweater"
];

// const cameraAngles: string[] = [
//   // "Front view",
//   // "Side view",
//   // "Back view",
//   // "Three-quarter view",
//   // "Bird's eye view",
//   "High angle shot",
//   "Low angle shot",
//   "Dutch angle",
//   "Over-the-shoulder shot",
//   "Profile view",
// ];

const poses: string[] = [
  // "Standing",
  // "Sitting",
  // "Lying down",
  // "Kneeling",
  // "Crouching",
  // "Jumping",
  // "Running",
  // "Walking",
  // "Dancing",
  // "Stretching",
  // "Bending over",
  // "Leaning",
  // "Reaching",
  // "Holding",
  // "Hugging",
  // "Thinking",
  // "Whispering",
  // "Singing",
  // "Playing an instrument",
  // "Typing",
  // "Writing",
  // "Painting",

  "Lying down",
  // "Painting",
  // "Sculpting",
  // "Sewing",
  // "Cooking",
  // "Eating",
  // "Drinking",
  // "Smoking",
  // "Sleeping",
  // "Waking up",
  // "Dressing",
  // "Undressing",
  // "Bathing",
  // "Swimming",
  // "Diving",
  // "Surfing",
  // "Skiing",
  // "Snowboarding",
  // "Skating",
  // "Climbing",
  // "Hiking",
  // "Cycling",
  // "Driving",
  // "Riding a motorcycle",
  // "Riding a horse",
  // "Fishing",
  // "Hunting",
  // "Fighting",
  // "Practicing martial arts",
  // "Meditating",
  // "Praying",
  // "Cheering",
  // "Celebrating",
  // "Protesting",
  // "Surrendering",
  // "Arresting"
];

const personas: string[] = [];
// async function main() {
//   const generatedSubPromptItems = [];
//
//   for (const promptName of poses) {
//     await generateAndUploadImages(promptName);
//
//     const subPromptItem = {
//       promptItemId: convertText(promptName),
//       name: promptName,
//       imageUrl: `https://storage.googleapis.com/eizoai/prompt_options/${CATEGORY}/${convertText(promptName)}.jpeg`,
//       textPrompt: promptName,
//     };
//
//     generatedSubPromptItems.push(subPromptItem);
//   }
//
//   console.log("Generated Sub PromptItems:::::::::::::::::::::::::::");
//   console.log(
//     util.inspect(generatedSubPromptItems, {
//       showHidden: false,
//       depth: null,
//       colors: true,
//     }),
//   );
// }

main().catch((error) => {
  console.error("Error:", error);
});

function convertText(text: string): string {
  // 両端の引用符を削除
  const trimmedText = text.replace(/^"(.*)"$/, "$1");

  // スペースをアンダースコアに置換
  const convertedText = trimmedText.replace(/\s+/g, "_");

  // 小文字に変換
  const lowercaseText = convertedText.toLowerCase();

  return lowercaseText;
}

function extractBaseName(filename: string): string {
  // '.'が最初に出現する位置を見つけ、その手前までの文字列を返す
  const dotIndex = filename.indexOf(".");
  if (dotIndex === -1) {
    // ファイル名に'.'が含まれていない場合は、そのまま返す
    return filename;
  }
  return filename.substring(0, dotIndex);
}
