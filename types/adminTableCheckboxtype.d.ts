export interface TypeProductTable {
  type: "productTable";
  id: string;
  name: string;
  img: string;
  stock: number;
  categories: { name: string };
  discount: number;
  discount_type: string;
  price: number;
  created_at: string;
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

export interface CustomerTableType {
  type: "customerTable";
  id: string;
  name: string;
  email: string;
  order_count: number;
  total_spent: number;
}

export interface CouponTableType {
  type: "couponTable";
  id: string;
  coupon_name: string;
  coupon_code: string;
  usage_limit_per_user: number;
  coupon_assignments: {
    user_profile: {
      id: string;
      first_name: string;
      last_name: string;
    };
  }[];
  max_uses_total: number;
  times_used: number;
  is_active: boolean;
  created_at: string;
  expired_at: string;
  isPublic: boolean;
  customUsers: {
    userId: string;
    userName: string;
    max_uses: number;
    user_usage: number;
  }[];
  usage_count: number;
}

export interface InboxTableType {
  type: "inboxTable";
  id: number;
  user_id: string;
  user_profile: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
  message: string;
  created_at: string;
  status: string;
}
export type tableBodyCheckBoxType =
  | CustomerTableType[]
  | TypeProductTable[]
  | TypeUserOrder[]
  | CouponTableType[]
  | InboxTableType[];
