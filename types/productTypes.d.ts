import { Dispatch, SetStateAction } from "react";

export type optionType = { optionTitle: string; values?: string[] };

export interface CategoryType {
  id: number;
  name?: string;
}

export interface DB_WishList {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
  products: typeProduct;
}
export interface useCartType {
  id: string;
  user_id: string;
  product_id: string;
  quantity: string;
  products: typeProduct;
}

export interface typeProduct {
  id: string;
  name: string;
  img: string;
  user_id?: string;
  description: string;
  imgGallery: string[] | undefined;
  rate?: number;
  stock: number;
  category_id: string;
  discount: number | undefined;
  discount_type: string | undefined;
  category_id: number;
  quantity?: number;
  price: number;
  options: optionType[] | undefined;
  active: boolean;
  created_at?: string | undefined;
  search_text?: string | undefined;
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
  categoryId?: number;
  sliderType?: "category" | "product" | "search";
}

export interface deleteProductCart {
  ID: string;
  name: string;
  userId: string;
  setCartData: Dispatch<SetStateAction<typeProduct[]>>;
}

export type typeCount = { quantity: number; id: string }[];
