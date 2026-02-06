"use client";

import { navbar } from "@/constant/filterNavbar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavbarLinks = () => {
  const pathName = usePathname();
  return (
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
  );
};

export default NavbarLinks;
