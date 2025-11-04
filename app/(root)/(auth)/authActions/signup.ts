"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const dataAccount = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
  };
  const { data: signUpData, error: authError } = await supabase.auth.signUp({
    email: dataAccount.email,
    password: dataAccount.password,
  });
  if (authError) {
    console.log(authError);
    redirect("/error");
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
      console.log(error);
      return;
    }
  }
  if (authError) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
