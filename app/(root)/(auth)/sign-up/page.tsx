"use client";

import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signup } from "../authActions/signup";
import { toast } from "sonner";
import { useProductContext } from "@/context/productContext";

const Page = () => {
  const [isPending, startTransition] = useTransition();
  const { setIsAuth } = useProductContext();

  return (
    <form
      action={(formData) => {
        startTransition(() => signup(formData));
        toast.success("SignUp successfully");
        setIsAuth(true);
        // setIsAuth((prev) => !prev);
      }}
      className="w-full max-w-sm"
    >
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
            />
            <Input
              id="LastName"
              type="text"
              name="lastName"
              placeholder="LastName"
              className="border-b border-transparent placeholder:text-[#a5a5a5] border-b-[#d4d4d4] rounded-[0px]"
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
          />
          <div>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              className="border-b border-transparent placeholder:text-[#a5a5a5] border-b-[#d4d4d4] rounded-[0px]"
              required
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          disabled={isPending}
          className="w-full relative grid grid-cols-[auto_auto] items-center"
        >
          <span className="w-10 h-6 absolute top-1.5 left-[30%]">
            {isPending && (
              <span className="block w-6 h-6 rounded-full border-4 border-white border-t-[#DB4444] animate-spin "></span>
            )}
          </span>
          Sign Up
        </Button>
      </CardFooter>
    </form>
  );
};

export default Page;
