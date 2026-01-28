import { useEffect } from "react";
import { createClient } from "@/app/utils/supabase/client";
import { categoryDetailType } from "@/types/adminType";

export default function CategoryRealTime({
  setCategories,
}: {
  setCategories: React.Dispatch<React.SetStateAction<categoryDetailType[]>>;
}) {
  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel("category-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "categories",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setCategories((prev) => [
              ...prev,
              {
                id: payload.new.id,
                name: payload.new.name,
                type: payload.new.type,
                description: payload.new.description,
                created_at: payload.new.created_at,
              },
            ]);
          } else if (payload.eventType === "UPDATE") {
            setCategories((prev) =>
              prev.map((category) =>
                category?.id === payload.new.id
                  ? {
                      id: payload.new.id,
                      name: payload.new.name,
                      type: payload.new.type,
                      description: payload.new.description,
                      created_at: payload.new.created_at,
                    }
                  : category,
              ),
            );
          } else if (payload.eventType === "DELETE") {
            setCategories((prev) =>
              prev.filter((category) => category?.id !== payload.old.id),
            );
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [setCategories]);

  return null;
}
