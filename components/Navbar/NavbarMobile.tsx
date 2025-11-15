"use client";

import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import MobileMenuLinks from "./MobileMenuLinks";

export function NavbarMobile() {
  const [click, setClick] = useState(false);

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
          <Input type="text" placeholder="What are you looking for ?" />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default NavbarMobile;
