import { typeMode } from "@/types/adminType";
import UploadImage from "./useUploadImage";
import UpdateImage from "./useUpdateImage";

interface Props {
  mode: typeMode;
  file: File | null;
  files: File[];
  productID: string;
  imgGalleryDeleted?: string[];
  oldMainImg?: string;
}

const handleImage = async ({
  productID,
  mode,
  file,
  files,
  imgGalleryDeleted,
  oldMainImg,
}: Props) => {
  let uploadMainImageUrl = null;
  let uploadGalleryUrls: string[] = [];
  let updateMainImageUrl = null;
  let updateGalleryUrls: string[] = [];
  if (mode === "create") {
    const { mainImageUrl, galleryUrls } = await UploadImage({
      productUUID: productID,
      file,
      files,
    });
    uploadMainImageUrl = mainImageUrl;
    uploadGalleryUrls = galleryUrls;
  } else if (mode === "edit") {
    const { updateMainImage, updateGallery } = await UpdateImage(
      productID,
      file,
      files,
      imgGalleryDeleted || [],
      oldMainImg || ""
    );
    updateMainImageUrl = updateMainImage;
    updateGalleryUrls = updateGallery;
  }

  return {
    uploadMainImageUrl,
    uploadGalleryUrls,
    updateMainImageUrl,
    updateGalleryUrls,
  };
};

export default handleImage;
