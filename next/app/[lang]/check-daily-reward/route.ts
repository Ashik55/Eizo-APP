import getHourDifference from "@/util/getHourDifference";
import { createResponse, handleError } from "@/util/network";
import initializeSupabaseClient from "@/util/supabaseClient";
import { supabaseServerClient as supabaseServer } from "@/util/supabaseServerClient";

export const dynamic = "force-dynamic";

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

    let lastClaimedDate = null;

    // If dataOutput is null then insert a past date to initialize the last_claimed
    if (!dataOutput) {
      const { data: dailyRewardData } = await supabaseServer
        .from("daily_rewards")
        .insert({
          user_id: userId!,
          last_claimed: "2023-03-11T05:42:26.997Z",
        })
        .select("*")
        .single();
      lastClaimedDate = dailyRewardData?.last_claimed_at;
    }

    lastClaimedDate = dataOutput?.last_claimed_at;

    // If the last_claimed is more than 24 hours then return success
    if (getHourDifference(lastClaimedDate!) >= 24) {
      return createResponse({
        ok: true,
        message: "You can claim your reward now",
      });
    } else {
      return createResponse({
        ok: false,
        message: "You have already claimed your reward",
      });
    }
  } catch (error) {
    return handleError(error, "[ERROR] /check-daily-reward");
  }
}
