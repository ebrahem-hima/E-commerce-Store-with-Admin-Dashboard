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
import Link from "next/link";
import { RiAdminFill } from "react-icons/ri";

const AdminNav = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <RiAdminFill size={22} className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent className="w-56" align="start" sideOffset={4}>
          <DropdownMenuLabel>Admin</DropdownMenuLabel>
          <DropdownMenuGroup>
            <Link href={`/admin/dashboard`}>
              <DropdownMenuItem>Dashboard</DropdownMenuItem>
            </Link>
            <Link href={`/admin/orders`}>
              <DropdownMenuItem>Orders</DropdownMenuItem>
            </Link>
            <Link href={`/admin/products`}>
              <DropdownMenuItem>Products</DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href={`/admin/category`}>
              <DropdownMenuItem>Category</DropdownMenuItem>
            </Link>
            <Link href={`/admin/customers`}>
              <DropdownMenuItem>Customers</DropdownMenuItem>
            </Link>
            <Link href={`/admin/coupons`}>
              <DropdownMenuItem>Coupons</DropdownMenuItem>
            </Link>
            <Link href={`/admin/inbox`}>
              <DropdownMenuItem>Inbox</DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

export default AdminNav;
