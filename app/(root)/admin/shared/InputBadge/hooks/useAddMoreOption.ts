import { optionType } from "@/types/productTypes";
import { optionStateType } from "@/types/type";
import { toast } from "sonner";
import { FormEvent, RefObject, Dispatch, SetStateAction } from "react";

interface AddMoreProps {
  InputValue: RefObject<HTMLInputElement | null>;
  setGetOptions: Dispatch<SetStateAction<optionType[]>>;
  setOptionState: Dispatch<SetStateAction<optionStateType>>;
  getOptions: optionType[];
}

export const useAddMoreOption = ({
  InputValue,
  setGetOptions,
  setOptionState,
  getOptions,
}: AddMoreProps) => {
  const handleAddMore = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = InputValue.current;
    if (!input || input.value.trim() === "") {
      return toast.info("Please enter option name");
    }

    const exists = getOptions.some((item) => item.optionTitle === input.value);

    if (exists) {
      return toast.info("This option already exists");
    }

    setGetOptions((prev) => [
      ...prev,
      { optionTitle: input.value, values: [] },
    ]);

    setOptionState((prev) => ({ ...prev, isAdding: false }));
  };

  return { handleAddMore };
};
