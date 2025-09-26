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
import SignInSignOut from "./SignInSignOut";
import ShopCart from "../shared/ShopCart";

const Navbar = () => {
  const [Loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { push } = useRouter();

  const pathName = usePathname();
  const [session, setSession] = useState("");
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    setSession(userId || "");
  }, []);

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
        <SignInSignOut
          session={session}
          onClick={handleSignOut}
          pathName={pathName}
        />
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
