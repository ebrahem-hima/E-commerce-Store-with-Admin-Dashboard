import { useEffect, useState } from "react";
import { typeProduct } from "../../types/productTypes";
import { createClient } from "@/app/utils/supabase/client";

const WishListFn = () => {
  const [Loading, setLoading] = useState(true);
  const [wishList, setWishList] = useState<typeProduct[]>([]);
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

  return { Loading, wishList, setWishList };
};

export default WishListFn;
