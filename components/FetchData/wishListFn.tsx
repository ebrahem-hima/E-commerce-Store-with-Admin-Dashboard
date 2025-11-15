import { useEffect, useState } from "react";
import { typeProduct } from "../../types/productTypes";
import { createClient } from "@/utils/supabase/client";

const WishListFn = () => {
  const [Loading, setLoading] = useState(true);
  const [wishList, setWishList] = useState<typeProduct[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(() => {
    const getProductWishList = async () => {
      const supabase = createClient();
      setLoading(true);
      const { data, error } = await supabase.from("user_wishlist").select();
      if (error) {
        console.error("Error fetching wishlist:", error);
        return;
      }
      if (data) setWishList(data);
      setLoading(false);
    };
    getProductWishList();
  }, []);
  useEffect(() => {
    if (wishList.length > 0) {
      setIsDisabled(false);
      return;
    } else {
      setIsDisabled(true);
    }
  }, [wishList]);
  return { Loading, wishList, setWishList, isDisabled };
};

export default WishListFn;
