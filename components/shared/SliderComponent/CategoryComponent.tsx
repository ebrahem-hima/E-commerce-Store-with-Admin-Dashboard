import CategoryClientComponent from "./CategoryClientComponent";
import fetchProductsCategories from "@/app/(root)/(home)/services/fetch-products-categories";

const CategoryComponent = async () => {
  const data = await fetchProductsCategories();
  if (!data || data.length === 0) return null;
  return (
    <CategoryClientComponent
      titleComponent="Browse By Category"
      categories={data}
    />
  );
};

export default CategoryComponent;
