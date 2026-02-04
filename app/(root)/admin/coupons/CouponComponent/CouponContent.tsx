import {
  couponSortOptions,
  couponTableColumns,
} from "@/constant/admin/admin-tables/coupon_table";
import { getCoupons } from "../services/couponService";
import TableSearch from "../../shared/TableSearch";
interface Props {
  getSearchParams: { filter: string; search: string };
}
const CouponContent = async ({ getSearchParams }: Props) => {
  const data = await getCoupons({ getSearchParams });
  return (
    <>
      <TableSearch
        typeTable="coupons"
        selectOptions={couponSortOptions}
        tableData={data}
        headers={couponTableColumns}
        emptyMessage="There are no Coupons to display"
      />
    </>
  );
};

export default CouponContent;
