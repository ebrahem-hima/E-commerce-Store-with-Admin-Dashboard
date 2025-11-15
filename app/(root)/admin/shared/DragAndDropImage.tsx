import { Label } from "@/components/ui/label";
import React from "react";

const DragAndDropImage = () => {
  return (
    <div>
      <Label className="text-sm text-[#777]">Image</Label>
      <div className="flex-center cursor-pointer border border-dashed border-[#777] rounded-sm p-4">
        <div className="text-center">
          <p className="text-blue-500 rounded-sm px-2 py-1">Add Image</p>
          <span className="text-sm text-[#777]">Or drag and drop image</span>
        </div>
      </div>
    </div>
  );
};

export default DragAndDropImage;
