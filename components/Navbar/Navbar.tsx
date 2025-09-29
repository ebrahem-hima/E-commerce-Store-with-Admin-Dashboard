"use client";

import React, { useEffect, useState } from "react";
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
  const [progress, setProgress] = useState(0);
  const { push } = useRouter();

  const pathName = usePathname();
  const [session, setSession] = useState("");
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) setSession(userId);
  }, [session]);

  const handleSignOut = async () => {
    setLoading(true);
    setProgress(30);
    try {
      setProgress(50);
      const { error } = await supabase.auth.signOut();
      localStorage.removeItem("user_id");
      if (error) throw error;
      setProgress(70);
      toast.success("Successfully signed out");
    } catch (err) {
      console.log(err instanceof Error ? err.message : err);
      toast.error(err instanceof Error ? err.message : "Error signing out");
    } finally {
      setLoading(false);
      setProgress(100);
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
        <DropdownMenuDemo session={session} />
        <NavbarMobile
          session={session}
          onClick={handleSignOut}
          pathName={pathName}
        />
      </div>
      {Loading && (
        <div
          className={`w-[${progress}%] h-2 bg-gray-200 mt-2 rounded absolute bottom-0 left-0 duration-300`}
        >
          <div className="h-2 bg-red-500 rounded w-full animate-pulse"></div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

function DropdownMenuDemo({ session }: { session: string }) {
  const { setChooseComponent } = useProductContext();
  const { push } = useRouter();
  return (
    <div className="relative">
      {" "}
      {/* خلي الـ parent relative */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IoPersonOutline size={22} className="cursor-pointer" />
        </DropdownMenuTrigger>

        <DropdownMenuPortal>
          {session ? (
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
              <DropdownMenuItem>Log Out</DropdownMenuItem>
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
    </div>
  );
}
