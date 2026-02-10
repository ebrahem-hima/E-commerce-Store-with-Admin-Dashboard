import { Suspense } from "react";
import WishListSkeleton from "./WishListSkeleton";
import WishListWrapper from "./WishListWrapper";

const Page = async () => {
  return (
    <Suspense fallback={<WishListSkeleton />}>
      <WishListWrapper />
    </Suspense>
  );
};

export default Page;
