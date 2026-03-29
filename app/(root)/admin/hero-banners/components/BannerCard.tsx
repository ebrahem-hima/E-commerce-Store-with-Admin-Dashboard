"use client";

import Image from "next/image";
import { BannerType } from "../page";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  banner: BannerType;
  onDelete: (id: string, imageUrl: string) => void;
  handleEdit: (banner: BannerType) => void;
}

const BannerCard = ({ banner, onDelete, handleEdit }: Props) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
      <div className="relative h-48 w-full bg-gray-100">
        <Image
          src={banner.image_url}
          alt="Hero Banner"
          fill
          className="object-contain"
          priority
        />
      </div>

      <div className="p-4 flex-between gap-3 flex-1">
        <div className="flex flex-col text-sm text-gray-600 truncate">
          <div>
            <span className="font-semibold text-gray-800">Link:</span>{" "}
            {banner?.productId ? (
              <Link
                href={`/productDetails/${banner?.productId}`}
                className="text-blue-500 hover:underline"
              >
                Go to Product
              </Link>
            ) : (
              "No Link"
            )}
          </div>
          <div>
            <span className="font-semibold text-gray-800">Product Name:</span>{" "}
            {banner?.name || "N/A"}
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(banner?.id || "", banner?.image_url || "")}
          >
            Delete
          </Button>
          <Button size="sm" onClick={() => handleEdit(banner)}>
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BannerCard;
