"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "../../../../components/shared/Card/ProductCard/ProductCard";
import Link from "next/link";
import { typeProduct } from "../../../../types/productTypes";
import { supabase } from "@/supabase-client";
import { Button } from "@/components/ui/button";
import { useProductContext } from "../../../../context/productContext";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { MESSAGES } from "@/lib/message";

const Page = () => {
  const [wishList, setWishList] = useState<typeProduct[]>([]);
  const [isMove, setIsMove] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [Loading, setLoading] = useState(true);
  const { wishListStatus, setWishListStatus } = useProductContext();
  useEffect(() => {
    const getProductWishList = async () => {
      try {
        const { data, error } = await supabase.from("user_wishlist").select();
        if (error) {
          console.error("Error fetching wishlist:", error);
          return;
        }
        if (data) {
          setWishList(data);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        // setTimeout(() => {
        setLoading(false);
        // }, 3000);
      }
    };
    getProductWishList();
  }, [refresh, wishListStatus.isDeleted]);

  const moveAllToBag = async () => {
    setIsMove(false);
    try {
      const { error } = await supabase
        .from("user_cart")
        .upsert(wishList, { count: "exact" })
        .select();
      if (error) console.log(error);
      setRefresh((prev) => !prev);
      // to run useEffect in shop cart and update it instantly
      setWishListStatus((prev) => ({
        ...prev,
        isAdded: !prev.isAdded,
      }));
      toast.success(MESSAGES.cart.added);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsMove(true);
    }
  };

  return (
    <div>
      <div className="flex-between my-4">
        <span>Wishlist ({wishList.length})</span>
        <Button
          variant={"white"}
          size={"default"}
          disabled={isMove}
          onClick={moveAllToBag}
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
