"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { typeIsOpen, typeProduct } from "../types/productTypes";
import { chooseComponentType, typeGetCoupon } from "../types/typeAliases";
import { supabase } from "@/supabase-client";
import { profileType } from "../types/profileFnTypes";
import useUserCart from "../components/FetchData/useUserCart";
import AuthFn from "../components/FetchData/authFn";
import UserOrdersFn from "../components/FetchData/userOrdersFn";
import { userOrdersType } from "../types/fetchType";

interface ProductContextType {
  isOpen: typeIsOpen;
  setIsOpen: React.Dispatch<React.SetStateAction<typeIsOpen>>;

  chooseComponent: chooseComponentType;
  setChooseComponent: Dispatch<SetStateAction<chooseComponentType>>;

  wishListStatus: boolean;
  setWishListStatus: Dispatch<SetStateAction<boolean>>;

  userId: string | null;
  setUserId: Dispatch<SetStateAction<string | null>>;

  profileData: profileType;
  setProfileData: Dispatch<SetStateAction<profileType>>;

  login: (id: string) => void;
  logout: () => void;

  isProfileChange: { address: boolean; profile: boolean };
  setIsProfileChange: Dispatch<
    SetStateAction<{ address: boolean; profile: boolean }>
  >;

  isCartDataUpdated: boolean;
  setIsCartDataUpdated: Dispatch<SetStateAction<boolean>>;

  cartData: typeProduct[];

  isUserOrderUpdated: boolean;
  setIsUserOrderUpdated: Dispatch<SetStateAction<boolean>>;

  userOrders: userOrdersType[];

  getCoupon: typeGetCoupon[];
  setGetCoupon: Dispatch<SetStateAction<typeGetCoupon[]>>;

  isCouponApplied: boolean;
  setIsCouponApplied: Dispatch<SetStateAction<boolean>>;
}
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Provider
export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<typeIsOpen>({
    filter: false,
    searchNavbar: false,
  });
  // to switch between profile, address, orders
  const [chooseComponent, setChooseComponent] =
    useState<chooseComponentType>("MyProfile");
  const [wishListStatus, setWishListStatus] = useState(false);

  // -------------- Start UserOrders --------------
  const [isUserOrderUpdated, setIsUserOrderUpdated] = useState(false);
  const { userOrders } = UserOrdersFn(isUserOrderUpdated);

  // -------------- End UserOrders --------------

  // -------------- Start CartShop --------------

  const [isCartDataUpdated, setIsCartDataUpdated] = useState(false);
  const { cartData } = useUserCart(isCartDataUpdated);

  // -------------- End CartShop --------------

  // -------------- Start UserId --------------
  const [userId, setUserId] = useState<string | null>(null);

  const { login, logout } = AuthFn({ userId, setUserId });
  // -------------- End UserId --------------

  // -------------- Start  Fetch User Profile --------------
  const saved =
    typeof window !== "undefined" ? localStorage.getItem("user_profile") : null;

  const getData = saved
    ? JSON.parse(saved)
    : {
        firstName: "",
        lastName: "",
        phone: "",
        address1: "",
        address2: "",
        state: "",
        country: "",
        email: "",
      };

  const [profileData, setProfileData] = useState<profileType>(getData);
  const [isProfileChange, setIsProfileChange] = useState({
    address: false,
    profile: false,
  });
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: accountData, error: accountError } = await supabase
          .from("user_profile")
          .select();
        if (accountError) throw accountError;

        const account = accountData?.[0] || {};

        const { data: userData, error: userError } =
          await supabase.auth.getUser();
        if (userError) throw userError;

        const email = userData?.user?.email || "";

        const profile = {
          id: account.id || "",
          firstName: account.first_name || "",
          lastName: account.last_name || "",
          phone: account.phone || "",
          address1: account.address1 || "",
          address2: account.address2 || "",
          state: account.state || "",
          country: account.country || "",
          email,
        };

        setProfileData(profile);

        localStorage.setItem("user_profile", JSON.stringify(profile));
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, [isProfileChange.address, isProfileChange.profile]);

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
    chooseComponent,
    setChooseComponent,
    userId,
    setUserId,
    profileData,
    setProfileData,
    login,
    logout,
    isProfileChange,
    setIsProfileChange,

    // to update cartData instantly
    isCartDataUpdated,
    setIsCartDataUpdated,
    cartData,

    // to update userOrder instantly
    isUserOrderUpdated,
    setIsUserOrderUpdated,

    userOrders,

    getCoupon,
    setGetCoupon,

    // to allow function to increase time_used by 1
    isCouponApplied,
    setIsCouponApplied,
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
