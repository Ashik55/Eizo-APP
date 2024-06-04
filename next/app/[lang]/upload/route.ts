import { cloudStorage } from "@/util/googleCloudStorage";
import { createResponse, handleError } from "@/util/network";
import formidable from "formidable";
import fs from "fs";
import { promisify } from "util";
import { v4 } from "uuid";

const readFileAsync = promisify(fs.readFile);

export async function POST(request: Request): Promise<Response> {
  // handle form data
  try {
    //  upload file to google cloud storage
  } catch (error) {
    return handleError(error, "[ERROR] /upload-file");
  }
}
