import HeaderSaveActions from "../../../shared/HeaderSaveActions";
import { Suspense } from "react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import CustomerContent from "../../components/CustomerContent";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="bg-gray-50">
      <HeaderSaveActions
        title="Customer Details"
        link={`/admin/customers`}
        hideSave={true}
      />
      <div className="max-w-7xl">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_auto] gap-4">
          <Suspense fallback={<LoadingSpinner />}>
            <CustomerContent params={params} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
