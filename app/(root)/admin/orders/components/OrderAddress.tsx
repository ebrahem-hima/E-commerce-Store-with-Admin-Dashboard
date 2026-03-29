import { createClient } from "@/app/utils/supabase/server";

interface Props {
  orderId: string;
}

type userProfileType = {
  first_name: string;
  last_name: string;
  phone: string;
  address1: string;
  address2: string;
  state: string;
  country: string;
};

const OrderAddress = async ({ orderId }: Props) => {
  const supabase = await createClient();

  const { data: order, error } = await supabase
    .from("user_order")
    .select(
      `
    user_profile(
      first_name,
      last_name,
      phone,
      address1,
      address2,
      state,
      country
    )
  `,
    )
    .eq("order_code", orderId)
    .maybeSingle();

  if (error || !order) {
    return (
      <div className="bg-white rounded-2xl p-5 shadow-sm border">
        <p className="text-sm text-red-500">Failed to load address</p>
      </div>
    );
  }

  const rawProfile = Array.isArray(order.user_profile)
    ? order.user_profile[0]
    : order.user_profile;

  const profile = rawProfile as userProfileType;

  return (
    <div className="mt-4 bg-white rounded-2xl p-6 shadow-md border border-gray-100 h-fit">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-xl">📦</span>
        <h2 className="text-lg font-semibold text-gray-900">
          Shipping Details
        </h2>
      </div>

      <div className="space-y-3 text-sm">
        {/* Name */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
          <span className="text-gray-500 font-medium w-28">Name:</span>
          <span className="font-semibold text-gray-900 capitalize">
            {profile.first_name} {profile.last_name}
          </span>
        </div>

        {/* Phone */}
        {profile.phone && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
            <span className="text-gray-500 font-medium w-28">Phone:</span>
            <span className="text-gray-800 font-medium">{profile.phone}</span>
          </div>
        )}

        {/* خط فاصل صغير */}
        <hr className="border-gray-100 my-3" />

        {/* Address 1 */}
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">
          <span className="text-gray-500 font-medium w-28">Address 1:</span>
          <span className="text-gray-800 flex-1">{profile.address1}</span>
        </div>

        {/* Address 2 */}
        {profile.address2 && (
          <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">
            <span className="text-gray-500 font-medium w-28">Address 2:</span>
            <span className="text-gray-800 flex-1">{profile.address2}</span>
          </div>
        )}

        {/* State */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
          <span className="text-gray-500 font-medium w-28">State:</span>
          <span className="text-gray-800 font-medium">{profile.state}</span>
        </div>

        {/* Country */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
          <span className="text-gray-500 font-medium w-28">Country:</span>
          <span className="text-gray-800 font-medium">{profile.country}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderAddress;
