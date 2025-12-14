import { createClient } from "@/utils/supabase/client";

interface Props {
  productUUID: string;
  file: File | null;
  files: File[];
}

const UploadImage = async ({ productUUID, file, files }: Props) => {
  const supabase = createClient();
  let mainImageUrl = null;
  if (file) {
    const { error } = await supabase.storage
      .from("products-images")
      .upload(`${productUUID}/main/${file.name}`, file, {
        cacheControl: "3600",
        upsert: true,
        contentType: file.type,
      });

    if (error) throw error;

    mainImageUrl = supabase.storage
      .from("products-images")
      .getPublicUrl(`${productUUID}/main/${file.name}`).data.publicUrl;
  }

  const galleryUrls = await Promise.all(
    files.map(async (file) => {
      const { error } = await supabase.storage
        .from("products-images")
        .upload(`${productUUID}/gallery/${file.name}`, file, {
          cacheControl: "3600",
          upsert: true,
          contentType: file.type,
        });

      if (error) throw error;

      return supabase.storage
        .from("products-images")
        .getPublicUrl(`${productUUID}/gallery/${file.name}`).data.publicUrl;
    })
  );
  return {
    mainImageUrl,
    galleryUrls,
  };
};

export default UploadImage;
