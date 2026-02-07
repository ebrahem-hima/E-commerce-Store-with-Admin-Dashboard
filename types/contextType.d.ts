import { Dispatch, SetStateAction } from "react";
import { typeIsOpen, typeProduct, TypeUserOrder } from "./productTypes";
import { profileType } from "./profileFnTypes";
import { typeGetCoupon } from "./typeAliases";

export interface ProductContextType {
  isOpen: typeIsOpen;
  setIsOpen: Dispatch<SetStateAction<typeIsOpen>>;

  userId: string | null;
  // setUserId: Dispatch<SetStateAction<User | null>>;

  profileData: profileType;
  setProfileData: Dispatch<SetStateAction<profileType>>;

  isProfileChange: { address: boolean; profile: boolean };
  setIsProfileChange: Dispatch<
    SetStateAction<{ address: boolean; profile: boolean }>
  >;

  cartData: typeProduct[];
  setCartData: Dispatch<SetStateAction<typeProduct[]>>;

  isUserOrderUpdated: boolean;
  setIsUserOrderUpdated: Dispatch<SetStateAction<boolean>>;

  userOrders: TypeUserOrder[];

  getCoupon: typeGetCoupon | null;
  setGetCoupon: Dispatch<SetStateAction<typeGetCoupon | null>>;

  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;

  total: number;
  userCartLoading: boolean;
}
