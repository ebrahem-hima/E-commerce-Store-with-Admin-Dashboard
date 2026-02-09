import { createClient } from "@/app/utils/supabase/client";

// Types
export interface ServiceDeleteProps {
  typeTable: string;
  ids: (string | number)[];
}
// Function: Delete selected rows in any table
export const deleteItemsService = async ({
  typeTable,
  ids,
}: ServiceDeleteProps) => {
  if (!ids.length) return;
  const supabase = createClient();
  const { error } = await supabase.from(typeTable).delete().in("id", ids);
  if (error) throw error;
};
