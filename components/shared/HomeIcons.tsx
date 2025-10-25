import React from "react";
import { homeIcons } from "../../constant/filterNavbar";

const HomeIcons = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 max-sm:gap-3">
      {homeIcons.map((icon, id) => (
        <div className="flex-center flex-col gap-1" key={id}>
          <icon.icon
            size={45}
            className="bg-black mb-2 p-1 text-white border-6 border-[#999] rounded-full"
          />
          <span className="text-[12px] font-medium">
            {icon.text.toUpperCase()}
          </span>
          <span className="text-[10px] text-[#777]">{icon.description}</span>
        </div>
      ))}
    </div>
  );
};

export default HomeIcons;
