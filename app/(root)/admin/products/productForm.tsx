"use client";

// import { Label } from "@/components/ui/label";
// import Badge from "@/components/shared/Badge";
import HeaderSaveActions from "../shared/HeaderSaveActions";
import Information from "./AddProduct/Information";
import { useEffect, useState } from "react";
import AddCategory from "../category/AddCategory";
import useProduct from "./hooks/useAddProduct";
import { categoryDetailType, typeMode } from "@/types/adminType";
import { optionType, typeProduct } from "@/types/productTypes";
import CategoryList from "./components/categoryList";
import useGetAllCategories from "../adminHooks/useGetAllCategories";

interface Props {
  mode: typeMode;
  product?: typeProduct | null;
}

export default function ProductForm({ mode, product }: Props) {
  // const { categories, setCategories } = useGetCategory();
  const productDetailDefault = {
    id: "",
    name: "",
    description: "",
    price: 0,
    discount: 0,
    discount_type: "",
    img: "",
    imgGallery: [],
    category_id: 0,
    active: false,
    stock: 0,
  };
  const [showCategory, setShowCategory] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [ImageGalleryDeleted, setImageGalleryDeleted] = useState<string[]>([]);
  const [productDetail, setProductDetail] = useState<typeProduct>(
    product || productDetailDefault,
  );
  const [getOptions, setGetOptions] = useState<optionType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(
    product?.category_id || null,
  );
  const { addProduct, Loading } = useProduct({
    ImageGalleryDeleted,
    mode,
    file,
    files,
    productDetail,
    getOptions,
    selectedCategory,
  });
  const { categories: categoriesDB, Loading: LoadingCategory } =
    useGetAllCategories();

  const [categories, setCategories] =
    useState<categoryDetailType[]>(categoriesDB);

  useEffect(() => {
    setCategories(categoriesDB);
  }, [categoriesDB]);

  const handleAddCategory = (newCategory: categoryDetailType) => {
    setCategories((prev) => [...prev, newCategory]);
  };

  return (
    <>
      {/* <CategoryRealTime setCategories={setCategories} /> */}
      {showCategory && (
        <div>
          <div className="absolute top-0 left-0 z-50 bg-black/75 w-full h-full"></div>
          <AddCategory
            handleAddCategoryProductPage={handleAddCategory}
            setShowCategory={setShowCategory}
          />
        </div>
      )}
      <HeaderSaveActions
        onClick={addProduct}
        link="/admin/products"
        mode={mode}
        Loading={Loading}
        title={mode === "edit" ? "Edit Product" : "Add Product"}
      />
      <div className="grid lg:grid-cols-[minmax(200px,1fr)_250px] sm:grid-cols-1 gap-6">
        <div className="space-y-6 order-1 lg:order-2">
          <h3 className="text-xl font-semibold">Categories</h3>
          <CategoryList
            Loading={LoadingCategory}
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
            setShowCategory={setShowCategory}
            categories={categories}
          />

          {/* <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2">
              <Badge text="New" />
              <Badge text="Sale" />
              <Badge text="Hot" />
            </div>
          </div> */}
        </div>

        <Information
          setImageGalleryDeleted={setImageGalleryDeleted}
          setGetOptions={setGetOptions}
          getOptions={getOptions}
          productDetail={productDetail}
          setProductDetail={setProductDetail}
          setFile={setFile}
          setFiles={setFiles}
        />
      </div>
    </>
  );
}
