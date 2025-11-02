import React from "react";
import { adminNavbar } from "@/constant/filterNavbar";
import Link from "next/link";

const AdminNavbar = () => {
  return (
    <nav className="fixe left-0 top-[57px] pt-4 px-3 bg-blue-600 h-screen flex flex-col gap-2 text-white">
      {adminNavbar.map((nav) => (
        <Link
          key={nav.text}
          className="flex p-2 items-center gap-2 hover:bg-blue-400 duration-300 rounded-sm"
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
