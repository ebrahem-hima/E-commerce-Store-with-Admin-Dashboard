import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const BankForm = () => {
  return (
    <>
      <form className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-2">
        <div className="flex flex-col">
          <Label htmlFor="cardNumber" className="mb-2 font-medium">
            Card Number
          </Label>
          <Input
            type="text"
            id="cardNumber"
            placeholder="1234 5678 9012 3456"
            className="border rounded px-3 py-2"
            name=""
          />
        </div>

        <div className="flex flex-col">
          <Label htmlFor="cardHolder" className="mb-2 font-medium">
            Card Holder Name
          </Label>
          <Input
            type="text"
            id="cardHolder"
            placeholder="John Doe"
            className="border rounded px-3 py-2"
            name=""
          />
        </div>

        <div className="flex flex-col">
          <Label htmlFor="expiry" className="mb-2 font-medium">
            Expiry Date
          </Label>
          <Input
            type="text"
            id="expiry"
            placeholder="MM/YY"
            className="border rounded px-3 py-2"
            name=""
          />
        </div>

        <div className="flex flex-col">
          <Label htmlFor="cvv" className="mb-2 font-medium">
            CVV / CVC
          </Label>
          <Input
            type="text"
            id="cvv"
            placeholder="123"
            className="border rounded px-3 py-2"
            name=""
          />
        </div>
      </form>
    </>
  );
};

export default BankForm;
