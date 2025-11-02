"use client";

import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { CONTACT_INFO } from "@/constant/filterNavbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useProductContext } from "@/context/productContext";
import { toast } from "sonner";
import { contactSchema } from "@/validation";
import { MESSAGES } from "@/lib/message";

interface InputValueType {
  userName: string;
  email: string;
  phone: string;
  message: string;
}

const Page = () => {
  const { profileData } = useProductContext();
  const [inputValue, setInputValue] = useState<InputValueType>({
    userName: "",
    email: "",
    phone: "",
    message: "",
  });
  const messageRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setInputValue({
      userName: profileData.firstName + " " + profileData.lastName,
      email: profileData.email,
      phone: profileData.phone,
      message: "",
    });
  }, [profileData]);

  const handleSendMessage = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const result = contactSchema.safeParse({
        userName: inputValue.userName,
        email: inputValue.email,
        phone: inputValue.phone,
        message: inputValue.message,
      });
      if (!result.success) {
        console.log(result.error.issues);
        toast.error(result.error.issues[0].message);
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
    // const { error } = await supabase.from('contact').insert(inputValue)
    // if (error) {
    //   console.log(error)
    //   return false
    // }
    setInputValue((prev) => ({
      ...prev,
      message: "",
    }));
    if (messageRef.current) messageRef.current.value = "";
    toast.success(MESSAGES.contact.success);
  };
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
            <span className="font-inter font-medium text-[12px]">
              {item.description}
            </span>
            <span className="font-inter font-medium text-[12px]">
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
            <Input
              value={inputValue.userName}
              onChange={(e) => {
                setInputValue((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }));
              }}
              name="userName"
              id="name"
              placeholder="Enter your name"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-black">
              Email
            </Label>
            <Input
              value={inputValue.email}
              onChange={(e) => {
                setInputValue((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }));
              }}
              name="email"
              id="email"
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="phone" className="text-black">
              Phone
            </Label>
            <Input
              value={inputValue.phone}
              name="phone"
              onChange={(e) => {
                setInputValue((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }));
              }}
              id="phone"
              type="tel"
              placeholder="Enter your phone"
            />
          </div>
        </div>

        {/* Textarea */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="message" className="text-black">
            Message
          </Label>
          <textarea
            ref={messageRef}
            name="message"
            onChange={(e) => {
              setInputValue((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }));
            }}
            className="h-[150px] p-2 border border-[#646363a4] rounded-sm"
            id="message"
            placeholder="Write your message..."
          />
        </div>
        <Button
          onClick={handleSendMessage}
          className="ml-auto flex flex-end max-sm:mx-auto px-6 max-sm:mb-2"
        >
          Send Message
        </Button>
      </form>
    </div>
  );
};

export default Page;
