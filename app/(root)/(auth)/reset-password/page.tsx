"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { supabase } from "@/supabase-client";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { MESSAGES } from "@/lib/message";

const Page = () => {
  const [Loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const { push } = useRouter();
  const changePassword = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });
      if (error) {
        toast.error(MESSAGES.password.resetSamePassword);
        throw error;
      }
      toast.success(MESSAGES.password.updatePassword);
      push(`/log-in`);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Change your password</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="Enter your new password"
          className="border-b border-transparent placeholder:text-[#a5a5a5] border-b-[#d4d4d4] rounded-[0px]"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </CardContent>
      <form onSubmit={changePassword}>
        <CardFooter className="flex-col gap-2">
          <Button
            disabled={Loading}
            type="submit"
            className="w-full relative grid grid-cols-[auto_auto] items-center"
          >
            Save Password
            <span className="w-10 h-6 absolute top-1.5 left-[30%]">
              {Loading && (
                <span className="block w-6 h-6 rounded-full border-4 border-white border-t-[#DB4444] animate-spin "></span>
              )}
            </span>
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default Page;
