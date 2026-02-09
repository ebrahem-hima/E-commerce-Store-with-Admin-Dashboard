"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/app/utils/supabase/server";
import { signupSchema } from "@/validation/validation";

type FormState = {
  success: boolean;
  message: string;
  inputs?: {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
  };
};

export async function signup(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const dataAccount = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
  };

  const validation = signupSchema.safeParse(dataAccount);
  if (!validation.success) {
    return {
      success: false,
      message: validation.error.issues[0].message,
      inputs: dataAccount,
    };
  }

  const supabase = await createClient();

  const { data: signUpData, error: authError } = await supabase.auth.signUp({
    email: dataAccount.email,
    password: dataAccount.password,
  });

  if (authError) {
    const errorMsg = authError.message.includes("already registered")
      ? "This email is already registered."
      : "An unexpected error occurred.";

    return {
      success: false,
      message: errorMsg,
      inputs: dataAccount,
    };
  }

  if (signUpData.user) {
    const { error } = await supabase.from("user_profile").insert({
      id: signUpData.user.id,
      first_name: dataAccount.firstName,
      last_name: dataAccount.lastName,
      email: dataAccount.email,
      role: "user",
    });

    if (error) {
      return {
        success: false,
        message: "Account created but profile failed.",
        inputs: dataAccount,
      };
    }
  }

  revalidatePath("/", "layout");

  return {
    success: true,
    message: "Account created successfully! Redirecting...",
  };
}
