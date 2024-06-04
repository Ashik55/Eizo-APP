import { ResponseData, ResponseDataSchema } from "../../shared/schemas";
import { z } from "zod";
import axios from "axios";

export function createResponse<T>(responseData: ResponseData<T>): Response {
  const parsedResponseData = ResponseDataSchema.parse(responseData);
  const { ok, data, message, error, headers } = parsedResponseData;

  const status = ok ? 200 : 400;
  const body = ok ? { ok, data, message } : { ok, error, message };

  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
  });
}

export function createErrorResponse(error: string, message: string): Response {
  return createResponse({
    ok: false,
    error,
    message,
  });
}

export function handleError(error: unknown, errorPrefix: string): Response {
  if (error instanceof z.ZodError) {
    const errorMessage = `Few issues found while validating data: ${error.issues.map((e) => e.message).join(", ")}`;
    console.error(`${errorPrefix}: Validation failed:`, error.issues);
    return createErrorResponse(errorPrefix, errorMessage);
  } else if (error instanceof Error) {
    const errorMessage = error.message;
    console.error(`${errorPrefix}:`, error);
    return createErrorResponse(errorPrefix, errorMessage);
  } else if (axios.isAxiosError(error)) {
    console.error("Request failed:", error.message);
    console.error("Response data:", error.response?.data);
  } else {
    const errorMessage = "An unexpected error occurred";
    console.error(`${errorPrefix}: Unexpected error:`, error);
    return createErrorResponse(errorPrefix, errorMessage);
  }
}
