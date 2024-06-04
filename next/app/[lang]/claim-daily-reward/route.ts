import getHourDifference from "@/util/getHourDifference";
import { createResponse, handleError } from "@/util/network";
import initializeSupabaseClient from "@/util/supabaseClient";
import { supabaseServerClient as supabaseServer } from "@/util/supabaseServerClient";

export const dynamic = "force-dynamic";
const dailyreward = 200;

export async function GET(request: Request) {
  try {
    const supabaseClient = initializeSupabaseClient(request);

    const data = await supabaseClient.auth.getUser();
    const userId = data?.data?.user?.id;

    if (!userId) {
      throw new Error("Authentication required!");
    }

    const { error, data: dataOutput } = await supabaseServer
      .from("daily_rewards")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    const lastClaimedDate = dataOutput?.last_claimed_at;

    // If the last_claimed is more than 24 hours then return success
    if (getHourDifference(lastClaimedDate!) >= 24) {
      const credit = await checkCredit(userId);

      const updatedCredit = credit + dailyreward;

      await updateCredit(userId, updatedCredit);
      await updateTransaction(userId, dailyreward);
      await updateLastClaimed(userId);

      return createResponse({
        ok: true,
        message: "Reward claimed successfully",
      });
    } else {
      return createResponse({
        ok: false,
        message: "You have already claimed your reward",
      });
    }
  } catch (error) {
    return handleError(error, "[ERROR] /claim-daily-reward");
  }
}

const checkCredit = async (userId: string): Promise<number> => {
  let credit = 0;
  const { error: creditserr, data: creditInitData } = await supabaseServer
    .from("credits")
    .select("*")
    .eq("user_id", userId)
    .single();

  // If the user does not have any credits then insert a new row with 0 credits
  if (creditserr) {
    const { error: creditserr, data: creditInitData } = await supabaseServer
      .from("credits")
      .insert({
        user_id: userId!,
        credits: 0,
      })
      .select("*");

    if (creditserr) {
      console.error(creditserr);
      throw new Error("Something went wrong while inserting credits!");
    }

    credit = 0;
  } else {
    credit = creditInitData?.credits;
  }

  return credit;
};

const updateCredit = async (userId: string, credit: number) => {
  const { error } = await supabaseServer
    .from("credits")
    .update({
      credits: credit,
    })
    .eq("user_id", userId)
    .select("*");

  if (error) {
    console.error(error);
    throw new Error("Something went wrong while updating credits!");
  }
};

const updateTransaction = async (userId: string, credit: number) => {
  const { error: transactionErr } = await supabaseServer
    .from("transactions")
    .insert({
      user_id: userId!,
      credits_transaction: credit,
    });

  if (transactionErr) {
    console.error(transactionErr);
    throw new Error("Something went wrong while updating credits!");
  }
};

const updateLastClaimed = async (userId: string) => {
  const { error } = await supabaseServer
    .from("daily_rewards")
    .update({
      last_claimed_at: new Date().toISOString(),
    })
    .eq("user_id", userId)
    .select("*")
    .single();
  if (error) {
    console.error(error);
    throw new Error("Something went wrong while updating last_claimed_at!");
  }
};
