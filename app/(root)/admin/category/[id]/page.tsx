import { Suspense } from "react";
import CategoryDetail from "../components/CategoryDetail";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CategoryDetail categoryId={id} />
    </Suspense>
  );
};

export default Page;
