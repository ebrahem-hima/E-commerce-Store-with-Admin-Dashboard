"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "../../../../components/shared/Card/ProductCard/ProductCard";
import Link from "next/link";
import { typeProduct } from "../../../../types/productTypes";
import { Button } from "@/components/ui/button";
import { useProductContext } from "../../../../context/productContext";
import { Skeleton } from "@/components/ui/skeleton";
import { moveAllToBag } from "@/lib/userCartFn";
import { getProductWishList } from "@/lib/userWishlistFn";

const Page = () => {
  const [wishList, setWishList] = useState<typeProduct[]>([]);
  // const [isMove, setIsMove] = useState(false);
  const [Loading, setLoading] = useState(false);
  const { setIsCartDataUpdated, cartData } = useProductContext();

  useEffect(() => {
    getProductWishList({ setWishList, setLoading });
  }, []);

  return (
    <div>
      <div className="flex-between my-4">
        <span>Wishlist ({wishList.length})</span>
        <Button
          variant={"white"}
          size={"default"}
          // disabled={isMove}
          onClick={() =>
            moveAllToBag({
              // setIsMove,
              wishList,
              setIsCartDataUpdated,
              cartData,
            })
          }
          className=""
        >
          Move All to Bag
        </Button>
      </div>
      {Loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <div className="flex flex-col space-y-3">
            <Skeleton className="bg-[#b9b9b9be] h-[170px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="bg-[#b9b9b9be] h-4" />
              <Skeleton className="bg-[#b9b9b9be] h-4" />
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <Skeleton className="bg-[#b9b9b9be] h-[170px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="bg-[#b9b9b9be] h-4" />
              <Skeleton className="bg-[#b9b9b9be] h-4 w-1/2" />
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <Skeleton className="bg-[#b9b9b9be] h-[170px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="bg-[#b9b9b9be] h-4" />
              <Skeleton className="bg-[#b9b9b9be] h-4 w-1/2" />
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <Skeleton className="bg-[#b9b9b9be] h-[170px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="bg-[#b9b9b9be] h-4" />
              <Skeleton className="bg-[#b9b9b9be] h-4 w-1/2" />
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <Skeleton className="bg-[#b9b9b9be] h-[170px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="bg-[#b9b9b9be] h-4" />
              <Skeleton className="bg-[#b9b9b9be] h-4 w-1/2" />
            </div>
          </div>
        </div>
      ) : wishList.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {wishList.map((item) => (
            <ProductCard type="wishList" key={item.product_id} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <span className="text-4xl mb-4">💔</span>
          <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">
            Start adding your favorite products to see them here.
          </p>
          <Link
            href={`/`}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-hover cursor-pointer"
          >
            Shop Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default Page;
