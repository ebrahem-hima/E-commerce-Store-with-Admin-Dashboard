import CustomTable from "@/components/shared/table/customTable";
import { getDashboardData } from "../services/dashboardService";
import Info from "../Info";
import { headTopMember, headTopProduct } from "@/constant/table";

const DashboardContent = async () => {
  const {
    order_count,
    order_total,
    customers_count,
    top_customers,
    top_products,
  } = await getDashboardData();
  return (
    <div className="flex flex-col gap-6">
      {/* Info */}
      <div className="w-full overflow-x-auto">
        <div className="flex min-w-112.5 gap-4">
          <Info type="total" text="Total Reven" number={order_total} />
          <Info type="order" text="Orders" number={order_count} />
          <Info
            type="user"
            text="Existing Users"
            number={customers_count || 0}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="font-medium">
          <p>Top Member by Units Sold</p>
          <CustomTable
            empty_table="No users have made purchases yet."
            dataBody={top_customers}
            titles={headTopMember}
          />
        </div>
        <div className="font-medium">
          <p>Top Products by Units Sold</p>
          <CustomTable
            empty_table="No products have been sold yet."
            dataBody={top_products}
            titles={headTopProduct}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
