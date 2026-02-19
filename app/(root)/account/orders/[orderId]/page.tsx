import { Suspense } from "react";
import OrderDetailsTable from "../components/OrderDetailsTable";
import OrderDetailsTableSkeleton from "../components/OrderDetailsTableSkeleton";

const Page = async ({ params }: { params: Promise<{ orderId: string }> }) => {
  const { orderId } = await params;
  return (
    <div>
      <h2 className="text-primary font-bold text-xl mb-2">Order Details</h2>
      <Suspense fallback={<OrderDetailsTableSkeleton />}>
        <OrderDetailsTable orderId={orderId} />
      </Suspense>
    </div>
  );
};

export default Page;
