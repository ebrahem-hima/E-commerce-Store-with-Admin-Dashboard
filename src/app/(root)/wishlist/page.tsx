"use client";

import React from "react";
import ProductCard from "../../../../components/shared/Card/ProductCard/ProductCard";
import { useProductContext } from "../../../../context/productContext";
import Link from "next/link";

const Page = () => {
  const { wishList } = useProductContext();

  return (
    <div>
      {wishList.length > 0 ? (
        <div className="productGrid">
          {wishList.map((item) => (
            <ProductCard type="wishList" key={item.id} item={item} />
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
