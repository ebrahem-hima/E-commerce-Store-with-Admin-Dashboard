import PageHeader from "../shared/PageHeader";
import ProductTable from "./components/productTable";
import { Suspense } from "react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

interface Props {
  searchParams: Promise<{
    filter: string;
    search: string;
  }>;
}

const Page = async ({ searchParams }: Props) => {
  const resolvedParams = await searchParams;
  return (
    <>
      <PageHeader
        link="/admin/products/AddProduct"
        title="Products"
        buttonText="Add Product"
      />
      <Suspense fallback={<LoadingSpinner />}>
        <ProductTable searchParams={resolvedParams} />
      </Suspense>
    </>
  );
};

export default Page;
