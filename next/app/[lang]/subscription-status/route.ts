// External imports
import moment from "moment-timezone";

// Internal imports
import { supabaseServerClient as supabaseServer } from "@/util/supabaseServerClient";
import {
  SubscriptionStatus,
  AdaptyDataSchema,
} from "../../../../shared/schemas";
import calculateDifferenceInMonths from "@/util/calculateDifferenceInMonths";
import convertTimezone from "@/util/convertTimezone";
import { createResponse, handleError } from "@/util/network";
import { objectToCamel } from "ts-case-convert";

const monthlyCredit = 10000;

export const GET = async (request: Request): Promise<Response> => {
  console.log("GET /subscription-status");

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      throw new Error("Param userId is required");
    }

    const response = await fetchSubscriptionStatus(userId);

    if (!response.ok) {
      throw new Error("Payment service is down");
    }

    const subscriptionData = await response.json();
    const camelCasedData = objectToCamel(
      subscriptionData as object,
    ) as SubscriptionStatus;

    if ("errors" in camelCasedData) {
      throw new Error("Invalid request method");
    }

    if (!isPremiumSubscriptionActive(camelCasedData)) {
      throw new Error("Subscription is not active");
    }

    await addSubscriptionMonthlyCredit(camelCasedData, userId);

    const validatedData = AdaptyDataSchema.parse(camelCasedData);
    return createResponse<SubscriptionStatus>({
      ok: true,
      data: validatedData,
    });
  } catch (error) {
    return handleError(error, "[ERROR] /subscription-status");
  }
};
async function fetchSubscriptionStatus(userId: string): Promise<Response> {
  return fetch(`https://api.adapty.io/api/v1/sdk/profiles/${userId}/`, {
    method: "GET",
    headers: {
      Authorization: `Api-Key ${process.env.ADAPTY_API_KEY}`,
    },
  });
}

function isPremiumSubscriptionActive(
  subscriptionData: SubscriptionStatus,
): boolean {
  return subscriptionData?.data?.paidAccessLevels?.premium?.isActive ?? false;
}

const addSubscriptionMonthlyCredit = async (
  data: SubscriptionStatus,
  userId: string,
) => {
  const renewedAt = moment(data?.data?.paidAccessLevels?.premium?.renewedAt);
  const expiresAt = moment(data?.data?.paidAccessLevels?.premium?.expiresAt);

  const { diffMonthsToGetTillNow, pendingMonthsToGetInTotal } =
    calculateDifferenceInMonths(renewedAt, expiresAt);
  const shouldGetAmountTillNow = diffMonthsToGetTillNow * monthlyCredit;
  const shouldGetAmountInTotal = pendingMonthsToGetInTotal * monthlyCredit;

  const { totalAmountReceived, transactionErr } =
    await fetchTotalAmountReceived(userId, data);
  if (transactionErr) {
    console.error(transactionErr);
    throw new Error("Error fetching transaction data");
  }

  const pendingAmount = shouldGetAmountTillNow - totalAmountReceived;

  console.log(
    "pendingAmount",
    pendingAmount,
    "totalAmountReceived",
    totalAmountReceived,
    {
      diffMonthsToGetTillNow,
      pendingMonthsToGetInTotal,
    },
  );

  if (pendingAmount > 0) {
    await insertTransaction(userId, pendingAmount);
    await updateCredits(userId, pendingAmount);
  }
};

const fetchTotalAmountReceived = async (
  userId: string,
  data: SubscriptionStatus,
) => {
  const { error: transactionErr, data: transactionData } = await supabaseServer
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .lt(
      "created_at",
      convertTimezone(data?.data?.paidAccessLevels?.premium?.expiresAt),
    )
    .gt(
      "created_at",
      convertTimezone(data?.data?.paidAccessLevels?.premium?.renewedAt),
    )
    .gte("credits_transaction", monthlyCredit);

  const totalAmountReceived =
    transactionData?.reduce((acc, val) => acc + val.credits_transaction!, 0) ||
    0;
  return { totalAmountReceived, transactionErr };
};

const insertTransaction = async (userId: string, amount: number) => {
  const { error: transactionErrInsert } = await supabaseServer
    .from("transactions")
    .insert({
      user_id: userId,
      credits_transaction: amount,
    });

  console.error(transactionErrInsert);
};

const updateCredits = async (userId: string, amount: number) => {
  const { error: creditserr, data: creditInitData } = await supabaseServer
    .from("credits")
    .select("*")
    .eq("user_id", userId)
    .single();

  let credit = 0;
  if (creditserr) {
    const { error: creditserr } = await supabaseServer
      .from("credits")
      .insert({
        user_id: userId!,
        credits: 0,
      })
      .select("*");
    console.error(creditserr);
  } else {
    credit = creditInitData?.credits || 0;
  }

  const { error: creditErr } = await supabaseServer
    .from("credits")
    .update({
      credits: credit + amount,
    })
    .eq("user_id", userId!)
    .select("*");
  console.error(creditErr);
};
