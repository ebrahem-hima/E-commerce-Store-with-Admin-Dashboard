import { Dispatch, SetStateAction } from "react";
import { typeIsOpen, typeProduct, typeUserOrder } from "./productTypes";
import { profileType } from "./profileFnTypes";
import { typeGetCoupon } from "./typeAliases";

export interface ProductContextType {
  isOpen: typeIsOpen;
  setIsOpen: Dispatch<SetStateAction<typeIsOpen>>;

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

  getCoupon: typeGetCoupon | null;
  setGetCoupon: Dispatch<SetStateAction<typeGetCoupon | null>>;

  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;

  setUser: Dispatch<SetStateAction<string | null>>;

  total: number;
}
