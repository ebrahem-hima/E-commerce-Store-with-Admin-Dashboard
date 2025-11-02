"use client";

import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";
import { supabase } from "@/supabase-client";
import { login } from "../authActions/login";
import { useRouter } from "next/navigation";
import { useProductContext } from "@/context/productContext";
import { MESSAGES } from "@/lib/message";

interface userDataType {
  email: string;
  password: string;
}

const Page = () => {
  const [isPending, startTransition] = useTransition();
  const [userData, setUserData] = useState<userDataType>({
    email: "",
    password: "",
  });
  const { setIsAuth } = useProductContext();
  const { push } = useRouter();

  const handleLogin = async (formData: FormData) => {
    startTransition(async () => {
      const result = await login(formData);
      if (result?.success) {
        toast.success("Successfully Logged In");
        setIsAuth(true);
        // setIsAuth((prev) => !prev);
        push("/");
      } else if (result?.error) {
        toast.error(result.error);
      } else {
        toast.error("Unknown error occurred");
      }
    });
  };

  const resetPassword = async () => {
    if (!userData.email) {
      toast.error(MESSAGES.password.resetEnterEmail);
      return;
    }
    toast.success(MESSAGES.password.resetCheckEmail);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        userData.email,
        {
          redirectTo: "http://localhost:3000/reset-password",
        }
      );
      if (error) throw error;
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <form action={handleLogin}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <div>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription className="text-[13px] mt-1">
              Enter your email below to login to your account
            </CardDescription>
          </div>
          <Link href={`/sign-up`} className="mx-auto">
            <Button variant="link">Sign Up</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Email or Phone Number"
              className="border-b border-transparent placeholder:text-[#a5a5a5] border-b-[#d4d4d4] rounded-[0px]"
              required
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <div>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                className="border-b border-transparent placeholder:text-[#a5a5a5] border-b-[#d4d4d4] rounded-[0px]"
                required
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
              <p
                onClick={resetPassword}
                className="flex justify-end cursor-pointer mt-1 text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            disabled={isPending}
            type="submit"
            className="w-full relative grid grid-cols-[auto_auto] items-center"
          >
            Login
            <span className="w-10 h-6 absolute top-1.5 left-[30%]">
              {isPending && (
                <span className="block w-6 h-6 rounded-full border-4 border-white border-t-[#DB4444] animate-spin "></span>
              )}
            </span>
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default Page;
