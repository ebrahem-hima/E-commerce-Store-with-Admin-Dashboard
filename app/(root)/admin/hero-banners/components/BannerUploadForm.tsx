"use client";

import React, {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { createClient } from "@/app/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { MESSAGES } from "@/lib/message";
import { Label } from "@/components/ui/label";
import GetProductLink from "./getProductLink";
import { editBannerType } from "../page";
import Image from "next/image";
import { Product } from "@/types/adminType";

interface Props {
  onUploadSuccess: () => void;
  editingBanner?: editBannerType;
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  selectedProduct: Product | null;
  setSelectedProduct: Dispatch<SetStateAction<Product | null>>;
}

const BannerUploadForm = ({
  onUploadSuccess,
  editingBanner,
  isEdit,
  setIsEdit,
  selectedProduct,
  setSelectedProduct,
}: Props) => {
  const supabase = createClient();

  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const resetForm = () => {
    setFile(null);
    setSelectedProduct(null);
    setIsEdit(false);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleUpload = async () => {
    if (!file) return toast.info("Please select an image first");
    setUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("hero-banners")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("hero-banners")
        .getPublicUrl(fileName);

      const { error: dbError } = await supabase.from("hero_banners").insert({
        image_url: publicUrlData.publicUrl,
        productId: selectedProduct?.productId || null,
        name: selectedProduct?.name,
      });

      if (dbError) throw dbError;

      toast.success(MESSAGES.admin.heroBanners.uploadSuccess);

      onUploadSuccess();
      resetForm();
    } catch (error) {
      toast.error("Error uploading image: " + error);
    } finally {
      setUploading(false);
    }
  };

  const handleUpdateBanner = async (banner?: editBannerType) => {
    setUploading(true);
    try {
      let imageUrl = banner?.image_url;
      const oldFileName = imageUrl?.split("/").pop();
      if (file) {
        const newFileName = `${Date.now()}-${file.name}`;
        // upload new image
        const { error: uploadError } = await supabase.storage
          .from("hero-banners")
          .upload(newFileName, file);

        if (uploadError) throw uploadError;
        // get image url to save it into database
        const { data: publicUrlData } = supabase.storage
          .from("hero-banners")
          .getPublicUrl(newFileName);

        imageUrl = publicUrlData.publicUrl;
        if (oldFileName) {
          await supabase.storage.from("hero-banners").remove([oldFileName]);
        }
      }
      // update image url in database
      const { error: dbError } = await supabase
        .from("hero_banners")
        .update({
          image_url: imageUrl,
          productId: selectedProduct?.productId,
          name: selectedProduct?.name,
        })
        .eq("id", banner?.id);

      if (dbError) throw dbError;

      toast.success("Banner updated successfully");
      onUploadSuccess();
      resetForm();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update banner");
      setUploading(false);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEdit) {
      handleUpdateBanner(editingBanner);
    } else {
      handleUpload();
    }
  };

  const handleCancel = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    resetForm();
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold mb-4">
        {isEdit ? "Edit Banner" : "Add New Banner"}
      </h2>
      <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Image File
            </Label>
            <Input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm mb-2"
            />
            {isEdit && (
              <Image
                src={editingBanner?.image_url || ""}
                alt={"image"}
                width={350}
                height={150}
                className="rounded-md"
                priority
              />
            )}
          </div>
          <GetProductLink
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
          />
        </div>
        <Button type="submit" disabled={uploading}>
          {isEdit
            ? uploading
              ? "Editing..."
              : "Edit Banner"
            : uploading
              ? "Uploading..."
              : "Upload Banner"}
        </Button>
        <Button
          onClick={(e) => handleCancel(e)}
          variant={"outline"}
          className={`ml-2 ${isEdit ? "" : "hidden"}`}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default BannerUploadForm;
