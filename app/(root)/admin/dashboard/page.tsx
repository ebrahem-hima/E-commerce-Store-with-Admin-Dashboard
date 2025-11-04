import CustomTable from "@/components/shared/table/customTable";
import Info from "./Info";
import {
  bodyTopMember,
  bodyTopProduct,
  headTopMember,
  headTopProduct,
} from "@/constant/table";
const Page = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Info */}
      <div className="grid grid-cols-5 gap-4">
        <Info />
        <Info />
        <Info />
        <Info />
        <Info />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="font-medium">
          <p>Top Member by Units Sold</p>
          <CustomTable dataBody={bodyTopMember} titles={headTopMember} />
        </div>
        <div>
          <p className="font-medium">Top Products by Units Sold</p>
          <CustomTable dataBody={bodyTopProduct} titles={headTopProduct} />
        </div>
      </div>
    </div>
  );
};

export default Page;
