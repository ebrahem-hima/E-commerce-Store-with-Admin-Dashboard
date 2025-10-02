import React from "react";
import { CONTACT_INFO } from "../../../../constant/filterNavbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div className="grid grid-cols-[300px_1fr] max-md:grid-cols-1 gap-6">
      <div className="flex flex-col gap-3 max-md:mx-auto max-md:text-center">
        {CONTACT_INFO.map((item, i) => (
          <div
            key={item.title}
            className={`flex flex-col gap-1 ${
              i !== CONTACT_INFO.length - 1
                ? "border-b border-[#dddddd] pb-2"
                : ""
            }`}
          >
            <div className="flex items-center gap-2 mb-2 max-md:mx-auto">
              <item.icon
                className="bg-primary p-1 rounded-[50%] text-white"
                size={30}
              />
              <span className="font-poppins font-medium text-md">
                {item.title}
              </span>
            </div>
            <span className="font-poppins font-medium text-[14px]">
              {item.description}
            </span>
            <span className="font-poppins font-medium text-[14px]">
              {item.detail}
            </span>
          </div>
        ))}
      </div>
      <form className="space-y-4">
        {/* 3 Inputs in Grid */}
        <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-black">
              Name
            </Label>
            <Input id="name" placeholder="Enter your name" />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-black">
              Email
            </Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="phone" className="text-black">
              Phone
            </Label>
            <Input id="phone" type="tel" placeholder="Enter your phone" />
          </div>
        </div>

        {/* Textarea */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="message" className="text-black">
            Message
          </Label>
          <textarea
            className="h-[150px] p-2 border border-[#646363a4] rounded-[4px]"
            id="message"
            placeholder="Write your message..."
          />
        </div>
        <Button className="ml-auto flex flex-end max-sm:mx-auto px-6 max-sm:mb-2">
          Send Message
        </Button>
      </form>
    </div>
  );
};

export default page;
