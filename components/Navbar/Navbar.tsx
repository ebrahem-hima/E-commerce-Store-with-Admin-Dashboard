"use client";

import React, { useState } from "react";
import { categoriesLinks, navbar } from "../../constant/filterNavbar";
import NavbarSearch from "./NavbarSearch";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { IoPersonOutline } from "react-icons/io5";
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
import Link from "next/link";

const Navbar = () => {
  const [getLink, setGetLink] = useState("Home");
  const { push } = useRouter();
  return (
    <nav className="fixed flex-between left-0 py-3 px-10 bg-[#F5F5F5] w-full border-b border-b-[#00000017] z-50 max-md:px-1 max-sm:px-0">
      <Link
        href={`/`}
        className="font-bold font-sans text-[20px] tracking-[0.03em]"
      >
        Exclusive
      </Link>
      {/* Links */}
      <div className="flex gap-2 max-md:hidden">
        {navbar.map((nav) => (
          <span
            key={nav.text}
            className={`font-poppins cursor-pointer font-normal text-[16px] leading-[24px] ${
              getLink === nav.text && "border-b border-primary"
            }`}
            onClick={() => setGetLink(nav.text)}
          >
            {nav.text}
          </span>
        ))}
      </div>
      {/* Input Search */}
      <NavbarSearch />
      {/* Icons */}
      <div className="flex items-center gap-2">
        <IoIosHeartEmpty
          size={25}
          className="cursor-pointer"
          onClick={() => push(`/wishlist`)}
        />
        <IoCartOutline
          size={25}
          className="cursor-pointer"
          onClick={() => {}}
        />
        <IoPersonOutline
          size={25}
          className="cursor-pointer"
          onClick={() => push(`/account`)}
        />
        <SheetDemo />
      </div>
    </nav>
  );
};

export default Navbar;

export function SheetDemo() {
  const [click, setClick] = useState(false);
  return (
    <Sheet>
      <SheetTrigger asChild className="hidden max-md:block">
        <Button variant="outline">
          <IoMenu onClick={() => {}} />
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
                    <span className="font-bold cursor-pointer hover:opacity-75">
                      {category.name}
                    </span>
                    <li className="flex flex-col">
                      {category.values.map((value) => (
                        <span
                          className="cursor-pointer hover:opacity-75"
                          key={value.name}
                        >
                          {value.name}
                        </span>
                      ))}
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col font-bold text-[18px] gap-1">
              {navbar.map((nav) => (
                <Link
                  className="hover:ml-5 duration-300"
                  key={nav.text}
                  href={nav.link}
                >
                  {nav.text}
                </Link>
              ))}
            </div>
          )}
        </div>
        <SheetFooter className="flex items-end">
          <Input
            type="text"
            className=""
            placeholder="What are you looking for ?"
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
