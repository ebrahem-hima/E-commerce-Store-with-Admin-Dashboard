"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import GetProductsByName from "../Hooks/getProductsByName";
import NavbarSearchContent from "./NavbarSearchContent";
import InputSearchComponent from "../components/InputSearchComponent";

const NavbarSearch = () => {
  const { push } = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmitSearch = (e: FormEvent) => {
    if (!inputRef.current?.value) return;
    e.preventDefault();
    push(`/search?query=${inputValue}`);
    setInputValue("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const [inputValue, setInputValue] = useState("");

  const { Loading, productSearch } = GetProductsByName({ inputValue });
  return (
    <div className="relative w-112.5 max-lg:hidden flex items-center">
      <InputSearchComponent
        inputRef={inputRef}
        setInputValue={setInputValue}
        setIsOpen={setIsOpen}
        handleSubmitSearch={handleSubmitSearch}
      />
      {/* product search */}
      {inputValue !== "" && (
        <NavbarSearchContent
          setIsOpen={setIsOpen}
          divRef={divRef}
          isOpen={isOpen}
          Loading={Loading}
          productSearch={productSearch}
        />
      )}
    </div>
  );
};

export default NavbarSearch;
