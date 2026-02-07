"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { Dispatch, FormEvent, RefObject, SetStateAction } from "react";
import { IoSearchOutline } from "react-icons/io5";

interface InputSearchComponentProps {
  setInputValue: (value: string) => void;
  inputRef: RefObject<HTMLInputElement | null>;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  handleSubmitSearch: (e: FormEvent) => void;
}

const InputSearchComponent = ({
  setInputValue,
  inputRef,
  setIsOpen,
  handleSubmitSearch,
}: InputSearchComponentProps) => {
  return (
    <form
      className="relative w-full flex items-center"
      onSubmit={handleSubmitSearch}
      onBlur={() => setIsOpen?.(true)}
      onFocus={() => setIsOpen?.(false)}
    >
      <Input
        ref={inputRef}
        type="text"
        placeholder="What are you looking for ?"
        onChange={(e) => {
          setInputValue(e.target.value);
          setIsOpen?.(false);
        }}
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
