import { createClient } from "@/app/utils/supabase/client";
import { toast } from "sonner";

const supabase = createClient();
export const handleDeleteUsers = async (userIds: string[]) => {
  const { error } = await supabase.rpc("delete_users_bulk", {
    target_ids: userIds,
  });

  if (error) {
    console.error(error.message);
    alert(error.message);
  }
  toast.success("Users has been Deleted");
};
