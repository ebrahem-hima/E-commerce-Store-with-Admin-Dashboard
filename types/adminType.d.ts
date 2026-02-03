export type selectFilterType = {
  label: string;
  value: string;
};

export type categoryDetailType = {
  id?: number;
  name: string;
  type: string;
  description: string;
  created_at?: string;
  productCount?: number;
} | null;

export interface typeEditValue {
  ID: string;
  status: string;
}

export interface userType {
  email: string;
  first_name: string;
  last_name: string;
  id: string;
}

export type couponDetailType = {
  id?: number;
  couponName: string;
  couponCode: string;
  couponType: string;
  discountValue: number;
  appliesTo: userType[];
  expired_at: string;
  usage_limit_per_user: number;
  max_uses_total: number;
  isPublic: boolean;
};

export interface Message {
  id: string;
  text: string;
  isSent: boolean; // true if sent by me, false if received
  time: string;
  status: "sent" | "delivered" | "read";
}

export type typeMode = "create" | "edit";

export type categoryType = {
  name: string | undefined;
  id: number | undefined;
};

export interface categorySelectType {
  categorySelected: categoryType[];
  categoryDeleted: categoryType[];
}
