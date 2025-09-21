import React from "react";
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

const page = () => {
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
        <form>
          <div className="flex flex-col gap-6">
            <Input
              id="email"
              type="email"
              placeholder="Email or Phone Number"
              className="border-b border-transparent placeholder:text-[#a5a5a5] border-b-[#d4d4d4] rounded-[0px]"
              required
            />
            <div>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                className="border-b border-transparent placeholder:text-[#a5a5a5] border-b-[#d4d4d4] rounded-[0px]"
                required
              />
              <p className="flex justify-end cursor-pointer mt-1 text-sm underline-offset-4 hover:underline">
                Forgot your password?
              </p>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Login
        </Button>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  );
};

export default page;
