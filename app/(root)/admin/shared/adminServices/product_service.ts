import { createClient } from "@/app/utils/supabase/client";
import { SelectCheckBox } from "@/types/typeAliases";

// Types
export interface DeleteProductOptions {
  productId: string | number;
}

// Function: Delete all files of a product in Supabase storage
export const deleteProductFolder = async ({
  productId,
}: DeleteProductOptions) => {
  console.log("productId", productId);
  const supabase = createClient();
  const bucketName = "products-images";
  const pathsToDelete: string[] = [];

  const { data: mainFiles, error: mainError } = await supabase.storage
    .from(bucketName)
    .list(`${productId}/main`);
  if (mainError) console.log(mainError);

  mainFiles?.forEach((file) =>
    pathsToDelete.push(`${productId}/main/${file.name}`),
  );

  const { data: galleryFiles, error: galleryError } = await supabase.storage
    .from(bucketName)
    .list(`${productId}/gallery`);
  if (galleryError) console.log(galleryError);

  galleryFiles?.forEach((file) =>
    pathsToDelete.push(`${productId}/gallery/${file.name}`),
  );

  if (pathsToDelete.length > 0) {
    const { error } = await supabase.storage
      .from(bucketName)
      .remove(pathsToDelete);
    if (error) {
      console.error("Error deleting files:", error);
      return false;
    }
  }

  return true;
};

// Function: Delete multiple products
export const handleDeleteProducts = async (productIds: SelectCheckBox[]) => {
  for (const productId of productIds) {
    await deleteProductFolder({ productId: productId.ID });
  }
};
