"use client";

import { createClient } from "@/app/utils/supabase/client";
import { useState, useEffect } from "react";

const UseAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    const supabase = createClient();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log(event, session);

        if (session?.user) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      },
    );

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  return { isAuth, setIsAuth };
};

export default UseAuth;
