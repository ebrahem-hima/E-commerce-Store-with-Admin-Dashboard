"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { firstProduct } from "../../constant/product";
import { useProductContext } from "../../context/productContext";
import Link from "next/link";
import PriceDisplay from "../shared/priceDisplay";

const NavbarSearch = () => {
  const { push } = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const { isOpen, setIsOpen } = useProductContext();

  const handleSubmitSearch = (e: FormEvent) => {
    e.preventDefault();
    push(`/search/${inputValue}`);
    setInputValue("");
    if (inputRef.current) inputRef.current.value = "";
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleOutsideClick = (event: any) => {
      setIsOpen((prev) => ({
        ...prev,
        searchNavbar:
          (divRef.current && !divRef.current.contains(event.target)) || false,
      }));
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, setIsOpen]);

  const [inputValue, setInputValue] = useState("");
  return (
    <form
      className="relative w-[450px] max-lg:hidden flex items-center"
      onSubmit={handleSubmitSearch}
    >
      <>
        <Input
          ref={inputRef}
          type="text"
          placeholder="What are you looking for ?"
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsOpen((prev) => ({
              ...prev,
              searchNavbar: false,
            }));
          }}
        />
        <span className="absolute right-2">
          <IoSearchOutline />
        </span>
      </>
      {/* Search Value */}
      {inputValue !== "" && (
        <div
          ref={divRef}
          className={`${
            isOpen.searchNavbar ? "hidden" : ""
          } absolute flex flex-col gap-2 top-9 w-full rounded-md bg-white p-2 z-20`}
        >
          {firstProduct.map((item) => (
            <Link
              href={`/productDetails/${item.product_id}`}
              key={item.product_id}
              className="grid grid-cols-[110px_1fr] gap-3 cursor-pointer hover:bg-[#9999992c] rounded-md items-center"
              onClick={() => {
                setIsOpen((prev) => ({
                  ...prev,
                  searchNavbar: true,
                }));
              }}
            >
              <div className="relative w-full h-[60px]">
                <Image
                  src={item.img}
                  fill
                  alt="img-product"
                  className="object-contain rounded-md"
                />
              </div>
              <div className="">
                <span className="line-clamp-2 break-all text-sm font-medium">
                  {item.name}
                </span>
                <PriceDisplay
                  isProduct={true}
                  discount={item.discount}
                  discountType={item.discount_type}
                  price={item.price}
                />
              </div>
            </Link>
          ))}
        </div>
      )}
    </form>
  );
};

export default NavbarSearch;
