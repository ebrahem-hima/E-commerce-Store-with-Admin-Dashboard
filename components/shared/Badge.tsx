import React, { Dispatch, SetStateAction } from "react";
import { IoClose } from "react-icons/io5";
import { typeGetCoupon } from "../../types/typeAliases";

interface Props {
  text: string;
  setBadge?: Dispatch<SetStateAction<typeGetCoupon[]>>;
}

const Badge = ({ text, setBadge }: Props) => {
  const deleteBadge = (name: string) => {
    setBadge?.((prev) => prev.filter((badge) => badge?.name !== name));
  };
  return (
    <div
      onClick={() => deleteBadge(text)}
      className="flex items-center gap-1 w-fit px-2 py-1 bg-[#777] rounded-sm text-white !text-sm cursor-pointer"
    >
      <span className="text-[11px]">{text}</span>
      <IoClose />
    </div>
  );
};

export default Badge;
