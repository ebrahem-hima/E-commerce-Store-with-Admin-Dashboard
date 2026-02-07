"use client";

import { userType } from "@/types/adminType";
import { createClient } from "@/app/utils/supabase/client";
import { useEffect, useState } from "react";

interface Props {
  isOrderChange?: boolean;
  searchText?: string;
}

const useUserSearchFn = ({ isOrderChange, searchText }: Props) => {
  const [Loading, setLoading] = useState(true);
  const [userSearch, setUserSearch] = useState<userType[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const supabase = createClient();
      try {
        if (searchText) {
          const { data, error } = await supabase
            .from("user_profile")
            .select("email,first_name,last_name,id")
            .ilike("email", `%${searchText}%`);

          if (error) throw error;
          setUserSearch(data);
        }
      } catch (error) {
        console.log(error);
        setUserSearch([]);
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(fetchUsers, 500);
    return () => clearTimeout(timeout);
  }, [isOrderChange, searchText]);

  return {
    userSearch,
    Loading,
  };
};

export default useUserSearchFn;
