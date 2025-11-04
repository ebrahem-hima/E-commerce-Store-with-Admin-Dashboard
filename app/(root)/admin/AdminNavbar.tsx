"use client";

import { adminNavbar } from "@/constant/filterNavbar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminNavbar = () => {
  const pathName = usePathname();
  console.log("pathName", pathName);
  return (
    <nav className="max-md:hidden fixe left-0 top-[57px] pt-4 px-3 bg-blue-600 h-screen flex-col gap-2 text-white">
      {adminNavbar.map((nav) => (
        <Link
          key={nav.text}
          className={`${
            nav.link === pathName && "bg-blue-400"
          } flex p-2 items-center gap-2 hover:bg-blue-400 duration-300 rounded-sm`}
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
