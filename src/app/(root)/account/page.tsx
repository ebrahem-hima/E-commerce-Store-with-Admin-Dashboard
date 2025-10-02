"use client";

import MyProfile from "./MyProfile";
import Address from "./Address";
import Orders from "./Orders";
import { useProductContext } from "../../../../context/productContext";

const Page = () => {
  const { chooseComponent, setChooseComponent } = useProductContext();
  let titleComponent;
  switch (chooseComponent) {
    case "MyProfile":
      titleComponent = "Edit Your Profile";
      break;
    case "Address":
      titleComponent = "Edit Address";
      break;
    case "Orders":
      titleComponent = "Your Orders";
      break;
    default:
      break;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-4">
      {/* Links */}
      <div className="flex flex-col gap-3 max-md:text-center">
        <div className="flex flex-col gap-1">
          <p className="text-[15px] font-medium">Manage My Account</p>
          <div className="flex flex-col gap-1 md:ml-5">
            <span
              onClick={() => setChooseComponent("MyProfile")}
              className={`${
                chooseComponent === "MyProfile" ? "text-primary" : "text-[#999]"
              } cursor-pointer duration-200 text-[13px] hover:text-primary active:text-primary font-poppins w-fit max-md:mx-auto`}
            >
              My Profile
            </span>
            <span
              onClick={() => setChooseComponent("Address")}
              className={`${
                chooseComponent === "Address" ? "text-primary" : "text-[#999]"
              } cursor-pointer duration-200 text-[13px] hover:text-primary active:text-primary font-poppins w-fit max-md:mx-auto`}
            >
              Address Book
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[15px] font-poppins font-medium">My Orders</p>
          <div className="flex flex-col md:ml-5">
            <span
              onClick={() => setChooseComponent("Orders")}
              className={`${
                chooseComponent === "Orders" ? "text-primary" : "text-[#999]"
              } cursor-pointer duration-200 text-[13px] hover:text-primary active:text-primary font-poppins w-fit max-md:mx-auto`}
            >
              Orders
            </span>
          </div>
        </div>
      </div>
      {/* Component */}
      <div className="w-full flex flex-col gap-4">
        <p className="text-primary font-medium">{titleComponent}</p>
        {chooseComponent === "MyProfile" && <MyProfile />}
        {chooseComponent === "Address" && <Address />}
        {chooseComponent === "Orders" && <Orders />}
      </div>
    </div>
  );
};

export default Page;
