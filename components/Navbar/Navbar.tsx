"use client";

import React, { useState } from "react";
import { categoriesLinks, navbar } from "../../constant/filterNavbar";
import NavbarSearch from "./NavbarSearch";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";
import { IoPersonOutline } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useProductContext } from "../../context/productContext";

const Navbar = () => {
  const { push } = useRouter();
  const pathName = usePathname();
  console.log("pathName", pathName);
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
          <Link
            href={nav.link}
            key={nav.text}
            className={`font-poppins cursor-pointer font-normal text-[16px] leading-[24px] ${
              pathName === nav.link && "border-b border-primary"
            }`}
          >
            {nav.text}
          </Link>
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
        <ShopCart />
        <IoPersonOutline
          size={25}
          className="cursor-pointer"
          onClick={() => push(`/account`)}
        />
        <NavbarMobile />
      </div>
    </nav>
  );
};

export default Navbar;

export function NavbarMobile() {
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
            <div className="flex flex-col font-medium text-[18px] gap-1">
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

export function ShopCart() {
  const { cartData } = useProductContext();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <IoCartOutline size={25} className="cursor-pointer" />
      </SheetTrigger>
      <SheetContent isStrongOverlay>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 h-[450px] mt-3">
          {cartData.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[80px_1fr_auto] gap-3 border-t border-[#d4d3d3] pt-3"
            >
              <div className="relative">
                <Image
                  src={item.img}
                  alt={`img` + item.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-sm">
                <span className="font-medium line-clamp-2 break-all text-sm">
                  {item.name}
                </span>
                <span>
                  <span className="font-medium">Price:</span> ${item.price}{" "}
                  <span>x</span> {item.count || 1}
                </span>
                {/* Options */}
                <div className="flex flex-wrap gap-1 text-sm">
                  <div className="flex items-center gap-1">
                    <span className="font-medium">Color:</span>
                    <span>Red</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">Size:</span>
                    <span>M</span>
                  </div>
                </div>
              </div>
              <Trash2 />
            </div>
          ))}
        </div>
        <SheetFooter className="flex !flex-col gap-2 border-t border-[#77777754] pt-1">
          <div className="flex-between">
            <span className="font-poppins text-[18px]">Subtotal:</span>
            <span>$55,500</span>
          </div>
          <Button
            type="submit"
            className="bg-white text-primary hover:bg-[#e6e1e1] !mr-0"
          >
            View Cart
          </Button>
          <Button type="submit">Checkout</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
