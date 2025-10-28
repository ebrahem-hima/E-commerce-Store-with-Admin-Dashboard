"use client";

import React, { useState } from "react";
import { categoriesLinks, navbar } from "../../constant/filterNavbar";
import { IoMenu } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function NavbarMobile() {
  const [click, setClick] = useState(false);
  return (
    <Sheet>
      <SheetTrigger asChild className="hidden max-md:block">
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
        <div className="flex flex-col">
          {click ? (
            <div className="overflow-y-auto h-[500px]">
              {categoriesLinks.map((category) => (
                <div key={category.name}>
                  <ul>
                    <SheetClose asChild>
                      <Link
                        href={`/search?query=${category.value}`}
                        className="font-bold cursor-pointer hover:opacity-75"
                      >
                        {category.name}
                      </Link>
                    </SheetClose>
                    <li className="flex flex-col">
                      {category.values.map((value) => (
                        <SheetClose asChild key={value.value}>
                          <Link
                            href={{
                              pathname: "/search",
                              query: {
                                query: category.value,
                                category: value.value,
                              },
                            }}
                            className="cursor-pointer hover:opacity-75"
                            key={value.name}
                          >
                            {value.name}
                          </Link>
                        </SheetClose>
                      ))}
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col font-medium text-[17px] gap-1">
              {navbar.map((nav) => (
                <SheetClose asChild key={nav.text}>
                  <Link
                    className="action:ml-5 hover:ml-5 duration-300"
                    href={nav.link}
                  >
                    {nav.text}
                  </Link>
                </SheetClose>
              ))}
            </div>
          )}
        </div>
        <SheetFooter className="flex items-end">
          <Input type="text" placeholder="What are you looking for ?" />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default NavbarMobile;
