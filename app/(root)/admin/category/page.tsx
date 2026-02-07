import { Suspense } from "react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import CategoryWrapper from "./components/CategoryWrapper";

const Page = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <CategoryWrapper />
      </Suspense>
    </>
  );
};

export default Page;
