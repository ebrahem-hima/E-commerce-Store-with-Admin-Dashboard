import { createClient } from "@/utils/supabase/client";

export const markMessageAsSeen = async (id: number) => {
  const supabase = createClient();
  const { error } = await supabase
    .from("inbox")
    .update({ status: "Seen" })
    .eq("id", id)
    .maybeSingle();
  if (error) {
    console.log("error", error);
  }
};

export const markMessageAsReplied = async (id: number) => {
  const supabase = createClient();

  const { error } = await supabase
    .from("inbox")
    .update({ status: "Reply" })
    .eq("id", id);

  if (error) {
    console.error("Error marking message as Reply:", error);
    throw error;
  }
};
