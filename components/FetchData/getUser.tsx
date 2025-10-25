import { supabase } from "@/supabase-client";
import { Dispatch, SetStateAction, useEffect } from "react";

interface Props {
  setUser: Dispatch<SetStateAction<string | null>>;
  user: string | null;
}

const GetUser = ({ setUser, user }: Props) => {
  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.log(error);
        return false;
      }
      if (data?.user) setUser(data.user.id);
    };
    getUser();
  }, []);
  return { user };
};

export default GetUser;
