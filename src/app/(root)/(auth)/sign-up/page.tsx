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
import { supabase } from "@/supabase-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { MESSAGES } from "@/lib/message";
import { useProductContext } from "../../../../../context/productContext";

interface userDataType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Page = () => {
  const [Loading, setLoading] = useState(false);
  const { push } = useRouter();
  const [userData, setUserData] = useState<userDataType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const { setUserId } = useProductContext();
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      setLoading(true);
      const { data, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
      });
      if (authError) throw authError;

      if (data.user) {
        localStorage.setItem("user_id", data.user?.id);
        setUserId(data.user?.id);
      }
      const { error: insertError } = await supabase
        .from("user_profile")
        .insert([
          {
            id: data.user?.id,
            first_name: userData.firstName,
            last_name: userData.lastName,
          },
        ]);

      toast.success(MESSAGES.auth.signUpSuccess);
      push(`/`);
      if (insertError) throw insertError;
    } catch (err) {
      console.log(
        err instanceof Error ? err.message : "An error occurred during sign up"
      );
      toast.error(
        err instanceof Error ? err.message : "An error occurred during sign up"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div>
          <CardTitle>Create an account</CardTitle>
          <CardDescription className="text-[13px] mt-1">
            Enter your details below
          </CardDescription>
        </div>
        <Link href={`/log-in`}>
          <Button variant="link">LogIn</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <Input
              id="FirstName"
              type="text"
              name="firstName"
              placeholder="FirstName"
              className="border-b border-transparent placeholder:text-[#a5a5a5] border-b-[#d4d4d4] rounded-[0px]"
              required
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <Input
              id="LastName"
              type="text"
              name="lastName"
              placeholder="LastName"
              className="border-b border-transparent placeholder:text-[#a5a5a5] border-b-[#d4d4d4] rounded-[0px]"
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              required
            />
          </div>
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
          </div>
        </div>
      </CardContent>
      <form onSubmit={handleSignUp}>
        <CardFooter>
          <Button
            type="submit"
            disabled={Loading}
            className="w-full relative grid grid-cols-[auto_auto] items-center"
          >
            <span className="w-10 h-6 absolute top-1.5 left-[30%]">
              {Loading && (
                <span className="block w-6 h-6 rounded-full border-4 border-white border-t-[#DB4444] animate-spin "></span>
              )}
            </span>
            Sign Up
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default Page;
