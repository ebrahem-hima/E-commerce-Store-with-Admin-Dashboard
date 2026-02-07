export type tableBodyType =
  | TopProductType[]
  | TopMemberType[]
  | TypeUserOrder[]
  | typeOrderDetailsTable[];

// Table Data Types for Admin Dashboard
export interface TopProductType {
  type: "top_product";
  product_id: string;
  product_img: string;
  product_name: string;
  product_price: number;
  product_quantity: number;
}

export interface TopMemberType {
  type: "top_customers";
  user_id: string;
  username: string;
  order_counts: number;
  total_spent: number;
}

export interface typeOrderDetailsTable {
  type: "orderDetails";
  id: string;
  img: string;
  name: string;
  price: number;
  discount?: number;
  discount_type?: string;
  quantity: number;
  options: { optionTitle: string; values: string[] }[];
}

export interface TypeUserOrder {
  type: "order_table";
  id: string;
  order_status: string;
  order_code: string;
  total: number;
  date: string;
  payment_status?: string;
  customer?: string;
  user_id: string;
}
