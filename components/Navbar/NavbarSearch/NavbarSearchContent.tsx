import LoadingSpinner from "@/components/shared/LoadingSpinner";
import PriceDisplay from "@/components/shared/priceDisplay";
import { typeProduct } from "@/types/productTypes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  divRef: React.RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  Loading: boolean;
  productSearch: typeProduct[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavbarSearchContent = ({
  setIsOpen,
  divRef,
  isOpen,
  Loading,
  productSearch,
}: Props) => {
  return (
    <div
      ref={divRef}
      className={`${
        isOpen ? "hidden" : ""
      } absolute flex flex-col gap-2 top-9 w-full rounded-md bg-white p-2 z-20`}
    >
      {Loading ? (
        <LoadingSpinner />
      ) : productSearch.length === 0 ? (
        <span className="text-center py-2">No products found</span>
      ) : (
        productSearch.map((item) => (
          <Link
            href={`/productDetails/${item.id}`}
            key={item.id}
            className="grid grid-cols-[110px_1fr] gap-3 cursor-pointer hover:bg-[#9999992c] rounded-md items-center"
            onClick={() => {
              setIsOpen(false);
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
  );
};

export default NavbarSearchContent;
