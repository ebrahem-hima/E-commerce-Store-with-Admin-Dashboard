import { Dispatch, SetStateAction } from "react";

export type optionType = { optionTitle: string; values?: string[] };

export interface CategoryType {
  id: number;
  name?: string;
}

export interface typeProduct {
  id: string;
  // id: string;
  product_id?: string;
  name: string;
  img: string;
  description: string;
  imgGallery?: string[];
  rate?: number;
  stock: number;
  category_id: number;
  count?: number;
  discount?: number;
  discount_type?: string;
  price: number;
  options?: optionType[];
  active: boolean;
  created_at?: string;
  search_text?: string;
}

export interface OrderDetailsType {
  id: string;
  name: string;
  img: string;
  price: number;
  discount?: number;
  discount_type?: string;
  quantity: number;
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
export interface productCategory {
  name: string;
  id: string;
  price: number;
  discount: number;
  img: string;
  rate: number;
  discount_type: string;
  stock: number;
}
export interface productWithCategory {
  id?: string;
  id?: string;
  name: string;
  img: string;
  description: string;
  imgGallery?: string[];
  rate?: number;
  stock: number;
  count?: number;
  discount?: number;
  discount_type?: string;
  price: number;
  options?: optionType[];
  active: boolean;
  created_at?: string;
  categories: { name: string };
}
export interface SliderComponentType {
  titleComponent?: string;
  Product?: typeProduct[];
  categories?: { name: string; id: number }[];
  search?: boolean;
  categoryId?: number;
}

export interface deleteProductCart {
  ID: string;
  name: string;
  userId: string;
  setCartData: Dispatch<SetStateAction<typeProduct[]>>;
}
