import { logout } from "@/app/(root)/(auth)/authActions/logout";
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
import { useProductContext } from "@/context/productContext";
import Link from "next/link";
import { IoPersonOutline } from "react-icons/io5";

const AccountNav = () => {
  const { userId, setCartData, setIsAuth } = useProductContext();
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
                setCartData([]);
                localStorage.removeItem("user_cart");
                localStorage.removeItem("cart_guest");
                localStorage.removeItem("user_profile");
                setIsAuth(false);
                logout();
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
};

export default AccountNav;
