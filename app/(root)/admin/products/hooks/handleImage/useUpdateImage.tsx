import { createClient } from "@/utils/supabase/client";

const UpdateImage = async (
  productID: string,
  file: File | null,
  files: File[],
  galleryDeleted: string[],
  oldMainImg: string
) => {
  const supabase = createClient();

  let mainImageUrl = null;
  if (file) {
    const pathToDelete = oldMainImg.split("/object/public/products-images/")[1];
    const { error } = await supabase.storage
      .from("products-images")
      .remove([pathToDelete]);
    if (error) {
      throw error;
    }
  }
  if (file) {
    const { error } = await supabase.storage
      .from("products-images")
      .upload(`${productID}/main/${file.name}`, file, {
        cacheControl: "3600",
        upsert: true,
        contentType: file.type,
      });

    if (error) {
      throw error;
    }

    mainImageUrl = supabase.storage
      .from("products-images")
      .getPublicUrl(`${productID}/main/${file.name}`).data.publicUrl;
  }
  console.log("galleryDeleted", galleryDeleted);
  if (galleryDeleted.length > 0) {
    const pathsToDelete = galleryDeleted
      .map((imgUrl) => imgUrl.split("/object/public/products-images/")[1])
      .filter((path) => path);
    const { error } = await supabase.storage
      .from("products-images")
      .remove(pathsToDelete);
    if (error) {
      throw error;
    }
    console.log("pathsToDelete", pathsToDelete);
  }
  const galleryUrls = await Promise.all(
    files.map(async (file) => {
      const { error } = await supabase.storage
        .from("products-images")
        .upload(`${productID}/gallery/${file.name}`, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        });

      if (error) {
        throw error;
      }

      return supabase.storage
        .from("products-images")
        .getPublicUrl(`${productID}/gallery/${file.name}`).data.publicUrl;
    })
  );

  return {
    updateMainImage: mainImageUrl || "",
    updateGallery: galleryUrls,
  };
};

export default UpdateImage;
