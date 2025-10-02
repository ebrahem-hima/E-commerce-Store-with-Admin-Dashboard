export interface TopProductType {
  type: "topProduct";
  id: string;
  name: string;
  price: string;
  unitSold: string;
}

export interface TopMemberType {
  type: "topMember";
  id: string;
  name: string;
  date: string;
  amount: number;
  status: string;
}
