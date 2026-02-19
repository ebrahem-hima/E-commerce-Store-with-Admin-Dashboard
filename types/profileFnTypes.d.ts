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
}

export interface profileAndDisabled {
  profileData: myProfileType;
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
  setProfileData: Dispatch<SetStateAction<profileType>>;
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
  setProfileData: Dispatch<SetStateAction<profileType>>;
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
  oldAddress: AddressType;
  newAddress: AddressType;
  userId: string;
  setProfileData: Dispatch<SetStateAction<profileType>>;
  setChangeInput: Dispatch<SetStateAction<boolean>>;
}
