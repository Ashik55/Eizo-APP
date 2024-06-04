import { supabaseServerClient } from "@/util/supabaseServerClient";
import { handleError, createResponse } from "@/util/network";
import { ResponseData } from "../../shared/schemas";

export async function checkUserCredits(userId: string): Promise<Response> {
  try {
    const { data, error } = await supabaseServerClient
      .from("credits")
      .select("credits")
      .eq("user_id", userId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    if (!data?.credits) {
      const initializedCreditResponse = await initializeUserCredit(userId);
      const initializedCreditData = await initializedCreditResponse.json();

      return createResponse<{ credits: number }>({
        ok: true,
        data: initializedCreditData.data,
      });
    }

    return createResponse<{ credits: number }>({
      ok: true,
      data: { credits: data.credits },
    });
  } catch (error) {
    return handleError(error, "[ERROR] /checkUserCredits");
  }
}

export const FIRST_CREDIT = 200;

export async function initializeUserCredit(userId: string): Promise<Response> {
  try {
    const { error } = await supabaseServerClient.from("credits").insert({
      user_id: userId,
      credits: FIRST_CREDIT,
    });

    if (error) {
      throw new Error("Something went wrong while creating your credits!");
    }

    return createResponse<{ credits: number }>({
      ok: true,
      data: { credits: FIRST_CREDIT },
    });
  } catch (error) {
    return handleError(error, "[ERROR] /initializeUserCredit");
  }
}

export async function subtractUserCredits(
  userId: string,
  currentCredit: number,
  creditsToSubtract: number,
): Promise<Response> {
  try {
    const subtractedCredits = currentCredit - creditsToSubtract;
    if (currentCredit < creditsToSubtract) {
      throw new Error(
        "You do not have enough credits to perform this action. Please purchase more.",
      );
    }

    const { error } = await supabaseServerClient
      .from("credits")
      .update({ credits: subtractedCredits })
      .eq("user_id", userId);

    if (error) {
      throw new Error("Failed to update user credits");
    }

    const { error: transactionError } = await supabaseServerClient
      .from("transactions")
      .insert({
        user_id: userId,
        credits_transaction: -creditsToSubtract,
      });

    if (transactionError) {
      throw new Error("Error creating transaction");
    }

    return createResponse<{ credits: number }>({
      ok: true,
      data: { credits: subtractedCredits },
    });
  } catch (error) {
    return handleError(error, "[ERROR] /subtractUserCredits");
  }
}
