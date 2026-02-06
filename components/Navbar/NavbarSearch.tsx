"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useProductContext } from "../../context/productContext";
import Link from "next/link";
import PriceDisplay from "../shared/priceDisplay";
import { typeProduct } from "@/types/productTypes";
import { createClient } from "@/utils/supabase/client";
import LoadingSpinner from "../shared/LoadingSpinner";

const NavbarSearch = () => {
  const { push } = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const { isOpen, setIsOpen } = useProductContext();

  const handleSubmitSearch = (e: FormEvent) => {
    e.preventDefault();
    push(`/search?query=${inputValue}`);
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
  const [Loading, setLoading] = useState(false);
  const [productSearch, setProductSearch] = useState<typeProduct[]>([]);

  useEffect(() => {
    const getProductSearch = async () => {
      const supabase = createClient();
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select()
        .ilike("name", `%${inputValue}%`);

      if (error) {
        console.log("Error fetching products:", error);
        return;
      }
      setProductSearch(data);
      setLoading(false);
    };
    if (inputValue !== "") getProductSearch();
  }, [inputValue]);

  return (
    <form
      className="relative w-112.5 max-lg:hidden flex items-center"
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
          {Loading ? (
            <LoadingSpinner />
          ) : (
            productSearch.map((item) => (
              <Link
                href={`/productDetails/${item.id}`}
                key={item.id}
                className="grid grid-cols-[110px_1fr] gap-3 cursor-pointer hover:bg-[#9999992c] rounded-md items-center"
                onClick={() => {
                  setIsOpen((prev) => ({
                    ...prev,
                    searchNavbar: true,
                  }));
                }}
              >
                <div className="relative w-full h-15">
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
            ))
          )}
        </div>
      )}
    </form>
  );
};

export default NavbarSearch;
