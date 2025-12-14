"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import clsx from "clsx";
import Image from "next/image";
import {
  Dispatch,
  DragEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { IoIosClose } from "react-icons/io";
import { toast } from "sonner";

interface Props {
  setFiles: Dispatch<SetStateAction<File[]>>;
  setImageGalleryDeleted: Dispatch<SetStateAction<string[]>>;
  ImgGallery: string[];
}

const DragAndDropImageGallery = ({
  setFiles,
  ImgGallery,
  setImageGalleryDeleted,
}: Props) => {
  const [isIn, setIsIn] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [DbImages, setDbImages] = useState<string[]>([]);

  useEffect(() => {
    setDbImages(ImgGallery);
  }, [ImgGallery]);
  const allImages = DbImages.concat(images);
  const mouseout = () => {
    setIsIn(false);
  };

  const dragging = () => {
    setIsIn(true);
  };

  const checkImage = (data: { files: FileList | null }) => {
    if (!data.files || data.files?.length === 0) return;
    const selectedFile = data.files?.[0];

    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Please select an image files");
      return;
    }

    if (selectedFile.size > 2 * 1024 * 1024) {
      toast.error("File is too large");
      return;
    }
    return selectedFile;
  };

  const putImage = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const selectedFile = checkImage(e.dataTransfer);
    if (!selectedFile) return;
    setFiles((prev) => {
      if (prev.length >= 10) {
        toast.error("too many images");
        return prev;
      }
      return [...prev, selectedFile];
    });
    setImages((prev) => [...prev, URL.createObjectURL(selectedFile)]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const selectedFile = checkImage(e.target);
    if (!selectedFile) return;
    setFiles((prev) => {
      if (prev.length >= 10) {
        toast.error("too many images");
        return prev;
      }
      return [...prev, selectedFile];
    });
    setImages((prev) => [...prev, URL.createObjectURL(selectedFile)]);
  };

  return (
    <div>
      <Label className="text-sm text-[#777]">Image Gallery</Label>
      <Label
        htmlFor="gallery"
        onDragLeave={mouseout}
        onDragEnter={dragging}
        onDragOver={(e) => e.preventDefault()}
        onDrop={putImage}
        className={clsx(
          "flex-center cursor-pointer border border-dashed border-[#777] rounded-sm p-4",
          isIn ? "border-blue-500" : ""
        )}
      >
        <div className="text-center flex flex-col">
          <Input
            type="file"
            multiple
            onChange={handleChange}
            hidden
            id="gallery"
          />
          <div className="cursor-pointer flex flex-col gap-1 text-blue-500 rounded-sm px-2 py-1">
            <span>Add Images</span>
            <span className="text-sm text-[#777]">
              Or drag and drop image Gallery
            </span>
          </div>
        </div>
      </Label>

      {allImages.length > 0 && (
        <div className="overflow-x-auto h-[150px] w-full flex items-center gap-4">
          {allImages.map((img, idx) => (
            <div key={idx} className="relative w-[100px] h-[90px] shrink-0">
              <IoIosClose
                size={23}
                className="absolute -top-3 -right-3 z-20 p-px bg-primary text-white rounded-full"
                onClick={(e) => {
                  e.preventDefault();
                  setImages((prev) => prev.filter((item) => item !== img));
                  setDbImages((prev) => prev.filter((item) => item !== img));
                  setImageGalleryDeleted((prev) => [...prev, img]);
                }}
              />
              <Image
                src={img}
                alt="drag-image"
                className="rounded-md object-cover"
                sizes="100px"
                fill
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DragAndDropImageGallery;
