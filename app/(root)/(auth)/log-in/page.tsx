"use client";

import { useActionState, useEffect, useRef } from "react";
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
import { login } from "../authActions/login";
import { useProductContext } from "@/context/productContext";
import { MESSAGES } from "@/lib/message";
import { createClient } from "@/app/utils/supabase/client";
import { useRouter } from "next/navigation";

const Page = () => {
  const initialState = {
    success: false,
    message: "",
    inputs: { email: "", password: "" },
  };
  const emailInput = useRef<HTMLInputElement>(null);

  const { setIsAuth } = useProductContext();
  const [state, formAction, isPending] = useActionState(login, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
        setIsAuth(true);
        router.push("/");
      } else {
        toast.error(state.message);
      }
    }
  }, [state, router, setIsAuth]);

  const resetPassword = async () => {
    if (!emailInput.current || !emailInput.current.value) {
      toast.error(MESSAGES.password.resetEnterEmail);
      return;
    }
    const supabase = createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(
      emailInput.current.value,
      {
        redirectTo: "http://localhost:3000/reset-password",
      },
    );
    if (error) {
      console.log("Rest Password Error", error);
      return;
    }
    toast.success(MESSAGES.password.resetCheckEmail);
  };

  return (
    <form action={formAction}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <div>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription className="text-[12px] mt-1">
              Enter your email below to login to your account
            </CardDescription>
          </div>
          <Link href={`/sign-up`}>
            <Button variant="link" className="whitespace-nowrap">
              Sign Up
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Email or Phone Number"
            className="border-b border-transparent placeholder:text-[#a5a5a5] border-b-[#d4d4d4] rounded-none"
            required
            defaultValue={state.inputs.email}
          />
          <div>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              className="border-b border-transparent placeholder:text-[#a5a5a5] border-b-[#d4d4d4] rounded-none"
              required
              defaultValue={state.inputs.password}
            />
            <p
              onClick={resetPassword}
              className="flex justify-end cursor-pointer mt-1 text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </p>
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
