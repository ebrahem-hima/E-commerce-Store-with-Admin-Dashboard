"use client";

import { getUser } from "@/app/(root)/(auth)/authActions/getUser";
import { useState, useEffect } from "react";

const useAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser();
        if (user?.id) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (err) {
        console.error(err);
        setIsAuth(false);
      }
    };

    fetchUser();
  }, []);

  return { isAuth, setIsAuth };
};

export default useAuth;
