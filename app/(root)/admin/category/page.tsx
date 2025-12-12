"use client";

import PageHeader from "../shared/PageHeader";
import Link from "next/link";
import { useState } from "react";
import AddCategory from "./AddCategory";
import { Boxes } from "lucide-react";
import useCategory from "../adminHooks/useGetCategory";
import { Skeleton } from "@/components/ui/skeleton";
import CategoryButtons from "./categoryButtons";
import CategoryRealTime from "./categoryRealTime";

const Page = () => {
  const [showCategory, setShowCategory] = useState(false);
  const [Edit, setEdit] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const {
    handleGetCategory,
    handleDeleteCategory,
    categoryDetail,
    categories,
    Loading,
    setCategoryDetail,
    setCategories,
  } = useCategory();
  return (
    <div>
      <CategoryRealTime setCategories={setCategories} />
      {showCategory && (
        <div>
          <div className="absolute top-0 left-0 z-50 bg-black/75 w-full h-full"></div>
          <AddCategory
            Edit={Edit}
            categoryDetail={categoryDetail}
            setShowCategory={setShowCategory}
          />
        </div>
      )}
      <PageHeader
        title="Categories"
        onClick={() => {
          setShowCategory(true);
          setEdit(false);
          setCategoryDetail(null);
        }}
        buttonText="Add Category"
      />
      <div className="grid grid-cols-1 500:grid-cols-2 lg:grid-cols-3 gap-3">
        {Loading ? (
          <>
            <Skeleton className="bg-[#b9b9b9be] h-[170px] rounded-xl" />
            <Skeleton className="bg-[#b9b9b9be] h-[170px] rounded-xl" />
            <Skeleton className="bg-[#b9b9b9be] h-[170px] rounded-xl" />
          </>
        ) : categories.length > 0 ? (
          <>
            {categories.map((item) => (
              <Link key={item?.id} href={`/admin/category/${item?.id}`}>
                <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-transparent transition-all hover:-translate-y-1 hover:shadow-lg hover:border-primary">
                  {/* Text */}
                  <div className="flex-between">
                    <div className="max-w-[220px] min-w-40">
                      <h3 className="text-lg max-md:text-md line-1 font-semibold mb-2">
                        {item?.name}
                      </h3>
                      <p className="text-gray-500 max-md:text-sm mb-3 line-3">
                        {item?.description}
                      </p>
                    </div>
                    <CategoryButtons
                      setEdit={setEdit}
                      itemId={item?.id || 0}
                      handleGetCategory={handleGetCategory}
                      setShowCategory={setShowCategory}
                      handleDeleteCategory={handleDeleteCategory}
                      showDeleteDialog={showDeleteDialog}
                      setShowDeleteDialog={setShowDeleteDialog}
                    />
                  </div>
                  {/* Stats */}
                  <div className="flex items-center gap-2 text-primary">
                    <Boxes className="w-5 h-5" />
                    <strong>15</strong> Products
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
