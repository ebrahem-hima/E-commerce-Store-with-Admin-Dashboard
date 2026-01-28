"use client";

import PageHeader from "../shared/PageHeader";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import AddCategory from "./AddCategory";
import { Boxes } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import CategoryButtons from "./categoryButtons";
import CategoryRealTime from "./categoryRealTime";
import useGetAllCategories from "./hooks/useGetAllCategories";
import { categoryDetailType } from "@/types/adminType";

const Page = () => {
  const [showCategory, setShowCategory] = useState(false);
  const [Edit, setEdit] = useState(false);
  const { categories, setCategories, Loading } = useGetAllCategories();

  // State is lifted to the parent component to ensure correct data flow
  // between CategoryButtons (trigger) and the AddCategory modal (display).

  const [categoryDetail, setCategoryDetail] =
    useState<categoryDetailType | null>({
      id: 0,
      name: "",
      description: "",
      type: "",
    });
  const handleEditClick = (
    e: MouseEvent<HTMLButtonElement>,
    category: categoryDetailType
  ) => {
    e.preventDefault();
    setCategoryDetail(category);
    setEdit(true);
    setShowCategory(true);
  };
  const handleAddClick = () => {
    setCategoryDetail(null);
    setEdit(false);
    setShowCategory(true);
  };
  return (
    <div>
      <CategoryRealTime setCategories={setCategories} />
      {showCategory && (
        <div className="overflow-hidden">
          <div className="absolute top-0 left-0 z-50 bg-black/75 w-full h-full"></div>
          <AddCategory
            categoryDetail={categoryDetail}
            Edit={Edit}
            setShowCategory={setShowCategory}
          />
        </div>
      )}
      <PageHeader
        title="Categories"
        onClick={handleAddClick}
        buttonText="Add Category"
      />
      <div className="grid grid-cols-1 500:grid-cols-2 lg:grid-cols-3 gap-3">
        {Loading ? (
          <>
            {[1, 2, 3].map((skel) => (
              <Skeleton
                key={skel}
                className="bg-[#b9b9b9be] h-42.5 rounded-xl"
              />
            ))}
          </>
        ) : categories.length > 0 ? (
          <>
            {categories.map((item) => (
              <Link key={item?.id} href={`/admin/category/${item?.id}`}>
                <div className="bg-white rounded-xl p-6 shadow-md border-2 border-transparent transition-all hover:-translate-y-1 hover:shadow-md hover:border-primary">
                  {/* Text */}
                  <div className="flex-between">
                    <div className="max-w-55 min-w-40">
                      <h3 className="text-lg max-md:text-md line-1 font-semibold mb-2">
                        {item?.name}
                      </h3>
                      <p className="text-gray-500 max-md:text-sm mb-3 line-3">
                        {item?.description}
                      </p>
                    </div>
                    <CategoryButtons
                      item={item}
                      handleEditClick={handleEditClick}
                    />
                  </div>
                  {/* Stats */}
                  <div className="flex items-center gap-2 text-primary">
                    <Boxes className="w-5 h-5" />
                    <strong>{item?.productCount}</strong> Products
                  </div>
                </div>
              </Link>
            ))}
          </>
        ) : (
          <div className="font-medium text-[18px]">
            There are no categories yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
