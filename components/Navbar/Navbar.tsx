"use client";

import React, { useState } from "react";
import { navbar } from "../../constant/filterNavbar";
import NavbarSearch from "./NavbarSearch";
import { IoIosHeartEmpty } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
import { IoPersonOutline } from "react-icons/io5";
import Link from "next/link";

import { supabase } from "@/supabase-client";
import { toast } from "sonner";
import NavbarMobile from "./NavbarMobile";
import ShopCart from "../shared/ShopCart";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProductContext } from "../../context/productContext";

const Navbar = () => {
  const [Loading, setLoading] = useState(false);
  const { push } = useRouter();

  const pathName = usePathname();
  const { userId, logout } = useProductContext();

  const handleSignOut = async () => {
    setLoading(true);
    try {
      logout();
    } catch (err) {
      console.log(err instanceof Error ? err.message : err);
      toast.error(err instanceof Error ? err.message : "Error signing out");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <nav className="fixed flex-between left-0 py-3 px-10 bg-[#F5F5F5] w-full border-b border-b-[#00000017] z-50 max-md:px-1 max-sm:px-0">
      <Link
        href={`/`}
        className="font-inter font-bold text-[20px] tracking-[0.03em]"
      >
        Exclusive
      </Link>
      {/* Links */}
      <div className="flex gap-5 max-md:hidden">
        {navbar.map((nav) => (
          <Link
            href={nav.link}
            key={nav.text}
            className={`font-poppins relative cursor-pointer font-normal text-[16px] leading-[24px] ${
              pathName === nav.link
                ? "border-b-2 border-primary"
                : "before:content-[''] before:absolute before:bottom-0 before:bg-primary before:h-[2px] before:w-0 hover:before:w-full before:duration-300"
            }`}
          >
            {nav.text}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-3">
        {/* Input Search */}
        <NavbarSearch />
        {/* Icons */}
        <IoIosHeartEmpty
          size={22}
          className="cursor-pointer"
          onClick={() => push(`/wishlist`)}
        />
        <ShopCart />
        <DropdownMenuDemo userId={userId || ""} handleSignOut={handleSignOut} />
        <NavbarMobile />
      </div>
      {Loading && (
        <div className="absolute top-20 left-1/2 flex items-center justify-center">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

function DropdownMenuDemo({
  userId,
  handleSignOut,
}: {
  userId: string;
  handleSignOut: () => void;
}) {
  const { setChooseComponent } = useProductContext();
  const { push } = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IoPersonOutline size={22} className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        {userId ? (
          <DropdownMenuContent className="w-56" align="start" sideOffset={4}>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuGroup>
              <Link
                href={`/account`}
                onClick={() => {
                  push(`/account`);
                  setChooseComponent("MyProfile");
                }}
              >
                <DropdownMenuItem>Account</DropdownMenuItem>
              </Link>
              <Link
                href={`/account`}
                onClick={() => {
                  setChooseComponent("Address");
                  push(`/account`);
                }}
              >
                <DropdownMenuItem>Address</DropdownMenuItem>
              </Link>
              <Link
                href={`/account`}
                onClick={() => {
                  setChooseComponent("Orders");
                  push(`/account`);
                }}
              >
                <DropdownMenuItem>My Orders</DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>Log Out</DropdownMenuItem>
          </DropdownMenuContent>
        ) : (
          <DropdownMenuContent className="w-56" align="start" sideOffset={4}>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuGroup>
              <Link href={`/log-in`}>
                <DropdownMenuItem>LogIn</DropdownMenuItem>
              </Link>
              <Link href={`/sign-up`}>
                <DropdownMenuItem>SignUp</DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        )}
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}
