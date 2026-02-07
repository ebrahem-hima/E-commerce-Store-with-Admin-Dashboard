import NavbarSearch from "./NavbarSearch/NavbarSearch";
import Link from "next/link";
import { IoIosHeartEmpty } from "react-icons/io";
import AccountNav from "./AccountNav";
import ShopCart from "../shared/ShopCart";
import AdminNav from "./AdminNav";
import NavbarMobile from "./NavbarMobile";
import { IsAdmin } from "../FetchData/IsAdminFn";

const NavbarIcons = async () => {
  const isAdmin = await IsAdmin();
  return (
    <div className="flex items-center gap-3">
      {/* Input Search */}
      <NavbarSearch />
      {/* Icons */}
      <Link href={`/wishlist`}>
        <IoIosHeartEmpty size={22} className="cursor-pointer" />
      </Link>
      <ShopCart />
      <AccountNav />
      {isAdmin && <AdminNav />}
      <NavbarMobile />
    </div>
  );
};

export default NavbarIcons;
