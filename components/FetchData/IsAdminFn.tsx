"use client";

import { useEffect, useState } from "react";
import { getUser } from "@/app/(root)/(auth)/authActions/getUser";
import { useProductContext } from "@/context/productContext";
import { createClient } from "@/utils/supabase/client";

const IsAdminFn = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [Loading, setLoading] = useState(true);
  const { isAuth } = useProductContext();
  useEffect(() => {
    setLoading(true);
    const getAdmin = async () => {
      const user = await getUser();
      if (!user?.id) {
        setIsAdmin(false);
      }
      const supabase = createClient();

      const { data, error } = await supabase
        .from("user_profile")
        .select("role")
        .eq("id", user?.id)
        .maybeSingle();
      if (error) {
        console.log("error", error);
        return;
      }
      if (data?.role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    };

    getAdmin();
  }, [isAuth]);
  return { isAdmin, setIsAdmin, Loading };
};

export default IsAdminFn;
