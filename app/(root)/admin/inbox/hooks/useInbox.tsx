import { InboxTableType } from "@/types/adminTableCheckboxtype";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

interface Props {
  searchText: string;
  selectFilter: string;
}

const useInbox = ({ searchText, selectFilter }: Props) => {
  const [Inbox, setInbox] = useState<InboxTableType[]>([]);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    const supabase = createClient();
    const getInbox = async () => {
      try {
        setLoading(true);
        let query = supabase.from("inbox").select(
          `id,user_id,message,created_at,status,
            user_profile (
              first_name,
              last_name,
              email,
              phone
            )`
        );
        if (searchText) {
          query = query.ilike("message", `%${searchText}%`);
        }

        if (selectFilter) {
          switch (selectFilter) {
            case "newest":
              query = query.order("created_at", { ascending: false });
              break;
            case "oldest":
              query = query.order("created_at", { ascending: true });
              break;
            case "new":
              query = query.eq("status", "New");
              break;
            case "seen":
              query = query.eq("status", "Seen");
              break;
            case "reply":
              query = query.eq("status", "Reply");
              break;
            default:
              break;
          }
        }

        const { data, error } = await query;
        if (error) throw error;
        const InboxData = data.map((c) => ({
          ...c,
          type: "inboxTable" as const,
          user_profile: Array.isArray(c.user_profile)
            ? c.user_profile[0]
            : c.user_profile,
        }));
        setInbox(InboxData);
      } catch (error) {
        if (error) {
          console.log(error);
          return;
        }
      } finally {
        setLoading(false);
      }
    };

    getInbox();
  }, [searchText, selectFilter]);
  console.log("mInbox", Inbox);
  return { Inbox, Loading, setInbox };
};

export default useInbox;
