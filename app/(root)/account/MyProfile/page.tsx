"use client";

import { Button } from "@/components/ui/button";
import { MESSAGES } from "@/lib/message";
import { MouseEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateEmail, updatePassword, updateProfile } from "@/lib/utilsProfile";
import { useProductContext } from "@/context/productContext";
import { myProfileType } from "@/types/profileFnTypes";
import { profileSchema } from "@/validation/validation";
import LoadingSpinner from "@/components/Loaders/LoadingSpinner";
import PasswordForm from "./components/PasswordForm";
import ProfileForm from "./components/ProfileForm";
import { Loader2 } from "lucide-react";

const Page = () => {
  const { userId, profileData, setProfileData, profileLoading } =
    useProductContext();

  const [myProfileData, setMyProfileData] =
    useState<myProfileType>(profileData);

  useEffect(() => {
    setMyProfileData(profileData);
  }, [profileData]);

  const [changeInput, setChangeInput] = useState(true);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { push } = useRouter();
  const isPasswordChanged =
    password.currentPassword ||
    password.newPassword ||
    password.confirmPassword;

  useEffect(() => {
    if (!profileLoading && !userId) {
      push(`/log-in`);
    }
  }, [userId, profileLoading, push]);

  if (profileLoading) return <LoadingSpinner />;

  const updateAccount = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    const isEmailChange = myProfileData.email !== profileData.email;
    const checkField = ["firstName", "lastName", "phone", "email"];
    const hasChanges = checkField.some(
      (field) =>
        profileData[field as keyof myProfileType] !==
        myProfileData[field as keyof myProfileType],
    );
    try {
      const result = profileSchema.safeParse({
        firstName: myProfileData.firstName,
        lastName: myProfileData.lastName,
        email: myProfileData.email,
        phone: myProfileData.phone,
      });
      if (!result.success) {
        console.log(result.error.issues);
        toast.error(result.error.issues[0].message);
        setLoading(false);
        return false;
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    if (!hasChanges && !isPasswordChanged && !isEmailChange) {
      toast.info(MESSAGES.account.noChanges);
      setLoading(false);
      return false;
    }
    // to make button to disabled
    setChangeInput(true);
    // Update Password
    if (isPasswordChanged) {
      const success = await updatePassword({
        password,
        setPassword,
        setChangeInput,
      });
      if (!success) {
        setLoading(false);
        return false;
      }
    }
    // Update Email
    if (isEmailChange) {
      const success = await updateEmail({
        isPasswordChanged,
        isEmailChange,
        setChangeInput,
        userEmail: myProfileData.email || "",
        setProfileData,
      });
      if (!success) {
        setLoading(false);
        return false;
      }
    }

    if (hasChanges) {
      await updateProfile({
        profileData: myProfileData,
        userId: userId || "",
        setChangeInput,
        setProfileData,
      });
    }
    if (hasChanges || isPasswordChanged) {
      toast.success(MESSAGES.account.update);
      setLoading(false);
      return false;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <ProfileForm
        profile={myProfileData}
        setProfile={setMyProfileData}
        setChangeInput={setChangeInput}
      />
      <PasswordForm
        password={password}
        setPassword={setPassword}
        setChangeInput={setChangeInput}
      />
      <div className="flex gap-2 justify-end">
        <Button
          onClick={(e) => {
            e.preventDefault();
            push(`/`);
          }}
          className="hover:bg-[#bdbbbb93] w-fit px-6 py-3 rounded-sm text-black bg-white"
        >
          Cancel
        </Button>
        <Button
          disabled={changeInput}
          onClick={updateAccount}
          className="w-fit px-6 py-3 rounded-sm"
        >
          {loading ? <Loader2 className="w-7 h-7 animate-spin" /> : ""}
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default Page;
