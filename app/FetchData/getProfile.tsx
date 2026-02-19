import { useEffect, useState } from "react";
import { profileType } from "../../types/profileFnTypes";
import { createClient } from "@/app/utils/supabase/client";

interface Props {
  isAuth: boolean;
  userId: string;
}

const GetProfile = ({ userId, isAuth }: Props) => {
  const [profileData, setProfileData] = useState<profileType>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    country: "",
    state: "",
  });
  const [profileLoading, setProfileLoading] = useState(true);
  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) {
        setProfileLoading(false);
        return;
      }
      const supabase = createClient();

      try {
        setProfileLoading(true);
        const { data: accountData, error: accountError } = await supabase
          .from("user_profile")
          .select()
          .eq("id", userId)
          .maybeSingle();
        if (accountError) throw accountError;

        const profile = {
          id: accountData.id || "",
          firstName: accountData.first_name || "",
          lastName: accountData.last_name || "",
          phone: accountData.phone || "",
          address1: accountData.address1 || "",
          address2: accountData.address2 || "",
          state: accountData.state || "",
          country: accountData.country || "",
          email: accountData.email || "",
        };

        setProfileData(profile);
      } catch (err) {
        console.log(err);
        return;
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfile();
  }, [userId, isAuth]);

  return { profileData, setProfileData, profileLoading };
};

export default GetProfile;
