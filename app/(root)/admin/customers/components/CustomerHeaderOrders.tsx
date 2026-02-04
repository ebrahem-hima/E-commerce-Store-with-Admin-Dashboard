import { TypeUserOrder } from "@/types/adminTableCheckboxtype";
import CustomTable from "@/components/shared/table/customTable";
import { CustomerUI } from "@/types/adminFetchType";

interface Props {
  customer: CustomerUI;
  Orders: TypeUserOrder[];
  titles: { title: string }[];
}

export default function CustomerHeaderOrders({
  customer,
  Orders,
  titles,
}: Props) {
  return (
    <div className="flex-1 space-y-8 rounded-xl bg-white p-6 shadow-sm">
      {/* Part A: Customer Header Details */}
      <div className="flex flex-row max-sm:flex-col items-center gap-6 border-b border-gray-100 pb-8">
        <div className="w-24 h-24 rounded-full bg-[#A1A7C4] text-white flex items-center justify-center text-5xl md:text-5xl">
          {customer?.name.charAt(0).toUpperCase()}
        </div>

        <div className="flex flex-col gap-1 max-sm:text-center">
          <h1 className="text-md md:text-xl lg:text-2xl font-bold text-gray-900">
            {customer?.name}
          </h1>
          <div className="flex flex-col text-sm text-gray-500">
            <span>📍 {customer?.country}</span>
            <span>📦 {Orders?.length} Orders</span>
            <span>🕒 Member for {customer?.memberSince}</span>
          </div>
        </div>
      </div>

      {/* Part B: Simple Orders Table */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-800">
          Recent Orders
        </h3>
        <div className="overflow-x-auto">
          <CustomTable
            empty_table="No orders have been placed yet."
            role="admin"
            dataBody={Orders || []}
            titles={titles}
          />
        </div>
      </div>
    </div>
  );
}
