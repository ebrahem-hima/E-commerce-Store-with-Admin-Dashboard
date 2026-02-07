import { createClient } from "@/app/utils/supabase/server";
import WishListClientComponent from "./wishListClientComponent";

const Page = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("user_wishlist").select();
  if (error) {
    console.error("Error fetching wishlist:", error);
    return;
  }
  if (data)
    return (
      <>
        <WishListClientComponent data={data} />
      </>
    );
};

export default Page;
