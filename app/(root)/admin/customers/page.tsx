import PageHeader from "../shared/PageHeader";
import { Suspense } from "react";
import LoadingSpinner from "@/components/Loaders/LoadingSpinner";
import CustomerTable from "./components/CustomerTable";

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
      <PageHeader title="Customers" />
      <Suspense fallback={<LoadingSpinner />}>
        <CustomerTable getSearchParams={getSearchParams} />
      </Suspense>
    </>
  );
};

export default Page;
