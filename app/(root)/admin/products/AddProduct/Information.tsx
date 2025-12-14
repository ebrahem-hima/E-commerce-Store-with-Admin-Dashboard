import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import InputBadge from "../../shared/InputBadge/InputBadge";
import { optionType, typeProduct } from "@/types/productTypes";
import { Dispatch, SetStateAction } from "react";
import DragAndDropImage from "../../shared/DragAndDropImages/DragAndDropImage";
import DragAndDropImageGallery from "../../shared/DragAndDropImages/DragAndDropImageGallery";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams } from "next/navigation";
import useGetImages from "../hooks/handleImage/useGetImages";

interface Props {
  productDetail: typeProduct;
  setProductDetail: Dispatch<SetStateAction<typeProduct>>;
  setFile: Dispatch<SetStateAction<File | null>>;
  setFiles: Dispatch<SetStateAction<File[]>>;
  setGetOptions: Dispatch<SetStateAction<optionType[]>>;
  setImageGalleryDeleted: Dispatch<SetStateAction<string[]>>;
  getOptions: optionType[];
}

const Information = ({
  productDetail,
  setProductDetail,
  setFile,
  setFiles,
  getOptions,
  setGetOptions,
  setImageGalleryDeleted,
}: Props) => {
  const params = useParams<{ productID: string }>();
  const { productID } = params;
  const updateField = (name: string, value: string | number) => {
    setProductDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const getMainImageUrl = useGetImages(productID);

  return (
    <div className="space-y-6 order-2 lg:order-1">
      <h2 className="text-2xl font-semibold">Information</h2>

      {/* Product Name */}
      <div className="flex flex-col gap-2">
        <Label>Product Name</Label>
        <Input
          name="name"
          value={productDetail.name ?? ""}
          onChange={(e) => updateField("name", e.target.value)}
          placeholder="Enter Product Name"
        />
      </div>

      {/* Product Description */}
      <div className="flex flex-col gap-2">
        <Label>Product Description</Label>
        <Textarea
          name="description"
          value={productDetail.description ?? ""}
          onChange={(e) => updateField("description", e.target.value)}
          className="h-32"
          placeholder="Write description..."
          rows={5}
        />
      </div>

      {/* Images */}
      <div className="flex flex-col gap-2">
        <DragAndDropImage
          Img={getMainImageUrl?.mainImageUrl || ""}
          setFile={setFile}
        />
        <DragAndDropImageGallery
          setImageGalleryDeleted={setImageGalleryDeleted}
          setFiles={setFiles}
          ImgGallery={getMainImageUrl?.imgGallery || []}
        />
      </div>

      {/* Price */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Price</Label>
          <Input
            name="price"
            type="number"
            value={productDetail.price === 0 ? "" : productDetail.price}
            onChange={(e) => updateField("price", Number(e.target.value))}
            placeholder="Enter Price"
          />
        </div>
        <div>
          <Label>Discount Price</Label>
          <Input
            name="discount"
            type="number"
            value={
              productDetail.discount === null || productDetail.discount === 0
                ? ""
                : productDetail.discount
            }
            onChange={(e) => updateField("discount", Number(e.target.value))}
            placeholder="Price at Discount"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Stock</Label>
          <Input
            name="stock"
            type="number"
            value={productDetail.stock === 0 ? "" : productDetail.stock}
            onChange={(e) => updateField("stock", Number(e.target.value))}
            placeholder="Enter Price"
          />
        </div>
        <div>
          <Label>Discount Type</Label>
          <Select
            value={
              productDetail.discount_type === null
                ? ""
                : productDetail.discount_type
            }
            onValueChange={(value) => updateField("discount_type", value)}
          >
            <SelectTrigger className="w-full border border-[#646363a4]">
              <SelectValue placeholder="Select discount type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fixed">Fixed</SelectItem>
              <SelectItem value="percentage">Percentage</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Label className="text-[20px] flex items-center gap-2">
          Options
          <span className="text-[#777] text-sm">
            (Press Enter to Add options)
          </span>
        </Label>
        <InputBadge getOptions={getOptions} setGetOptions={setGetOptions} />
      </div>
    </div>
  );
};

export default Information;
