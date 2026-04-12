import { typeProduct } from "@/types/productTypes";
import WishListClientComponent from "./wishListClientComponent";
import { createClient } from "@/app/utils/supabase/server";

const WishListWrapper = async () => {
  const supabase = await createClient();

  const { data: dataDB, error } = await supabase
    .from("user_wishlist")
    .select(`id,user_id,product_id,created_at,products(*)`);
  if (error) {
    console.error("Error fetching wishlist:", error);
    return;
  }

  const data = (dataDB ?? []).map((item) => {
    const productData = Array.isArray(item.products)
      ? item.products[0]
      : item.products;

    return {
      ...item,
      products: productData as typeProduct,
    };
  });

  return (
    <>
      <WishListClientComponent data={data} />
    </>
  );
};

export default WishListWrapper;
