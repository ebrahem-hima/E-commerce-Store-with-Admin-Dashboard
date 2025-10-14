"use client";
import { supabase } from "@/supabase-client";
import { Dispatch, SetStateAction, useEffect } from "react";

interface Props {
  userId: string | null;
  setUserId: Dispatch<SetStateAction<string | null>>;
}

const AuthFn = ({ userId, setUserId }: Props) => {
  useEffect(() => {
    const id = localStorage.getItem("user_id");
    if (id) setUserId(id);
  }, []);
  const login = (id: string) => {
    localStorage.setItem("user_id", id);
    setUserId(id);
  };
  const logout = async () => {
    localStorage.clear();
    const { error } = await supabase.auth.signOut();
    if (error) console.log("error", error);
    setUserId(null);
  };
  return { userId, login, logout };
};

export default AuthFn;
