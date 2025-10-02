import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Address = () => {
  const [formData, setFormData] = useState({
    address1: "",
    address2: "",
    country: "",
    state: "",
  });

  const countries = ["Egypt", "Saudi Arabia", "UAE", "Kuwait"];
  const states = ["Cairo", "Alexandria", "Giza", "Aswan"];

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
          value={formData.address1}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
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
          value={formData.address2}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
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
          value={formData.country}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
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
          value={formData.state}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
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
        <Button className="hover:bg-[#bdbbbb93] w-fit px-6 py-3 rounded-[4px] text-black bg-white">
          Cancel
        </Button>
        <Button className="w-fit px-6 py-3 rounded-[4px]">Save Changes</Button>
      </div>
    </form>
  );
};

export default Address;
