export type CustomerType = {
  id: string;
  first_name: string;
  last_name: string;
  orders: number;
  totalSpent: number;
  email: string;
};

export interface CouponType {
  id: number;
  coupon_id: string;
  coupon_name: string;
  isPublic: string;
  discount: number;
  discount_type: string;
  created_at: string;
  expired_at: string;
  is_active: boolean;
  max_uses: number;
  times_used: number;
  type: string;
}
