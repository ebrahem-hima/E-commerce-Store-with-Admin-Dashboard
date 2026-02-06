import { createClient } from "@/app/utils/supabase/client";
import { useEffect, useState } from "react";

const useGetImages = (productID: string) => {
  const [getMainImageUrl, setGetMainImageUrl] = useState<
    | {
        mainImageUrl: string;
        imgGallery: string[];
      }
    | undefined
  >(undefined);
  useEffect(() => {
    const getImageUrl = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("products")
        .select("img, imgGallery")
        .eq("id", productID)
        .maybeSingle();
      if (error) {
        console.log("Error fetching image URL:", error.message);
        return;
      }
      if (data)
        setGetMainImageUrl({
          mainImageUrl: data.img,
          imgGallery: data.imgGallery || [],
        });
    };
    if (productID) getImageUrl();
  }, [productID]);
  return getMainImageUrl;
};

export default useGetImages;
