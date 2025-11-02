import { DollarSign } from "lucide-react";

const Info = () => {
  return (
    <div className="flex-between  rounded-sm px-4 py-2">
      <div className="flex flex-col gap-1">
        <span className="font-medium text-[20px]">$10.54</span>
        <span className="text-[12px] text-[#777]">Total Reven</span>
        <span className="text-[#47B486] text-[10px]">22.45%</span>
      </div>
      <DollarSign className="text-blue-600" size={20} />
    </div>
  );
};

export default Info;
