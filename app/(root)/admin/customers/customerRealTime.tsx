import { CustomerTableType } from "@/types/adminTableCheckboxtype";
import { createClient } from "@/utils/supabase/client";
import { Dispatch, SetStateAction, useEffect } from "react";

const supabase = createClient();

const CustomerRealTime = ({
  setCustomer,
}: {
  setCustomer: Dispatch<SetStateAction<CustomerTableType[]>>;
}) => {
  useEffect(() => {
    const channel = supabase
      .channel("customers-changes")
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "user_profile" },
        (payload) => {
          setCustomer((prev) =>
            prev.filter((customer) => customer.id !== payload.old.id)
          );
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [setCustomer]);

  return null;
};

export default CustomerRealTime;
