import { Dispatch, SetStateAction } from "react";

export interface typeProduct {
  id?: string;
  product_id: string;
  name: string;
  img: string;
  description: string;
  imgGallery?: string[];
  rate?: number;
  sales?: string;
  stock: number;
  count?: number;
  discount?: number;
  discount_type?: string;
  price: number;
  options?: { optionTitle: string; values: string[] }[];
  active: boolean;
  reviews?: {
    userId: string;
    username: string;
    rating: number;
    comment: string;
  }[];
}

export interface typeUserOrder {
  status: "paid" | "pending";
  order_code: string;
  total: number;
  created_at: string;
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
