import React from "react";
import { IconType } from "react-icons";

interface Props {
  icon: IconType;
  text: string;
  value: string;
  type?: string;
}

const CardCategory = ({ icon: Icon, text, value, type }: Props) => {
  return (
    <div className="snap-start group cursor-pointer flex-center flex-col gap-1 border border-[rgba(0,0,0,0.3)] rounded-[4px] h-[130px] hover:bg-primary hover:border-primary duration-300">
      <span>
        <Icon className="duration-300 group-hover:text-white" size={30} />
      </span>
      <span
        className={`duration-300 ${
          type === "about" && "text-[18px] font-bold"
        } group-hover:text-white text-sm`}
      >
        {text}
      </span>
      {type === "about" && (
        <span className="duration-300 text-[11px] group-hover:text-white">
          {value}
        </span>
      )}
    </div>
  );
};

export default CardCategory;
