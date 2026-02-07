import { CustomerUI } from "@/types/adminFetchType";
import DeleteCustomerComponent from "./DeleteCustomerComponent";

interface Props {
  customer: CustomerUI;
}

export default function CustomerOverview({ customer }: Props) {
  return (
    <div className="w-full rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-gray-900">Overview</h2>

      <div className="space-y-6">
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-400">
            Address
          </label>
          <p className="text-sm leading-relaxed text-gray-700">
            {customer?.address1} {customer?.address2}
          </p>
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-400">
            Email
          </label>
          <p className="text-sm leading-relaxed text-gray-700">
            {customer?.email}
          </p>
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-400">
            Phone
          </label>
          <p className="text-sm text-gray-700">{customer?.phone}</p>
        </div>

        <hr className="border-gray-100" />

        <DeleteCustomerComponent customerId={customer?.id} />
      </div>
    </div>
  );
}
