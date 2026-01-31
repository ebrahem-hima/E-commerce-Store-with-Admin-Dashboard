"use client";

import { useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { updateAddress } from "@/lib/utilsProfile";
import { AddressType } from "@/types/profileFnTypes";
import { useProductContext } from "@/context/productContext";
import { createClient } from "@/app/utils/supabase/client";

const Page = () => {
  const {
    profileData,
    setProfileData,
    userId,
    isProfileChange,
    setIsProfileChange,
  } = useProductContext();

  const originalAddress = useRef<AddressType | null>(null);

  const countries = ["Egypt", "Saudi Arabia", "UAE", "Kuwait"];
  const states = ["Cairo", "Alexandria", "Giza", "Aswan"];
  const [changeInput, setChangeInput] = useState(true);
  const { push } = useRouter();
  useEffect(() => {
    const supabase = createClient();

    const getAddress = async () => {
      const { data, error } = await supabase
        .from("user_profile")
        .select()
        .eq("id", userId)
        .single();
      if (error) {
        console.log("error", error);
        return false;
      }
      originalAddress.current = {
        address1: data.address1,
        address2: data.address2,
        state: data.state,
        country: data.country,
      };
    };
    getAddress();
  }, [isProfileChange, userId]);

  if (!userId) return false;
  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Address 1 */}
      <div className="flex flex-col">
        <Label htmlFor="address1" className="mb-1 text-sm font-medium">
          Address
        </Label>
        <Input
          id="address1"
          type="text"
          name="address1"
          value={profileData.address1}
          onChange={(e) => {
            setProfileData({ ...profileData, [e.target.name]: e.target.value });
            setChangeInput(false);
          }}
          placeholder="Address"
          className="border px-3 py-2 rounded"
        />
      </div>

      {/* Address 2 */}
      <div className="flex flex-col">
        <Label htmlFor="address2" className="mb-1 text-sm font-medium">
          Address 2
        </Label>
        <Input
          id="address2"
          type="text"
          name="address2"
          value={profileData.address2}
          onChange={(e) => {
            setProfileData({ ...profileData, [e.target.name]: e.target.value });
            setChangeInput(false);
          }}
          placeholder="Address 2"
          className="border px-3 py-2 rounded"
        />
      </div>

      {/* Country */}
      <div className="flex flex-col">
        <Label htmlFor="country" className="mb-1 text-sm font-medium">
          Country
        </Label>
        <select
          id="country"
          name="country"
          value={profileData.country}
          onChange={(e) => {
            setProfileData({ ...profileData, [e.target.name]: e.target.value });
            setChangeInput(false);
          }}
          className="border px-3 py-1 rounded"
        >
          <option value="">Select Country</option>
          {countries.map((country, i) => (
            <option key={i} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {/* State */}
      <div className="flex flex-col">
        <Label htmlFor="state" className="mb-1 text-sm font-medium">
          State / Province
        </Label>
        <select
          id="state"
          name="state"
          value={profileData.state}
          onChange={(e) => {
            setProfileData({ ...profileData, [e.target.name]: e.target.value });
            setChangeInput(false);
          }}
          className="border px-3 py-1 rounded"
        >
          <option value="">Select State</option>
          {states.map((state, i) => (
            <option key={i} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-2 justify-end col-start-2">
        <Button
          onClick={(e) => {
            e.preventDefault();
            push(`/`);
          }}
          className="hover:bg-[#bdbbbb93] w-fit px-6 py-3 rounded-sm text-black bg-white"
        >
          Cancel
        </Button>
        <Button
          onClick={(e) =>
            updateAddress({
              e,
              profileData,
              originalAddress,
              userId,
              setIsProfileChange,
              setChangeInput,
            })
          }
          disabled={changeInput}
          className="w-fit px-6 py-3 rounded-sm"
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default Page;
