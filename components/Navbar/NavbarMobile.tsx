"use client";

import { FormEvent, useRef, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import MobileMenuLinks from "./MobileMenuLinks";
import InputSearchComponent from "./components/InputSearchComponent";
import { useRouter } from "next/navigation";

export function NavbarMobile() {
  const [click, setClick] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { push } = useRouter();

  const handleSubmitSearch = (e: FormEvent) => {
    if (!inputRef.current?.value) return;
    e.preventDefault();
    push(`/search?query=${inputValue}`);
    setInputValue("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <Sheet>
      <SheetTrigger asChild className="hidden max-lg:block">
        <Button className="px-0" variant="outline">
          <IoMenu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-3">
        <SheetHeader className="flex items-center justify-between mt-3">
          <SheetTitle
            className={`${
              !click && "text-primary"
            } cursor-pointer hover:text-primary`}
            onClick={() => setClick(false)}
          >
            Menu
          </SheetTitle>
          <span>|</span>
          <SheetTitle
            className={`${
              click && "text-primary"
            } cursor-pointer hover:text-primary`}
            onClick={() => setClick(true)}
          >
            Search
          </SheetTitle>
        </SheetHeader>
        <MobileMenuLinks click={click} />
        <SheetFooter className="flex items-end">
          <InputSearchComponent
            inputRef={inputRef}
            setInputValue={setInputValue}
            handleSubmitSearch={handleSubmitSearch}
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default NavbarMobile;
