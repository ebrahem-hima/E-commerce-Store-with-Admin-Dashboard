import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dispatch, SetStateAction } from "react";

interface Props {
  checkOut: "bank" | "delivery";
  setCheckOut: Dispatch<SetStateAction<"bank" | "delivery">>;
}

const PaymentMethodSelector = ({ checkOut, setCheckOut }: Props) => {
  return (
    <form>
      <fieldset className="flex-between">
        <RadioGroup
          value={checkOut}
          onValueChange={(value) => setCheckOut(value as "bank" | "delivery")}
          className="flex flex-col gap-2"
        >
          <div className="flex items-center gap-3">
            <RadioGroupItem value="bank" id="rBank1" />
            <label htmlFor="rBank1">Bank</label>
          </div>

          <div className="flex items-center gap-3">
            <RadioGroupItem value="delivery" id="delivery" />
            <label htmlFor="delivery">Cash on delivery</label>
          </div>
        </RadioGroup>
      </fieldset>
    </form>
  );
};

export default PaymentMethodSelector;
