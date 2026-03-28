import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { adminNavbar } from "@/constant/filterNavbar";
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
            {adminNavbar.map((item) => (
              <Link key={item.link} href={item.link}>
                <DropdownMenuItem>{item.text}</DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

export default AdminNav;
