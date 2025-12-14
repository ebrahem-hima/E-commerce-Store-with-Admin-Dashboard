"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import clsx from "clsx";
import Image from "next/image";
import {
  ChangeEvent,
  Dispatch,
  DragEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { IoIosClose } from "react-icons/io";
import { toast } from "sonner";

interface Props {
  setFile: Dispatch<SetStateAction<File | null>>;
  Img: string;
}

const DragAndDropImage = ({ setFile, Img }: Props) => {
  const [isIn, setIsIn] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    setImage(Img);
  }, [Img]);
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
      toast.error("Please select an image file");
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
    setFile(selectedFile || null);
    setImage(URL.createObjectURL(selectedFile));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const selectedFile = checkImage(e.target);
    if (!selectedFile) return;
    setFile(selectedFile || null);
    setImage(URL.createObjectURL(selectedFile));
  };

  return (
    <div>
      <Label className="text-sm text-[#777]">Image</Label>
      <Label
        htmlFor="category"
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
          <Input type="file" onChange={handleChange} hidden id="category" />
          {image ? (
            <div className="relative w-[110px] h-[110px]">
              <IoIosClose
                size={23}
                className="absolute -top-3 -right-3 z-20 p-px bg-primary text-white rounded-full"
                onClick={(e) => {
                  setImage("");
                  e.stopPropagation();
                  e.preventDefault();
                }}
              />
              <Image
                src={image}
                alt="drag-image"
                className="rounded-md object-cover"
                fill
              />
            </div>
          ) : (
            <div className="cursor-pointer flex flex-col gap-1 text-blue-500 rounded-sm px-2 py-1">
              <span>Add Image</span>
              <span className="text-sm text-[#777]">
                Or drag and drop image
              </span>
            </div>
          )}
        </div>
      </Label>
    </div>
  );
};

export default DragAndDropImage;
