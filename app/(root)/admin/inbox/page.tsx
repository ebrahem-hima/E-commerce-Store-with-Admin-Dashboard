import { Suspense } from "react";
import PageHeader from "../shared/PageHeader";
import InboxTable from "./InboxTable";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ search: string; filter: string }>;
}) => {
  const getSearchParams = await searchParams;

  return (
    <>
      <PageHeader title="Inbox" />
      <Suspense fallback={<LoadingSpinner />}>
        <InboxTable searchParams={getSearchParams} />
      </Suspense>
    </>
  );
};

export default Page;
