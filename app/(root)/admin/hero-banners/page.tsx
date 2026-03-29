"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/app/utils/supabase/client";
import BannerCard from "./components/BannerCard";
import BannerUploadForm from "./components/BannerUploadForm";
import { toast } from "sonner";
import { MESSAGES } from "@/lib/message";
import { Product } from "@/types/adminType";

export type BannerType = {
  id: string;
  image_url: string;
  productId: string | null;
  name: string;
};

export type editBannerType = {
  id: string;
  image_url: string;
};

const Page = () => {
  const supabase = createClient();
  const [banners, setBanners] = useState<BannerType[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBanner, setEditingBanner] = useState<editBannerType | null>(
    null,
  );
  const [isEdit, setIsEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const fetchBanners = useCallback(async () => {
    const { data, error } = await supabase
      .from("hero_banners")
      .select()
      .order("created_at", { ascending: false });

    if (!error && data) {
      console.log("data", data);
      setBanners(data);
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const handleDelete = async (id: string, imageUrl: string) => {
    const previousBanners = banners;
    try {
      const fileName = imageUrl.split("/").pop();
      setBanners((prev) => prev.filter((b) => b.id !== id));

      if (fileName) {
        const { error: storageError } = await supabase.storage
          .from("hero-banners")
          .remove([fileName]);

        if (storageError) throw storageError;
      }

      const { error: dbError } = await supabase
        .from("hero_banners")
        .delete()
        .eq("id", id);

      if (dbError) throw dbError;

      toast.success(MESSAGES.admin.heroBanners.deleteSuccess);
    } catch (error) {
      setBanners(previousBanners);
      toast.error("Failed to delete the banner. Please try again.");
      console.log("Error deleting banner: " + error);
    }
  };

  const handleEdit = async (banner: BannerType) => {
    if (!banner) return;
    setEditingBanner({
      id: banner.id,
      image_url: banner.image_url,
    });
    setIsEdit(true);
    setSelectedProduct({
      productId: banner.productId || "",
      name: banner.name,
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Manage Hero Banners
        </h1>
        <p className="text-gray-500">
          Upload and manage homepage slider images.
        </p>
      </div>

      <BannerUploadForm
        onUploadSuccess={fetchBanners}
        editingBanner={editingBanner || undefined}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />

      <div>
        <h2 className="text-lg font-semibold mb-4">Current Banners</h2>

        {loading ? (
          <p className="text-gray-500">Loading banners...</p>
        ) : banners.length === 0 ? (
          <p className="text-gray-500">No banners uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {banners.map((banner) => (
              <BannerCard
                key={banner.id}
                banner={banner}
                onDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
