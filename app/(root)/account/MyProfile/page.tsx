"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MESSAGES } from "@/lib/message";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateEmail, updatePassword, updateProfile } from "@/lib/utilsProfile";
import { useProductContext } from "@/context/productContext";
import { myProfileType } from "@/types/profileFnTypes";
import { profileSchema } from "@/validation/validation";
import { createClient } from "@/app/utils/supabase/client";

const Page = () => {
  const { userId, profileData, setProfileData, isProfileChange } =
    useProductContext();
  const originalProfile = useRef<myProfileType | null>(null);
  const [changeInput, setChangeInput] = useState(true);
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { push } = useRouter();
  const isEmailChange = originalProfile.current?.email !== profileData.email;
  const isPasswordChanged =
    password.currentPassword ||
    password.newPassword ||
    password.confirmPassword;

  // store data in originalProfile to check data change
  useEffect(() => {
    const fetchUserProfile = async () => {
      const supabase = createClient();
      const { data: profileDataDb, error: profileError } = await supabase
        .from("user_profile")
        .select()
        .eq("id", userId);
      if (profileError) {
        console.log("Profile error:", profileError);
        return false;
      }

      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      if (userError) {
        console.log("Auth error:", userError);
        return false;
      }

      const dataAccount = profileDataDb?.[0];
      const emailUser = userData?.user?.email || "";

      if (!dataAccount && !emailUser) return false;

      const mergedProfile = {
        firstName: dataAccount?.first_name || "",
        lastName: dataAccount?.last_name || "",
        phone: dataAccount?.phone || "",
        email: emailUser,
      };

      originalProfile.current = mergedProfile;
    };

    fetchUserProfile();
  }, [isProfileChange, userId]);

  if (!userId) return;
  const updateAccount = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const checkField = ["firstName", "lastName", "phone", "email"];
    const hasChanges = checkField.some(
      (field) =>
        profileData[field as keyof myProfileType] !==
        originalProfile.current?.[field as keyof myProfileType],
    );
    try {
      const result = profileSchema.safeParse({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
        phone: profileData.phone,
      });
      if (!result.success) {
        console.log(result.error.issues);
        toast.error(result.error.issues[0].message);
        return false;
      }
    } catch (error) {
      console.log(error);
    }

    if (!hasChanges && !isPasswordChanged && !isEmailChange) {
      toast.info(MESSAGES.account.noChanges);
      return false;
    }
    if (isPasswordChanged) {
      const success = await updatePassword({
        password,
        setPassword,
        setChangeInput,
      });
      if (!success) return false;
    }
    // Handle Update Email, Password
    if (isEmailChange) {
      const success = await updateEmail({
        isPasswordChanged,
        isEmailChange,
        setChangeInput,
        userEmail: profileData.email,
      });
      if (!success) return false;
    }

    if (hasChanges) {
      await updateProfile({ profileData, userId, setChangeInput });
    }
    if (hasChanges || isPasswordChanged) {
      toast.success(MESSAGES.account.update);
      return false;
    }
  };

  if (!profileData) return false;

  return (
    <div className="flex flex-col gap-4">
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Name */}
        <div className="flex flex-col">
          <Label htmlFor="firstName" className="mb-1 text-sm font-medium">
            First Name
          </Label>
          <Input
            id="firstName"
            type="text"
            name="firstName"
            value={profileData.firstName}
            onChange={(e) => {
              setProfileData({
                ...profileData,
                [e.target.name]: e.target.value,
              });
              setChangeInput(false);
            }}
            placeholder="First Name"
            className="border px-3 py-2 rounded "
          />
          {/* <span>First name must be at least 3 characters</span> */}
        </div>

        {/* Last Name */}
        <div className="flex flex-col">
          <Label htmlFor="lastName" className="mb-1 text-sm font-medium">
            Last Name
          </Label>
          <Input
            id="lastName"
            type="text"
            name="lastName"
            value={profileData.lastName}
            onChange={(e) => {
              setProfileData({
                ...profileData,
                [e.target.name]: e.target.value,
              });
              setChangeInput(false);
            }}
            placeholder="Last Name"
            className="border px-3 py-2 rounded"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <Label htmlFor="email" className="mb-1 text-sm font-medium">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={profileData.email}
            onChange={(e) => {
              setProfileData({
                ...profileData,
                [e.target.name]: e.target.value,
              });
              setChangeInput(false);
            }}
            placeholder="Email"
            className="border px-3 py-2 rounded"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <Label htmlFor="phone" className="mb-1 text-sm font-medium">
            Phone
          </Label>
          <Input
            id="phone"
            type="number"
            name="phone"
            value={profileData.phone}
            onChange={(e) => {
              setProfileData({
                ...profileData,
                [e.target.name]: e.target.value,
              });
              setChangeInput(false);
            }}
            placeholder="Phone"
            className="border px-3 py-2 rounded"
          />
        </div>
      </form>
      {/* Password */}
      <form action="" className="grid mt-6 gap-4">
        {/* Password Changes */}
        <div className="flex flex-col">
          <Label htmlFor="currentPassword" className="mb-1 text-sm font-medium">
            Password Changes (leave blank to leave unchanged)
          </Label>
          <Input
            id="currentPassword"
            type="password"
            name="currentPassword"
            value={password.currentPassword}
            onChange={(e) => {
              setPassword({
                ...password,
                [e.target.name]: e.target.value,
              });
              setChangeInput(false);
            }}
            placeholder="Current Password"
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex md:items-center flex-col md:flex-row gap-4">
          {/* New Password */}
          <Input
            id="newPassword"
            type="password"
            name="newPassword"
            value={password.newPassword}
            onChange={(e) => {
              setPassword({
                ...password,
                [e.target.name]: e.target.value,
              });
              setChangeInput(false);
            }}
            placeholder="New Password"
            className="border px-3 py-2 rounded"
          />

          {/* Confirm Password */}
          <Input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={password.confirmPassword}
            onChange={(e) => {
              setPassword({
                ...password,
                [e.target.name]: e.target.value,
              });
              setChangeInput(false);
            }}
            placeholder="Confirm Password"
            className="border px-3 py-2 rounded"
          />
        </div>
      </form>
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
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default Page;
