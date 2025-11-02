"use client";

import { navbar } from "../../constant/filterNavbar";
import NavbarSearch from "./NavbarSearch";
import { IoIosHeartEmpty } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
import { IoPersonOutline } from "react-icons/io5";
import Link from "next/link";

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
import { logout } from "@/app/(root)/(auth)/authActions/logout";

const Navbar = () => {
  const { push } = useRouter();
  const pathName = usePathname();

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
        <Account />
        <NavbarMobile />
      </div>
    </nav>
  );
};

export default Navbar;

function Account() {
  const { userId, setIsAuth, setUser, setCartData } = useProductContext();
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
              <Link href={`/account/MyProfile`}>
                <DropdownMenuItem>Account</DropdownMenuItem>
              </Link>
              <Link href={`/account/Address`}>
                <DropdownMenuItem>Address</DropdownMenuItem>
              </Link>
              <Link href={`/account/orders`}>
                <DropdownMenuItem>My Orders</DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setUser("");
                localStorage.removeItem("user_cart");
                localStorage.removeItem("cart_guest");
                localStorage.removeItem("user_profile");
                // localStorage.clear();
                // setCartData([]);
                logout();
                // setIsAuth(false);
              }}
            >
              Log Out
            </DropdownMenuItem>
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
