import { InboxTableType } from "@/types/adminTableCheckboxtype";
import { createClient } from "@/utils/supabase/server";

interface Props {
  searchParams: {
    search: string;
    filter: string;
  };
}

export const getInboxServer = async ({ searchParams }: Props) => {
  const { search: searchText, filter: selectFilter } = searchParams;
  const supabase = await createClient();
  try {
    let query = supabase.from("inbox").select(
      `id,user_id,message,created_at,status,
        user_profile (
          first_name,
          last_name,
          email,
          phone
        )`,
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

    const { data: inboxData, error } = await query;
    if (error) throw error;

    const data: InboxTableType[] = inboxData.map((c) => ({
      ...c,
      type: "inboxTable" as const,
      user_profile: Array.isArray(c.user_profile)
        ? c.user_profile[0]
        : c.user_profile,
    }));

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
