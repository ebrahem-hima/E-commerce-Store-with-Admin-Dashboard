import React from "react";
import { IconType } from "react-icons";

interface Props {
  icon: IconType;
  text: string;
  value: string;
}

const CardCategory = ({ icon: Icon, text, value }: Props) => {
  return (
    <div className="snap-start group cursor-pointer flex-center flex-col border border-[rgba(0,0,0,0.3)] rounded-[4px] px-6 py-3 h-[120px] hover:bg-primary hover:border-primary duration-300">
      <span>
        <Icon className="duration-300 group-hover:text-white" size={30} />
      </span>
      <span className="font-Poppins duration-300 group-hover:text-white font-normal font-sm">
        {text}
      </span>
    </div>
  );
};

export default CardCategory;
