import { getUser } from "@/app/(root)/(auth)/authActions/getUser";
import { supabase } from "@/supabase-client";
import { useEffect, useState } from "react";

interface Props {
  isAuth: boolean;
}

const AuthFn = ({ isAuth }: Props) => {
  const [user, setUser] = useState<string | null>(null);
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
  return { user, setUser };
};

export default AuthFn;
