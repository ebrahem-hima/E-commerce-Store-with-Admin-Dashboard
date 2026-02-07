"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { IoClose } from "react-icons/io5";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dispatch, SetStateAction, useState } from "react";
import { Label } from "@/components/ui/label";
import { categorySelectType } from "@/types/adminType";

type categoryType = {
  name: string | undefined;
  id: number | undefined;
};

interface Props {
  options: categoryType[];
  selectedCategory: categoryType[];
  setSelectedCategory: Dispatch<SetStateAction<categorySelectType>>;
}

export function SelectOptions({
  options,
  setSelectedCategory,
  selectedCategory,
}: Props) {
  const [open, setOpen] = useState(false);

  const handleDuplicate = (
    name: string | undefined,
    id: number | undefined
  ) => {
    setSelectedCategory((prev) =>
      prev.categorySelected.some((cat) => cat.id === id)
        ? {
            categoryDeleted: [...prev.categoryDeleted, { name, id }],
            categorySelected: prev.categorySelected.filter(
              (cat) => cat.name !== name
            ),
          }
        : {
            categoryDeleted: prev.categoryDeleted.filter(
              (cat) => cat.name !== name
            ),
            categorySelected: [...prev.categorySelected, { name, id }],
          }
    );
  };
  return (
    <div className="w-full">
      <Label>Category</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="h-8 px-3 w-full text-[#777] hover:text-[#777] border border-[#646363a4] justify-between"
          >
            Select category...
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        {/* Set PopoverContent width to match the button (PopoverTrigger) */}
        <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((category) => (
                <CommandItem
                  key={category.id}
                  value={category.name}
                  onSelect={() => {
                    setOpen(false);
                    handleDuplicate(category.name, category.id);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedCategory.some((cat) => cat.id === category.id)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {category.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
        <div className="flex flex-wrap gap-2 mt-3">
          {selectedCategory.map((category) => (
            <div
              onClick={() =>
                setSelectedCategory((prev) => ({
                  categoryDeleted: [...prev.categoryDeleted, category],
                  categorySelected: prev.categorySelected.filter(
                    (item) => item.name !== category.name
                  ),
                }))
              }
              key={category.id}
              className="flex items-center cursor-pointer"
            >
              <span>{category.name}</span>
              <IoClose size={18} className="ml-2 cursor-pointer" />
            </div>
          ))}
        </div>
      </Popover>
    </div>
  );
}
