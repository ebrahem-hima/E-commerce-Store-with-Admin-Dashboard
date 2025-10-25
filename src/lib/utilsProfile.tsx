import { supabase } from "@/supabase-client";
import {
  AddressType,
  updateAddressType,
  updateEmailType,
  updatePasswordType,
  updateProfileType,
} from "../../types/profileFnTypes";
import { toast } from "sonner";
import { MESSAGES } from "./message";
import { addressSchema } from "../../validation";

interface signInType {
  password: string;
  // email: string;
}

export const signIn = async ({ password }: signInType) => {
  const { data } = await supabase.auth.getUser();
  if (data.user?.email === null) {
    toast.error("User email not found");
    return false;
  }
  const email = data.user?.email || "";
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (signInError) {
    toast.error("Invalid email or password");
    return false;
  }
  return true;
};

export const updateEmail = async ({
  isPasswordChanged,
  isEmailChange,
  setChangeInput,
  userEmail,
}: updateEmailType) => {
  const { error: authError } = await supabase.auth.updateUser({
    email: userEmail,
  });
  if (authError) {
    console.error(authError.message);
    console.log("securityemail");
    toast.error(authError.message || "Failed to update Email");
    return false;
  }
  toast.success(
    <div>
      {isPasswordChanged && isEmailChange && (
        <span>
          To update your password, you must first confirm your email. <br />
        </span>
      )}
      Check your email inbox to confirm the change. <br />
      <a
        href="https://mail.google.com"
        target="_blank"
        className="underline text-blue-600"
      >
        Open your email
      </a>
    </div>
  );
  setChangeInput(true);
  return true;
};

export const updatePassword = async ({
  password,
  setPassword,
  setChangeInput,
}: updatePasswordType) => {
  if (
    !password.currentPassword ||
    !password.newPassword ||
    !password.confirmPassword
  ) {
    toast.error("All Password Inputs required");
    return false;
  }
  if (password.confirmPassword === password.currentPassword) {
    toast.info(MESSAGES.password.passwordSame);
    return false;
  }
  const isSign = await signIn({
    password: password.currentPassword,
  });
  if (!isSign) return false;
  const { error: authError } = await supabase.auth.updateUser({
    password: password.confirmPassword,
  });
  if (authError) {
    console.error(authError.message);
    console.log("securityPassword");
    toast.error(authError.message || "Failed to update password");
    return false;
  }
  setPassword({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  setChangeInput(true);
  return true;
};

export const updateProfile = async ({
  profileData,
  userId,
  setChangeInput,
}: updateProfileType) => {
  const { error } = await supabase
    .from("user_profile")
    .update({
      phone: profileData.phone,
      first_name: profileData.firstName,
      last_name: profileData.lastName,
    })
    .eq("id", userId)
    .select();
  if (error) {
    console.error(error);
    console.log("securityProfile");
    toast.error(error.message || "Something went wrong");
    return false;
  }
  setChangeInput(true);
  return true;
};

export const updateAddress = async ({
  e,
  profileData,
  originalAddress,
  userId,
  setIsProfileChange,
  setChangeInput,
}: updateAddressType) => {
  e.preventDefault();
  const checkField = ["address1", "address2", "country", "state"];
  const hasChanges = checkField.some(
    (key) =>
      profileData[key as keyof AddressType] !==
      originalAddress.current?.[key as keyof AddressType]
  );
  if (!hasChanges) {
    toast.info(MESSAGES.account.noChanges);
    return;
  }
  try {
    const result = addressSchema.safeParse({
      address1: profileData.address1,
      address2: profileData.address2,
    });
    if (!result.success) {
      console.log(result.error.issues);
      toast.error(result.error.issues[0].message);
      return false;
    }
  } catch (error) {
    console.log(error);
  }

  const { error } = await supabase
    .from("user_profile")
    .update({
      address1: profileData.address1,
      address2: profileData.address2,
      country: profileData.country,
      state: profileData.state,
    })
    .eq("id", userId);
  if (error) {
    console.log("error", error);
    toast.error(error.message);
    return;
  }
  setIsProfileChange((prev) => ({
    ...prev,
    address: !prev.address,
  }));
  toast.success(MESSAGES.account.update);
  setChangeInput(true);
};
