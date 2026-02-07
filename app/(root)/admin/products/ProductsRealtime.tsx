import { useEffect } from "react";
import { createClient } from "@/app/utils/supabase/client";
import { TypeProductTable } from "@/types/adminTableCheckboxtype";

export default function ProductsRealtime({
  setProducts,
}: {
  setProducts: React.Dispatch<React.SetStateAction<TypeProductTable[]>>;
}) {
  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel("products-changes")
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "products",
        },
        (payload) => {
          setProducts((prev) =>
            prev.filter((product) => product.id !== payload.old.id),
          );
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [setProducts]);

  return null;
}
