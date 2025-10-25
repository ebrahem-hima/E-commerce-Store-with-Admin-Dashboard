import { Dispatch, SetStateAction } from "react";

// Start Profile Page
export interface profileType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export interface profileAndDisabled {
  profileData: profileType;
  setChangeInput: Dispatch<SetStateAction<boolean>>;
}

export interface myProfileType {
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
}

export interface refreshTypeFn {
  setProfileData: Dispatch<SetStateAction<profileType>>;
  originalProfile: React.MutableRefObject<myProfileType | null>;
}

export interface updateEmailType {
  isPasswordChanged: string | undefined;
  isEmailChange: boolean;
  setChangeInput: Dispatch<SetStateAction<boolean>>;
  userEmail: string;
}

export interface PasswordType {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface updatePasswordType {
  password: PasswordType;
  setPassword: Dispatch<SetStateAction<PasswordType>>;
  setChangeInput: Dispatch<SetStateAction<boolean>>;
}

export interface updateProfileType extends profileAndDisabled {
  userId: string;
}
// End Profile Page

// Address Page
export interface AddressType {
  address1: string;
  address2: string;
  country: string;
  state: string;
}

export interface updateAddressType {
  e: MouseEvent<HTMLButtonElement>;
  profileData: AddressType;
  originalAddress: React.MutableRefObject<AddressType | null>;
  userId: string;
  setIsProfileChange: Dispatch<
    SetStateAction<{ address: boolean; profile: boolean }>
  >;
  setChangeInput: Dispatch<SetStateAction<boolean>>;
}
