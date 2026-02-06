import React from "react";
import CategoryContent from "./CategoryContent";
import { getAllCategories } from "../services/CategoryService";

const CategoryWrapper = async () => {
  const data = await getAllCategories();
  return (
    <>
      <CategoryContent categories={data} />
    </>
  );
};

export default CategoryWrapper;
