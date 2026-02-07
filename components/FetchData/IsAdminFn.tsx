import { createClient } from "@/app/utils/supabase/server";

export const IsAdmin = async (): Promise<boolean> => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return false;
  }

  const { data, error } = await supabase
    .from("user_profile")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (error || !data) {
    console.error("Error checking admin role:", error);
    return false;
  }

  return data.role === "admin";
};
