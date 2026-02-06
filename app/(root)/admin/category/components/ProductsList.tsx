"use client";

import { ProductWithCategory } from "../services/CategoryDetailService";
import Image from "next/image";
import PriceDisplay from "@/components/shared/priceDisplay";
import Link from "next/link";
import { Edit2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { handleDeleteProducts } from "../../shared/adminServices/product_service";
import { deleteProductById } from "../services/DeleteProduct";

const ProductsList = ({ products }: { products: ProductWithCategory[] }) => {
  const [getProducts, setGetProducts] = useState(products);

  useEffect(() => {
    setGetProducts(products);
  }, [products]);

  return (
    <div className="flex flex-col gap-4">
      {getProducts.map((product) => (
        <div
          key={product.id}
          className="px-4 group flex-between cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <Image
              src={product.img}
              alt="product-img"
              width={80}
              height={80}
              className="object-cover rounded-sm"
            />
            <div className="">
              <p className="font-medium text-[16px]">{product.name}</p>
              <span className="text-[13px]">
                <PriceDisplay
                  price={product.price}
                  discount={product.discount || 0}
                  discountType={product.discount_type || ""}
                />
              </span>
            </div>
          </div>
          <div className="hidden group-hover:flex items-center gap-4 text-[#777]">
            <Link href={`/admin/products/updateProduct/${product.id}`}>
              <Edit2 size={23} />
            </Link>
            <Trash2
              size={23}
              onClick={() => {
                handleDeleteProducts([{ ID: product.id, value: true }]);
                deleteProductById(product.id);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
