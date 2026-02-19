import { Dispatch, SetStateAction } from "react";
import { typeProduct } from "./productTypes";
import { profileType } from "./profileFnTypes";
import { typeGetCoupon } from "./typeAliases";

export interface ProductContextType {
  userId: string | null;

  profileData: profileType;
  setProfileData: Dispatch<SetStateAction<profileType>>;
  profileLoading: boolean;

  cartData: typeProduct[];
  setCartData: Dispatch<SetStateAction<typeProduct[]>>;

  getCoupon: typeGetCoupon | null;
  setGetCoupon: Dispatch<SetStateAction<typeGetCoupon | null>>;

  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;

  total: number;
  userCartLoading: boolean;
}
