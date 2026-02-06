import Link from "next/link";
import NavbarLinks from "./NavbarLinks";
import NavbarIcons from "./NavbarIcons";

const Navbar = () => {
  return (
    <nav className="fixed flex-between left-0 py-3 px-10 bg-[#F5F5F5] w-full border-b border-b-[#00000017] z-50 max-md:px-1 max-sm:px-0">
      <Link
        href={`/`}
        className="font-inter font-bold text-[20px] tracking-[0.03em]"
      >
        Exclusive
      </Link>
      {/* Links */}
      <NavbarLinks />
      <NavbarIcons />
    </nav>
  );
};

export default Navbar;
