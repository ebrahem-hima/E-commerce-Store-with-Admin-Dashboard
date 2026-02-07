import PageHeader from "../shared/PageHeader";
import { Suspense } from "react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import OrderTable from "./orderTable";

interface Props {
  searchParams: Promise<{
    filter: string;
    search: string;
  }>;
}

const Page = async ({ searchParams }: Props) => {
  const getSearchParams = await searchParams;
  return (
    <>
      <PageHeader title="Orders" />
      <Suspense fallback={<LoadingSpinner />}>
        <OrderTable getSearchParams={getSearchParams} />
      </Suspense>
    </>
  );
};

export default Page;
