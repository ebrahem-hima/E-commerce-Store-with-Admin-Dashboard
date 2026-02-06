import HeaderSaveActions from "../../shared/HeaderSaveActions";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getProductsByCategory } from "../services/CategoryDetailService";
import ProductsList from "./ProductsList";

const CategoryDetail = async ({ categoryId }: { categoryId: string }) => {
  const { products, categoryInfo } = await getProductsByCategory(
    Number(categoryId),
  );
  return (
    <div>
      <HeaderSaveActions
        hideSave={true}
        title={categoryInfo?.name || "No Category Name"}
        link="/admin/category"
      />
      <div className="grid grid-cols-1  gap-4">
        {/* Products */}
        <div className="ml-4">
          <p className="mb-2 font-medium text-[18px]">
            Products {products.length}
          </p>
          <ProductsList products={products} />
          <Link
            href={`/admin/products/AddProduct?categoryId=${categoryId}`}
            className="text-sm mt-4 cursor-pointer duration-300 hover:border-[#5656ee00] hover:bg-[#5656ee0c] flex-center py-1 w-full border border-[#77777742] rounded-sm text-blue-500"
          >
            <Plus size={20} /> Add Product
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;
