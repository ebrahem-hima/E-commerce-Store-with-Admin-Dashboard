import { createClient } from "@/app/utils/supabase/client";
import { profileType } from "@/types/profileFnTypes";

interface Props {
  userId: string;
}

export const GetProfileData = async ({
  userId,
}: Props): Promise<{
  profileData: profileType | null;
}> => {
  try {
    const supabase = createClient();

    const { data: accountData, error: accountError } = await supabase
      .from("user_profile")
      .select()
      .eq("id", userId)
      .maybeSingle();

    if (accountError) throw accountError;

    const account = accountData || {};

    const { data: authData, error: authError } =
      await supabase.auth.admin.getUserById(userId);
    if (authError) throw authError;

    const email = authData?.user?.email || "";

    const profileData: profileType = {
      id: account.id || "",
      firstName: account.first_name || "",
      lastName: account.last_name || "",
      phone: account.phone || "",
      address1: account.address1 || "",
      address2: account.address2 || "",
      state: account.state || "",
      country: account.country || "",
      email,
    };

    return { profileData };
  } catch (err) {
    console.error("Error fetching profile:", err);
    return { profileData: null };
  }
};

export default GetProfileData;
