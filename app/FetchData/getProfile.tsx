import { useEffect, useState } from "react";
import { profileType } from "../../types/profileFnTypes";
import { createClient } from "@/app/utils/supabase/client";

interface Props {
  isProfileChange: {
    address: boolean;
    profile: boolean;
  };
  isAuth: boolean;
}

const GetProfile = ({ isProfileChange, isAuth }: Props) => {
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
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  useEffect(() => {
    const fetchProfile = async () => {
      const supabase = createClient();

      try {
        const { data: userData, error: userError } =
          await supabase.auth.getUser();
        if (userError) throw userError;

        const { data: accountData, error: accountError } = await supabase
          .from("user_profile")
          .select()
          .eq("id", userData.user.id);
        if (accountError) throw accountError;

        const account = accountData?.[0] || {};

        // const { data: userData, error: userError } =
        //   await supabase.auth.getUser();
        // if (userError) throw userError;

        const email = userData?.user?.email || "";

        const profile = {
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

        setProfileData(profile);

        localStorage.setItem("user_profile", JSON.stringify(profile));
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, [isProfileChange.address, isProfileChange.profile, isAuth]);

  return { profileData, setProfileData };
};

export default GetProfile;
