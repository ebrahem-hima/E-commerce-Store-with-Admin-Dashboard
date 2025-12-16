"use client";
import { useState } from "react";
import TableSearch from "../shared/TableSearch";
import { SelectCheckBox } from "@/types/typeAliases";
import PageHeader from "../shared/PageHeader";
import { InboxTableType } from "@/types/adminTableCheckboxtype";
import InboxRealTime from "./InboxRealTime";
import useInbox from "./hooks/useInbox";

const Page = () => {
  const [selectCheckBox, setSelectCheckBox] = useState<SelectCheckBox[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectFilter, setSelectFilter] = useState("");
  const { Loading, Inbox, setInbox } = useInbox({
    searchText,
    selectFilter,
  });

  const selectOptions = [
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
    { label: "New", value: "new" },
    { label: "Seen", value: "seen" },
    { label: "Reply", value: "reply" },
  ];

  const headers = [
    { title: "Email" },
    { title: "Message" },
    { title: "Status" },
    { title: "Date" },
  ];

  return (
    <>
      <InboxRealTime setInbox={setInbox} />
      <PageHeader title="Inbox" />
      <TableSearch<InboxTableType>
        typeTable="inbox"
        selectCheckBox={selectCheckBox}
        setSelectCheckBox={setSelectCheckBox}
        selectOptions={selectOptions}
        setSearchText={setSearchText}
        tableData={Inbox}
        headers={headers}
        Loading={Loading}
        setSelectFilter={setSelectFilter}
        emptyMessage="There are no Messages to display"
      />
    </>
  );
};

export default Page;
