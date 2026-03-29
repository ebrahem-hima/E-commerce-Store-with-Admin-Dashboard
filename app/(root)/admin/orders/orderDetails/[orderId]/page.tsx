import HeaderSaveActions from "@/app/(root)/admin/shared/HeaderSaveActions";
import { Suspense } from "react";
import OrderDetails from "../../components/orderDetails";
import OrderDetailsTableSkeleton from "@/app/(root)/account/orders/components/OrderDetailsTableSkeleton";
import OrderAddress from "../../components/OrderAddress";

const Page = async ({ params }: { params: Promise<{ orderId: string }> }) => {
  const { orderId } = await params;

  return (
    <div>
      <HeaderSaveActions
        title="Order Details"
        link={`/admin/orders`}
        hideSave={true}
      />
      <Suspense fallback={<OrderDetailsTableSkeleton />}>
        <OrderDetails orderId={orderId} />
        <OrderAddress orderId={orderId} />
      </Suspense>
    </div>
  );
};

export default Page;
