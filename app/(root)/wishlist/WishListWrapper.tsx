import WishListClientComponent from "./wishListClientComponent";
import { createClient } from "@/app/utils/supabase/server";

const WishListWrapper = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("user_wishlist").select();
  if (error) {
    console.error("Error fetching wishlist:", error);
    return;
  }

  return (
    <>
      <WishListClientComponent data={data} />
    </>
  );
};

export default WishListWrapper;
