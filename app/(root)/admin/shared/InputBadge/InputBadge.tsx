"use client";

import Badge from "@/components/shared/Badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { optionType } from "@/types/productTypes";
import { Edit, Trash2 } from "lucide-react";
import { IoClose } from "react-icons/io5";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { optionStateType } from "@/types/type";
import { useOptionHandlers } from "./hooks/useOptionHandlers";
import { useAddMoreOption } from "./hooks/useAddMoreOption";

interface Props {
  setGetOptions: Dispatch<SetStateAction<optionType[]>>;
  getOptions: optionType[];
}

const InputBadge = ({ setGetOptions, getOptions }: Props) => {
  const [optionState, setOptionState] = useState<optionStateType>({
    isAdding: false,
    isEditing: false,
    editingTitle: "",
  });

  const InputValue = useRef<HTMLInputElement>(null);
  const badgeRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { handleFormSubmit } = useOptionHandlers({
    setGetOptions,
    setOptionState,
  });
  const { handleAddMore } = useAddMoreOption({
    InputValue,
    setGetOptions,
    setOptionState,
    getOptions,
  });
  useEffect(() => {
    if (optionState.isAdding && InputValue.current) {
      InputValue.current.focus();
    }
  }, [optionState.isAdding]);
  const DeleteOption = (ID: number) => {
    setGetOptions((prev) => prev.filter((_, index) => index !== ID - 1));
  };
  return (
    <>
      <div className="flex flex-col gap-4">
        {getOptions.map((input, index) => (
          <div key={index}>
            <div className="flex-between mb-3">
              <Label>
                {input.optionTitle === optionState.editingTitle &&
                optionState.isEditing
                  ? `Edit Option Name`
                  : `${input.optionTitle}`}
              </Label>
              <div className="flex items-center gap-2">
                {input.optionTitle === optionState.editingTitle &&
                optionState.isEditing ? (
                  <IoClose
                    className="cursor-pointer"
                    onClick={() =>
                      setOptionState((prev) => ({
                        ...prev,
                        isEditing: false,
                      }))
                    }
                    size={20}
                  />
                ) : (
                  <>
                    <Edit
                      className="cursor-pointer"
                      size={20}
                      onClick={() => {
                        setOptionState((prev) => ({
                          ...prev,
                          isEditing: true,
                          editingTitle: input.optionTitle,
                        }));
                      }}
                    />
                    <Trash2
                      className="cursor-pointer"
                      size={20}
                      onClick={() => DeleteOption(index + 1)}
                    />
                  </>
                )}
              </div>
            </div>

            <form
              onSubmit={(e) => {
                handleFormSubmit(
                  e,
                  input.optionTitle,
                  index,
                  optionState.isEditing
                );
              }}
            >
              <Input
                ref={(el) => {
                  badgeRefs.current[index] = el;
                }}
                placeholder={input.optionTitle}
              />
            </form>
            <div className="flex items-center gap-2 mt-2">
              {(
                getOptions.find(
                  (item) => item.optionTitle === input.optionTitle
                )?.values ?? []
              ).map((badge, idx) => (
                <div
                  key={idx}
                  onClick={() =>
                    setGetOptions((prev) =>
                      prev.map((item) =>
                        item.optionTitle === input.optionTitle
                          ? {
                              ...item,
                              values: item.values?.filter(
                                (name) => name !== badge
                              ),
                            }
                          : item
                      )
                    )
                  }
                >
                  <Badge text={badge} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {optionState.isAdding && (
        <form onSubmit={(e) => handleAddMore(e)}>
          <div className="flex-between mb-2">
            <Label>Option Name</Label>
            <IoClose
              className="cursor-pointer"
              onClick={() =>
                setOptionState((prev) => ({
                  ...prev,
                  isAdding: false,
                }))
              }
              size={20}
            />
          </div>
          <Input ref={InputValue} placeholder="Enter Option Name" />
          <Button type="submit" variant="default" size="sm" className="mt-2">
            Apply Option
          </Button>
        </form>
      )}

      <span
        onClick={() => {
          setOptionState((prev) => ({
            ...prev,
            isAdding: true,
            isEditing: false,
          }));
        }}
        className="text-sm cursor-pointer text-blue font-inter font-medium w-fit"
      >
        Add option
      </span>
    </>
  );
};

export default InputBadge;
