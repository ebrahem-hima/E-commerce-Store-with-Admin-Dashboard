import { DollarSign } from "lucide-react";
import { IoCartOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";

interface Props {
  number: number;
  type: string;
  text: string;
}

const Info = ({ type, text, number }: Props) => {
  const Icon =
    type === "total" ? DollarSign : type === "order" ? IoCartOutline : FaUsers;

  return (
    <span className="w-1/3 flex-between rounded-sm px-4 py-2">
      <div className="flex flex-col gap-1">
        <span className="font-medium text-[20px]">
          {type === "total" ? `$${number}` : number}
        </span>
        <span className="text-[12px] text-[#777]">{text}</span>
        {/* <span className="text-[#47B486] text-[10px]">{percentage}</span> */}
      </div>
      <Icon className="text-blue-600" size={20} />
    </span>
  );
};

export default Info;
