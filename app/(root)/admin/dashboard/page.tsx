"use client";

import CustomTable from "@/components/shared/table/customTable";
import Info from "./Info";
import {
  bodyTopMember,
  bodyTopProduct,
  headTopMember,
  headTopProduct,
} from "@/constant/table";
import useDashboardFn from "../adminHooks/useDashboardFn";
const Page = () => {
  const { OrderTotal, OrderCount, customersCount, Loading } = useDashboardFn();
  return (
    <>
      {Loading ? (
        "...Loading"
      ) : (
        <div className="flex flex-col gap-6">
          {/* Info */}
          <div className="w-full overflow-x-auto">
            <div className="flex min-w-[450px] gap-4">
              <Info type="total" text="Total Reven" number={OrderTotal} />
              <Info type="order" text="Orders" number={OrderCount} />
              <Info type="user" text="Existing Users" number={customersCount} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="font-medium">
              <p>Top Member by Units Sold</p>
              <CustomTable dataBody={bodyTopMember} titles={headTopMember} />
            </div>
            <div>
              <p className="font-medium">Top Products by Units Sold</p>
              <CustomTable dataBody={bodyTopProduct} titles={headTopProduct} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
