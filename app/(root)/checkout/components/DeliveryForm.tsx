import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProductContext } from "@/context/productContext";
import { FormSkeleton } from "./FormSkeleton";

const DeliveryForm = () => {
  const { profileData, setProfileData, profileLoading } = useProductContext();

  const countries = ["Egypt", "Saudi Arabia", "UAE", "Kuwait"];
  const states = ["Cairo", "Alexandria", "Giza", "Aswan"];

  if (profileLoading) return <FormSkeleton />;
  return (
    <div>
      {/* Inputs */}
      <form className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Email */}
        <div className="flex flex-col gap-2">
          <Label className="text-black" htmlFor="email">
            Email
          </Label>
          <Input
            onChange={(e) => {
              setProfileData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }));
            }}
            value={profileData.email}
            id="email"
            name="email"
            placeholder="Email"
          />
        </div>

        {/* First Name */}
        <div className="flex flex-col gap-2">
          <Label className="text-black" htmlFor="first">
            First Name
          </Label>
          <Input
            onChange={(e) => {
              setProfileData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }));
            }}
            value={profileData.firstName}
            id="first"
            name="firstName"
            placeholder="First Name"
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-2">
          <Label className="text-black" htmlFor="last">
            Last Name
          </Label>
          <Input
            onChange={(e) => {
              setProfileData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }));
            }}
            value={profileData.lastName}
            id="last"
            name="lastName"
            placeholder="Last Name"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-2">
          <Label className="text-black" htmlFor="phone">
            Phone
          </Label>
          <Input
            onChange={(e) => {
              setProfileData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }));
            }}
            value={profileData.phone}
            id="phone"
            name="phone"
            placeholder="Phone"
          />
        </div>

        {/* Address 1 */}
        <div className="flex flex-col gap-2">
          <Label className="text-black" htmlFor="address1">
            Address 1
          </Label>
          <Input
            onChange={(e) => {
              setProfileData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }));
            }}
            value={profileData.address1}
            id="address1"
            name="address1"
            placeholder="Address 1"
          />
        </div>

        {/* Address 2 */}
        <div className="flex flex-col gap-2">
          <Label className="text-black" htmlFor="address2">
            Address 2 (optional)
          </Label>
          <Input
            onChange={(e) => {
              setProfileData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }));
            }}
            value={profileData.address2}
            id="address2"
            name="address2"
            placeholder="Address 2"
          />
        </div>

        {/* Country */}
        <div className="flex flex-col gap-2">
          <Label className="text-black" htmlFor="country">
            Country
          </Label>
          <Select
            onValueChange={(value) => {
              setProfileData((prev) => ({
                ...prev,
                country: value,
              }));
            }}
            value={profileData.country}
          >
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
          <Select
            onValueChange={(value) => {
              setProfileData((prev) => ({
                ...prev,
                state: value,
              }));
            }}
            value={profileData.state}
          >
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

export default DeliveryForm;
