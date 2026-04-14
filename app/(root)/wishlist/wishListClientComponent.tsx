"use client";

import Products from "@/components/shared/Card/ProductCard/Products";
import { Button } from "@/components/ui/button";
import { useProductContext } from "@/context/productContext";
import { moveAllToBag } from "@/lib/userCartFn";
import { DB_WishList } from "@/types/productTypes";
import Link from "next/link";
import { useState } from "react";

const WishListClientComponent = ({ data }: { data: DB_WishList[] }) => {
  const { setCartData, cartData } = useProductContext();

  const [wishList, setWishList] = useState(() =>
    data.map((item) => ({
      id: item.product_id,
      name: item.products.name,
      img: item.products.img,
      description: item.products.description,
      imgGallery: item.products.imgGallery,
      stock: item.products.stock,
      category_id: item.products.category_id,
      discount: item.products.discount,
      discount_type: item.products.discount_type,
      price: item.products.price,
      options: item.products.options,
      active: item.products.active,
    })),
  );

  return (
    <>
      <div className="flex-between my-4">
        <span className="font-medium">Wishlist ({wishList.length})</span>
        <Button
          variant={"white"}
          size={"default"}
          disabled={wishList.length === 0}
          onClick={() =>
            moveAllToBag({
              wishList,
              setCartData,
              cartData,
            })
          }
        >
          Move All to Bag
        </Button>
      </div>
      {wishList.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <Products data={wishList} setData={setWishList} />
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
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-hover cursor-pointer duration-300"
          >
            Shop Now
          </Link>
        </div>
      )}
    </>
  );
};

export default WishListClientComponent;
