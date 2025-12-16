import { InboxTableType } from "@/types/adminTableCheckboxtype";
import { createClient } from "@/utils/supabase/client";
import { Dispatch, SetStateAction, useEffect } from "react";

const InboxRealTime = ({
  setInbox,
}: {
  setInbox: Dispatch<SetStateAction<InboxTableType[]>>;
}) => {
  useEffect(() => {
    const supabase = createClient();
    const channel = supabase.channel("inbox-changes");

    channel.on(
      "postgres_changes",
      {
        event: "DELETE",
        schema: "public",
        table: "inbox",
      },
      (payload) => {
        setInbox((prev) =>
          prev.filter((inbox) => inbox?.id !== payload.old.id)
        );
      }
    );
    // .subscribe()
    channel.on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "inbox",
      },
      (payload) => {
        setInbox((prev) =>
          prev.map((inbox) =>
            inbox.id === payload.new.id
              ? { ...inbox, status: payload.new.status }
              : inbox
          )
        );
      }
    );
    channel.subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [setInbox]);
  return null;
};

export default InboxRealTime;
