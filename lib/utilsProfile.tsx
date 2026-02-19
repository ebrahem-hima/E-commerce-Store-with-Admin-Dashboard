import {
  AddressType,
  updateAddressType,
  updateEmailType,
  updatePasswordType,
  updateProfileType,
} from "@/types/profileFnTypes";
import { toast } from "sonner";
import { MESSAGES } from "./message";
import { addressSchema } from "@/validation/validation";
import { createClient } from "@/app/utils/supabase/client";

interface signInType {
  password: string;
}
const supabase = createClient();

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
  setProfileData,
}: updateEmailType) => {
  const { error: authError } = await supabase.auth.updateUser({
    email: userEmail,
  });
  if (authError) {
    console.error(authError.message);
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
    </div>,
  );
  setProfileData((prev) => ({
    ...prev,
    email: userEmail,
  }));
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
  setProfileData,
}: updateProfileType) => {
  const { data, error } = await supabase
    .from("user_profile")
    .update({
      phone: profileData.phone,
      first_name: profileData.firstName,
      last_name: profileData.lastName,
    })
    .eq("id", userId)
    .select()
    .maybeSingle();
  if (error) {
    console.error(error);
    console.log("securityProfile");
    toast.error(error.message || "Something went wrong");
    return false;
  }
  console.log("data", data);
  setProfileData((prev) => ({
    ...prev,
    firstName: data.first_name,
    lastName: data.last_name,
    phone: data.phone,
  }));
  setChangeInput(true);
  return true;
};

export const updateAddress = async ({
  e,
  oldAddress,
  newAddress,
  userId,
  setProfileData,
  setChangeInput,
}: updateAddressType) => {
  e.preventDefault();
  const checkField = ["address1", "address2", "country", "state"];
  const hasChanges = checkField.some(
    (key) =>
      oldAddress[key as keyof AddressType] !==
      newAddress[key as keyof AddressType],
  );
  if (!hasChanges) {
    toast.info(MESSAGES.account.noChanges);
    return;
  }
  try {
    const result = addressSchema.safeParse({
      address1: newAddress.address1,
      address2: newAddress.address2,
    });
    if (!result.success) {
      console.log(result.error.issues);
      toast.error(result.error.issues[0].message);
      return false;
    }
  } catch (error) {
    console.log(error);
  }

  const { data, error } = await supabase
    .from("user_profile")
    .update({
      address1: newAddress.address1,
      address2: newAddress.address2,
      country: newAddress.country,
      state: newAddress.state,
    })
    .eq("id", userId)
    .select()
    .maybeSingle();

  setProfileData((prev) => ({
    ...prev,
    address1: data.address1,
    address2: data.address2,
    country: data.country,
    state: data.state,
  }));
  //
  if (error) {
    console.log("error", error);
    toast.error(error.message);
    return;
  }
  toast.success(MESSAGES.account.update);
  setChangeInput(true);
};
