import { createClient } from "@/app/utils/supabase/client";

// Types
export interface EditValue {
  ID: string | number;
  status: string;
}

// Function: Edit table orders
export const handleEditTable = async (EditValue: EditValue[]) => {
  if (!EditValue || EditValue.length === 0) return;
  const supabase = createClient();
  const updatePromises = EditValue.map((item) =>
    supabase
      .from("user_order")
      .update({ order_status: item.status })
      .eq("id", item.ID),
  );
  const results = await Promise.all(updatePromises);

  results.forEach(({ error }, idx) => {
    if (error) console.log(`Error updating ID ${EditValue[idx].ID}:`, error);
  });
};
