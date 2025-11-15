// Table Data Types for Admin Dashboard
export interface TopProductType {
  type: "topProduct";
  id: string;
  img: string;
  name: string;
  price: string;
  unitSold: string;
}

export interface TopMemberType {
  type: "topMember";
  id: string;
  name: string;
  orders: number;
  totalSpent: number;
}
