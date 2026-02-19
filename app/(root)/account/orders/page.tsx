import { CustomTableSkeleton } from "./components/CustomTableSkeleton";
import OrdersContent from "./components/OrdersContent";
import { Suspense } from "react";

const Page = async () => {
  return (
    <div className="h-122.5 overflow-y-auto">
      <h2 className="text-primary font-bold text-xl mb-2">Your Orders</h2>
      <Suspense fallback={<CustomTableSkeleton />}>
        <OrdersContent />
      </Suspense>
    </div>
  );
};

export default Page;
