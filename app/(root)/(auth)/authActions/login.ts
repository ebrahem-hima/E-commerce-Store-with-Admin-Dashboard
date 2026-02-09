"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/app/utils/supabase/server";
import { logInSchema } from "@/validation/validation";

type FormState = {
  success: boolean;
  message: string;
  inputs: {
    email: string;
    password?: string;
  };
};

export async function login(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validation = logInSchema.safeParse(data);
  if (!validation.success) {
    return {
      success: false,
      message: validation.error.issues[0].message,
      inputs: data,
    };
  }

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log(error);
    return { success: false, message: error.message, inputs: data };
  }

  revalidatePath("/", "layout");
  return { success: true, message: "Login Successfully", inputs: data };
}
