export const couponSortOptions = [
  { label: "Newest", value: "created_desc" },
  { label: "Oldest", value: "created_asc" },
  { label: "Highest Discount", value: "discount_desc" },
  { label: "Lowest Discount", value: "discount_asc" },
  { label: "Most Used", value: "used_desc" },
  { label: "Least Used", value: "used_asc" },
  { label: "Expiring Soon", value: "expire_asc" },
  { label: "Active First", value: "active_desc" },
];

export const couponTableColumns = [
  { title: "Coupon Name" },
  { title: "Usage" },
  { title: "Status" },
  { title: "Specific" },
  { title: "Date" },
];
