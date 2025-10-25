import { getUser } from "@/app/(root)/(auth)/authActions/getUser";
import { supabase } from "@/supabase-client";
import { Dispatch, SetStateAction, useEffect } from "react";

interface Props {
  setUser: Dispatch<SetStateAction<string | null>>;
  user: string | null;
  isAuth: boolean;
}

const AuthFn = ({ setUser, user, isAuth }: Props) => {
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser();
        if (user) setUser(user?.id);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      fetchUser();
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [isAuth]);
  return { user };
};

export default AuthFn;
