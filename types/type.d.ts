export interface optionStateType {
  isAdding: boolean;
  isEditing: boolean;
  editingTitle: string;
}

export type coupon_type =
  | "price_discount"
  | "fixed_discount"
  | "percentage"
  | "shipping";

export interface productOptionsType {
  optionTitle: string;
  values: string[];
}

export type handleUpdateQuantityProps = {
  type: "inc" | "dec";
  setQuantity: Dispatch<SetStateAction<number>>;
  quantity: number;
  stock: number;
};
