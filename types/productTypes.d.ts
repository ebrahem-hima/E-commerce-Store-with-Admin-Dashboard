import { Dispatch, SetStateAction } from "react";

export type optionType = { optionTitle: string; values?: string[] };

export interface CategoryType {
  id: number;
  name?: string;
}

export interface typeProduct {
  id?: string;
  product_id?: string;
  name: string;
  img: string;
  description: string;
  imgGallery?: string[];
  rate?: number;
  stock: number;
  categories?: CategoryType;
  count?: number;
  discount?: number;
  discount_type?: string;
  price: number;
  options?: optionType[];
  active: boolean;
  created_at?: string;
  // sales?: string;
  // reviews?: {
  //   userId: string;
  //   username: string;
  //   rating: number;
  //   comment: string;
  // }[];
}

export interface typeUserOrder {
  type: "orderTable";
  id: string;
  order_status: string;
  order_code: string;
  total: number;
  date: string;
  payment_status?: string;
  customer?: string;
  user_id: string;
}

export interface OrderDetailsType {
  product_id: string;
  name: string;
  img: string;
  price: number;
  discount?: number;
  discount_type?: string;
  count: number;
  options?: {
    optionTitle: string;
    values: string[];
  }[];
}

// check if searchNavbar or filter open
export interface typeIsOpen {
  filter: boolean;
  searchNavbar: boolean;
}

export interface SliderComponentType {
  titleComponent: string;
  Product: typeProduct[];
  category?: string;
  type?: string;
  search?: boolean;
}

export interface deleteProductCart {
  ID: string;
  name: string;
  userId: string;
  setIsCartDataUpdated: Dispatch<SetStateAction<boolean>>;
  setCartData: Dispatch<SetStateAction<typeProduct[]>>;
}
