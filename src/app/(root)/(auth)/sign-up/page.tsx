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
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Enter your details below</CardDescription>
        </div>
        <Link href={`/log-in`}>
          <Button variant="link">LogIn</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <Input
                id="FirstName"
                type="text"
                placeholder="FirstName"
                className="border-b border-transparent placeholder:text-[#a5a5a5] border-b-[#d4d4d4] rounded-[0px]"
                required
              />
              <Input
                id="LastName"
                type="text"
                placeholder="LastName"
                className="border-b border-transparent placeholder:text-[#a5a5a5] border-b-[#d4d4d4] rounded-[0px]"
                required
              />
            </div>
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
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </CardFooter>
    </Card>
  );
};

export default page;
