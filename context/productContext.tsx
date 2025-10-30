"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { typeIsOpen, typeProduct, typeUserOrder } from "../types/productTypes";
import { typeGetCoupon } from "../types/typeAliases";
import { profileType } from "../types/profileFnTypes";
import useUserCart from "../components/FetchData/useUserCart";
import AuthFn from "../components/FetchData/authFn";
import UserOrdersFn from "../components/FetchData/userOrdersFn";
import GetProfile from "../components/FetchData/getProfile";

interface ProductContextType {
  isOpen: typeIsOpen;
  setIsOpen: React.Dispatch<React.SetStateAction<typeIsOpen>>;

  wishListStatus: boolean;
  setWishListStatus: Dispatch<SetStateAction<boolean>>;

  userId: string | null;

  profileData: profileType;
  setProfileData: Dispatch<SetStateAction<profileType>>;

  isProfileChange: { address: boolean; profile: boolean };
  setIsProfileChange: Dispatch<
    SetStateAction<{ address: boolean; profile: boolean }>
  >;

  isCartDataUpdated: boolean;
  setIsCartDataUpdated: Dispatch<SetStateAction<boolean>>;

  cartData: typeProduct[];
  setCartData: Dispatch<SetStateAction<typeProduct[]>>;

  isUserOrderUpdated: boolean;
  setIsUserOrderUpdated: Dispatch<SetStateAction<boolean>>;

  userOrders: typeUserOrder[];

  getCoupon: typeGetCoupon[];
  setGetCoupon: Dispatch<SetStateAction<typeGetCoupon[]>>;

  isCouponApplied: boolean;
  setIsCouponApplied: Dispatch<SetStateAction<boolean>>;

  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;

  setUser: Dispatch<SetStateAction<string | null>>;

  total: number;
  Loading: boolean;
}
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Provider
export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<typeIsOpen>({
    filter: false,
    searchNavbar: false,
  });
  const [wishListStatus, setWishListStatus] = useState(false);

  // -------------- Start UserId --------------

  const [isAuth, setIsAuth] = useState(false);
  const { user: userId, setUser } = AuthFn({ isAuth });
  // -------------- End UserId --------------

  // -------------- Start UserOrders --------------
  const [isUserOrderUpdated, setIsUserOrderUpdated] = useState(false);
  const { userOrders } = UserOrdersFn(isUserOrderUpdated);

  // -------------- End UserOrders --------------

  // -------------- Start CartShop --------------

  const [isCartDataUpdated, setIsCartDataUpdated] = useState(false);
  const { cartData, setCartData, total, Loading } = useUserCart({
    // userId: userId || "",
    isAuth,
    isCartDataUpdated,
  });

  // -------------- End CartShop --------------

  // -------------- Start  Fetch User Profile --------------

  const [isProfileChange, setIsProfileChange] = useState({
    address: false,
    profile: false,
  });

  const { profileData, setProfileData } = GetProfile({
    isProfileChange,
    isAuth,
  });

  // -------------- End Fetch User Profile --------------

  // -------------- Start Coupon --------------
  const [getCoupon, setGetCoupon] = useState<typeGetCoupon[]>([]);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  // -------------- End Coupon --------------

  const values = {
    isOpen,
    setIsOpen,
    wishListStatus,
    setWishListStatus,
    userId,
    setUser,
    profileData,
    setProfileData,
    isProfileChange,
    setIsProfileChange,

    // to update cartData instantly
    isCartDataUpdated,
    setIsCartDataUpdated,

    cartData,
    setCartData,

    // to update userOrder instantly
    isUserOrderUpdated,
    setIsUserOrderUpdated,

    userOrders,

    getCoupon,
    setGetCoupon,

    // to allow function to increase time_used by 1
    isCouponApplied,
    setIsCouponApplied,

    isAuth,
    setIsAuth,

    total,
    Loading,
  };
  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
