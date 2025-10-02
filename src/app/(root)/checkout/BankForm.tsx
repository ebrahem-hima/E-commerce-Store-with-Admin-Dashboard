import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

const BankForm = () => {
  const countries = ["Egypt", "USA", "France", "Germany"];
  const states = ["Cairo", "Alexandria", "Giza", "Luxor"];
  return (
    <div>
      {/* Inputs */}
      <form className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Email */}
        <div className="flex flex-col gap-2">
          <Label className="text-black" htmlFor="email">
            Email
          </Label>
          <Input id="email" name="email" placeholder="Email" />
        </div>

        {/* First Name */}
        <div className="flex flex-col gap-2">
          <Label className="text-black" htmlFor="first">
            First Name
          </Label>
          <Input id="first" name="first" placeholder="First Name" />
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-2">
          <Label className="text-black" htmlFor="last">
            Last Name
          </Label>
          <Input id="last" name="last" placeholder="Last Name" />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-2">
          <Label className="text-black" htmlFor="phone">
            Phone
          </Label>
          <Input id="phone" name="phone" placeholder="Phone" />
        </div>

        {/* Address 1 */}
        <div className="flex flex-col gap-2">
          <Label className="text-black" htmlFor="address1">
            Address 1
          </Label>
          <Input id="address1" name="address1" placeholder="Address 1" />
        </div>

        {/* Address 2 */}
        <div className="flex flex-col gap-2">
          <Label className="text-black" htmlFor="address2">
            Address 2
          </Label>
          <Input id="address2" name="address2" placeholder="Address 2" />
        </div>

        {/* Country */}
        <div className="flex flex-col gap-2">
          <Label className="text-black" htmlFor="country">
            Country
          </Label>
          <Select>
            <SelectTrigger
              id="country"
              className="w-full border border-[#646363a4] rounded-md"
            >
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* State */}
        <div className="flex flex-col gap-2">
          <Label className="text-black" htmlFor="state">
            State
          </Label>
          <Select>
            <SelectTrigger
              id="state"
              className="w-full border border-[#646363a4] rounded-md"
            >
              <SelectValue placeholder="State" />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </form>
    </div>
  );
};

export default BankForm;
