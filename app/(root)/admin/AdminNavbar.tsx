"use client";

import { adminNavbar } from "@/constant/filterNavbar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminNavbar = () => {
  const pathName = usePathname();
  return (
    <nav className="max-lg:hidden fixed left-10 w-[250px] top-[57px] pt-4 px-3 bg-primary h-screen flex-col gap-2 text-white">
      {adminNavbar.map((nav) => (
        <Link
          key={nav.text}
          className={`${
            nav.link === pathName && "bg-hover"
          } flex p-2 items-center gap-2 hover:bg-hover duration-300 rounded-sm`}
          href={nav.link}
        >
          <nav.icon size={25} />
          {nav.text}
        </Link>
      ))}
    </nav>
  );
};

export default AdminNavbar;
