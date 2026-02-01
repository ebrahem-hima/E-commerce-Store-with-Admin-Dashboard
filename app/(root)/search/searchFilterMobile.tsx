"use client";

import FilterComponent from "./filterComponent";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { productOptionsType } from "@/types/type";
import { cn } from "@/lib/utils";
import { useState } from "react";

const SearchFilterMobile = ({ filter }: { filter: productOptionsType[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger
        className={cn(
          // to get styles of button
          buttonVariants({ variant: "default" }),
          "lg:hidden fixed z-50 bottom-3 left-1/2 transform -translate-x-1/2", // التنسيقات الإضافية
        )}
      >
        Open Filter
      </SheetTrigger>
      {/*  */}
      <SheetContent className="flex flex-col gap-3">
        <SheetHeader>
          <VisuallyHidden>
            <SheetTitle>Filter Options</SheetTitle>
          </VisuallyHidden>
        </SheetHeader>

        <div className="flex flex-col">
          <FilterComponent setIsOpen={setIsOpen} filter={filter} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SearchFilterMobile;
