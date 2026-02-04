import HeaderSaveActions from "@/app/(root)/admin/shared/HeaderSaveActions";
import OrderTableFetcher from "../../../../components/OrderTableFetcher";
import { Suspense } from "react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const Page = async ({
  params,
}: {
  params: Promise<{ orderId: string; id: string }>;
}) => {
  const { orderId, id } = await params;

  return (
    <div>
      <HeaderSaveActions
        title="Order Details"
        link={`/admin/customers/customerInformation/${id}`}
        hideSave={true}
      />
      <Suspense fallback={<LoadingSpinner />}>
        <OrderTableFetcher orderId={orderId} />
      </Suspense>
    </div>
  );
};

export default Page;
