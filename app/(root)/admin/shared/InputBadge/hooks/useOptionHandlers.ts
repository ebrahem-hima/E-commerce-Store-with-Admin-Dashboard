import { optionType } from "@/types/productTypes";
import { optionStateType } from "@/types/type";
import { Dispatch, SetStateAction, FormEvent } from "react";

interface EditProps {
  setGetOptions: Dispatch<SetStateAction<optionType[]>>;
  setOptionState: Dispatch<SetStateAction<optionStateType>>;
}

interface AddOptionProps {
  setGetOptions: Dispatch<SetStateAction<optionType[]>>;
}

interface FormSubmitProps {
  setGetOptions: Dispatch<SetStateAction<optionType[]>>;
  setOptionState: Dispatch<SetStateAction<optionStateType>>;
}

export const useOptionHandlers = ({
  setGetOptions,
  setOptionState,
}: EditProps & AddOptionProps & FormSubmitProps) => {
  // ------- 1) Edit Option Title -------
  const handleEdit = (input: string, newTitle: string) => {
    setGetOptions((prev) =>
      prev.map((item) =>
        item.optionTitle === input
          ? { optionTitle: newTitle, values: item.values }
          : item
      )
    );

    setOptionState((prev) => ({
      ...prev,
      isEditing: false,
    }));
  };

  // ------- 2) Add New Badge Value -------
  const handleAddOption = (index: number, e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const badgeValue = (form[0] as HTMLInputElement).value.trim();

    if (!badgeValue) return;

    setGetOptions((prev) => {
      const exists = prev.some(
        (item) => item.optionTitle === prev[index].optionTitle
      );

      if (exists) {
        return prev.map((item) =>
          item.optionTitle === prev[index].optionTitle
            ? { ...item, values: [...(item.values || []), badgeValue] }
            : item
        );
      }

      return [
        ...prev,
        { optionTitle: prev[index].optionTitle, values: [badgeValue] },
      ];
    });
  };

  // ------- 3) Handle Form Submit -------
  const handleFormSubmit = (
    e: FormEvent<HTMLFormElement>,
    input: string,
    index: number,
    isEditing: boolean
  ) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const value = (form[0] as HTMLInputElement).value.trim();

    if (isEditing) {
      handleEdit(input, value);
    } else {
      handleAddOption(index, e);
    }

    (form[0] as HTMLInputElement).value = "";
  };

  return {
    // handleEdit,
    // handleAddOption,
    handleFormSubmit,
  };
};
