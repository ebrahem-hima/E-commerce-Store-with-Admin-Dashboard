import Filters from "../Navbar/Filters";
import Image from "next/image";
import fetchProductsCategories from "@/app/(root)/(home)/services/fetch-products-categories";

const HeroImageFilters = async () => {
  const data = await fetchProductsCategories();
  if (!data || data.length === 0) return null;
  return (
    <div className="grid gap-10 grid-cols-[300px_1fr] h-85 max-lg:grid-cols-1">
      <Filters filter={data} />
      <div className="relative">
        <Image
          src={`/images/heroImage.webp`}
          alt="Hero-Image"
          priority
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
          className="object-cove rounded-md"
        />
      </div>
    </div>
  );
};

export default HeroImageFilters;
