"use client";

import React, { useState } from "react";
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
import { useRouter } from "next/navigation";

interface userDataType {
  email: string;
  password: string;
}

const Page = () => {
  const [Loading, setLoading] = useState(false);
  const router = useRouter();
  const [userData, setUserData] = useState<userDataType>({
    email: "",
    password: "",
  });
  const LogIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: Data, error } = await supabase.auth.signInWithPassword({
        email: userData.email,
        password: userData.password,
      });
      if (Data.user) {
        localStorage.setItem("user_id", Data.user?.id);
      }
      if (error) {
        throw error;
      }

      toast.success("Successfully Logged In");
      router.push(`/`);
    } catch (err) {
      console.log(err instanceof Error ? err.message : err);
      toast.error(
        err instanceof Error ? err.message : "An error occurred during login"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
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
            <p className="flex justify-end cursor-pointer mt-1 text-sm underline-offset-4 hover:underline">
              Forgot your password?
            </p>
          </div>
        </div>
      </CardContent>
      <form onSubmit={LogIn}>
        <CardFooter className="flex-col gap-2">
          <Button
            disabled={Loading}
            type="submit"
            className="w-full relative grid grid-cols-[auto_auto] items-center"
          >
            Login
            <span className="w-10 h-6 absolute top-1.5 left-[30%]">
              {Loading && (
                <span className="block w-6 h-6 rounded-full border-4 border-white border-t-[#DB4444] animate-spin "></span>
              )}
            </span>
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default Page;
