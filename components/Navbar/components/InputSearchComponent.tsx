"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent, RefObject } from "react";
import { IoSearchOutline } from "react-icons/io5";

interface InputSearchComponentProps {
  setInputValue: (value: string) => void;
  inputRef: RefObject<HTMLInputElement | null>;
  handleSubmitSearch: (e: FormEvent) => void;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const InputSearchComponent = ({
  setInputValue,
  inputRef,
  handleSubmitSearch,
  setIsOpen,
}: InputSearchComponentProps) => {
  return (
    <form
      className="relative w-full flex items-center"
      onSubmit={handleSubmitSearch}
    >
      <Input
        ref={inputRef}
        type="text"
        placeholder="What are you looking for ?"
        onChange={(e) => {
          setInputValue(e.target.value);
          setIsOpen?.(true);
        }}
        onMouseEnter={() => setIsOpen?.(true)}
      />
      <Button
        size="sm"
        variant="link"
        type="submit"
        className="absolute right-0 text-[#777]"
      >
        <IoSearchOutline className="w-5! h-5!" />
      </Button>
    </form>
  );
};

export default InputSearchComponent;
