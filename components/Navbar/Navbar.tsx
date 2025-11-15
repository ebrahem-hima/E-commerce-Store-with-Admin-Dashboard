"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { IoIosHeartEmpty } from "react-icons/io";

import { navbar } from "../../constant/filterNavbar";
import NavbarSearch from "./NavbarSearch";
import NavbarMobile from "./NavbarMobile";
import ShopCart from "../shared/ShopCart";

import AccountNav from "./AccountNav";
import AdminNav from "./AdminNav";
import IsAdminFn from "../FetchData/IsAdminFn";

const Navbar = () => {
  const { push } = useRouter();
  const pathName = usePathname();
  const { isAdmin } = IsAdminFn();

  return (
    <nav className="fixed flex-between left-0 py-3 px-10 bg-[#F5F5F5] w-full border-b border-b-[#00000017] z-50 max-md:px-1 max-sm:px-0">
      <Link
        href={`/`}
        className="font-inter font-bold text-[20px] tracking-[0.03em]"
      >
        Exclusive
      </Link>
      {/* Links */}
      <div className="flex gap-5 max-lg:hidden">
        {navbar.map((nav) => (
          <Link
            href={nav.link}
            key={nav.text}
            className={`font-poppins relative cursor-pointer font-normal text-[16px] leading-6 ${
              pathName === nav.link
                ? "border-b-2 border-primary"
                : "before:content-[''] before:absolute before:bottom-0 before:bg-primary before:h-0.5 before:w-0 hover:before:w-full before:duration-300"
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
        <AccountNav />
        {isAdmin && <AdminNav />}
        <NavbarMobile />
      </div>
    </nav>
  );
};

export default Navbar;
