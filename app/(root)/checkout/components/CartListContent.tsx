import Image from "next/image";
import { CartListSkeleton } from "./CartListSkeleton";
import PriceDisplay from "@/components/shared/priceDisplay";
import { typeProduct } from "@/types/productTypes";

interface Props {
  userCartLoading: boolean;
  cartData: typeProduct[];
}

const CartListContent = ({ userCartLoading, cartData }: Props) => {
  return (
    <ul className="flex flex-col gap-4">
      {/* Item */}
      {userCartLoading ? (
        <CartListSkeleton />
      ) : (
        cartData?.length > 0 &&
        cartData.map((item) => (
          <li
            key={item.id}
            className="grid grid-cols-[40px_1fr_auto_auto] items-center gap-4"
          >
            <Image
              src={item.img}
              alt={item.name || "Product image"}
              width={120}
              height={120}
              priority
            />
            <span className="line-clamp-1 break-all">{item.name}</span>
            <span>x{item.count}</span>
            <span>
              <PriceDisplay
                price={item.price}
                discount={item.discount}
                discountType={item.discount_type}
              />
            </span>
          </li>
        ))
      )}
    </ul>
  );
};

export default CartListContent;
