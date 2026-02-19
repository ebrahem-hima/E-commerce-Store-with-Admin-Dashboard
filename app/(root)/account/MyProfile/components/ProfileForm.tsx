"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction, ChangeEvent } from "react";
import { myProfileType } from "@/types/profileFnTypes";

interface ProfileFormProps {
  profile: myProfileType;
  setProfile: Dispatch<SetStateAction<myProfileType>>;
  setChangeInput: Dispatch<SetStateAction<boolean>>;
}

const ProfileForm = ({
  profile,
  setProfile,
  setChangeInput,
}: ProfileFormProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
    setChangeInput(false);
  };

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* First Name */}
      <div className="flex flex-col">
        <Label htmlFor="firstName" className="mb-1 text-sm font-medium">
          First Name
        </Label>
        <Input
          id="firstName"
          name="firstName"
          type="text"
          value={profile.firstName || ""}
          onChange={handleChange}
          placeholder="First Name"
          className="border px-3 py-2 rounded"
        />
      </div>

      {/* Last Name */}
      <div className="flex flex-col">
        <Label htmlFor="lastName" className="mb-1 text-sm font-medium">
          Last Name
        </Label>
        <Input
          id="lastName"
          name="lastName"
          type="text"
          value={profile.lastName || ""}
          onChange={handleChange}
          placeholder="Last Name"
          className="border px-3 py-2 rounded"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col">
        <Label htmlFor="email" className="mb-1 text-sm font-medium">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={profile.email || ""}
          onChange={handleChange}
          placeholder="Email"
          className="border px-3 py-2 rounded"
        />
      </div>

      {/* Phone */}
      <div className="flex flex-col">
        <Label htmlFor="phone" className="mb-1 text-sm font-medium">
          Phone
        </Label>
        <Input
          id="phone"
          name="phone"
          type="number"
          value={profile.phone || ""}
          onChange={handleChange}
          placeholder="Phone"
          className="border px-3 py-2 rounded"
        />
      </div>
    </form>
  );
};

export default ProfileForm;
