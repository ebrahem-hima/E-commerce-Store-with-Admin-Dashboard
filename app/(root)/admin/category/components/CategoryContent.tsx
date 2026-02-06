"use client";

import { categoryDetailType } from "@/types/adminType";
import React, { MouseEvent, useEffect, useState } from "react";
import AddCategory from "../AddCategory";
import PageHeader from "../../shared/PageHeader";
import Link from "next/link";
import CategoryButtons from "../categoryButtons";
import { Boxes } from "lucide-react";
import { toast } from "sonner";
import { MESSAGES } from "@/lib/message";

const CategoryContent = ({
  categories,
}: {
  categories: categoryDetailType[];
}) => {
  const [Categories, setCategories] =
    useState<categoryDetailType[]>(categories);

  useEffect(() => {
    setCategories(categories);
  }, [categories]);

  const [showCategory, setShowCategory] = useState(false);
  const [Edit, setEdit] = useState(false);

  const [categoryDetail, setCategoryDetail] =
    useState<categoryDetailType | null>({
      id: 0,
      name: "",
      description: "",
      type: "",
    });
  const handleEditClick = (
    e: MouseEvent<HTMLButtonElement>,
    category: categoryDetailType,
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
  const handleDelete = (id: number) => {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category?.id !== id),
    );
    toast.success(MESSAGES.admin.category.deleteCategory);
  };

  return (
    <div>
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
        {Categories.length > 0 ? (
          <>
            {Categories.map((item) => (
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
                      handleDelete={handleDelete}
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

export default CategoryContent;
