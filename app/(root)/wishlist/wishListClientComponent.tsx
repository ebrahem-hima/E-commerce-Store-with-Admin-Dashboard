"use client";

import Products from "@/components/shared/Card/ProductCard/Products";
import { DB_WishList, typeProduct } from "@/types/productTypes";
import Link from "next/link";
import { useState } from "react";

const WishListClientComponent = ({ data }: { data: DB_WishList[] }) => {
  const [wishList, setWishList] = useState<typeProduct[]>(() =>
    data.map((item) => ({
      id: item.product_id,
      name: item.products.name,
      img: item.products.img,
      user_id: item.user_id,
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
  const toggleProducts = (productId: string) => {
    setWishList?.((prev) => {
      const exist = prev.some((p) => p.id === productId);
      if (exist) {
        return prev.filter((p) => p.id !== productId);
      } else {
        const product = prev.find((p) => p.id === productId);
        if (!product) return prev;
        return [...prev, product];
      }
    });
    return data;
  };

  return (
    <>
      <p className="my-4 font-medium">Wishlist ({wishList.length})</p>
      {wishList.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <Products data={wishList} toggleProducts={toggleProducts} />
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
