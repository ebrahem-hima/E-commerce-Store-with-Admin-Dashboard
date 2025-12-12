export interface userOrdersType {
  id: string;
  product_id: string;
  img: string;
  name: string;
  price: number;
  count: number;
}

export interface checkTotalType {
  discount: number;
  discountType: "percentage" | "fixed";
  total: number;
  ID: number;
}
