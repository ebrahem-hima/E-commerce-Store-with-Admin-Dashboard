"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const AccountLinks = () => {
  const pathName = usePathname();
  return (
    <div className="flex flex-col gap-3 max-md:text-center">
      <div className="flex flex-col gap-1">
        <p className="text-[15px] font-medium">Manage My Account</p>
        <div className="flex flex-col gap-1 md:ml-5">
          <Link
            href={`/account/MyProfile`}
            className={`${
              pathName === "/account/MyProfile" ? "text-primary" : "text-[#999]"
            }  cursor-pointer duration-200 text-[13px] hover:text-primary active:text-primary font-poppins w-fit max-md:mx-auto`}
          >
            My Profile
          </Link>
          <Link
            href={`/account/Address`}
            className={`${
              pathName === "/account/Address" ? "text-primary" : "text-[#999]"
            } 
              cursor-pointer duration-200 text-[13px] hover:text-primary active:text-primary font-poppins w-fit max-md:mx-auto`}
          >
            Address Book
          </Link>
          <Link
            href={`/account/messages`}
            className={`${
              pathName === "/account/messages" ? "text-primary" : "text-[#999]"
            } 
              cursor-pointer duration-200 text-[13px] hover:text-primary active:text-primary font-poppins w-fit max-md:mx-auto`}
          >
            Messages
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[15px] font-poppins font-medium">My Orders</p>
        <div className="flex flex-col md:ml-5">
          <Link
            href={`/account/orders`}
            className={`${
              pathName === "/account/orders" ? "text-primary" : "text-[#999]"
            } cursor-pointer duration-200 text-[13px] hover:text-primary active:text-primary font-poppins w-fit max-md:mx-auto`}
          >
            Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountLinks;
