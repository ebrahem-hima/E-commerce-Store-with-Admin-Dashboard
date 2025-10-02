import Image from "next/image";
import React from "react";
import CardCategory from "../../../../components/shared/Card/CardCategory";
import { aboutCard } from "../../../../constant/filterNavbar";
import HomeIcons from "../../../../components/shared/HomeIcons";

const page = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 gap-5 items-center md:grid-cols-2 h-[400px]">
        {/* text About */}
        <div>
          <p className="text-[24px] font-medium mb-3">Our Story</p>
          <div className="flex flex-col text-[13px] gap-2">
            <span>
              Launced in 2015, Exlusive is south Asia&apos;s premier online
              shopping makterplace with an active presense in Bangladesh.
              Launced in 2015, Exlusive is south Asia&apos;s premier online
              shopping makterplace with an active presense in Bangladesh.
            </span>
            <span>
              Launced in 2015, Exlusive is south Asia&apos;s premier online
              shopping makterplace with an active presense in Bangladesh.
            </span>
          </div>
        </div>
        <div className="relative h-full">
          <Image src={`/images/Frame 560.webp`} alt="aboutImage" fill />
        </div>
      </div>
      <div
        className="grid gap-2 grid-flow-col
        max-lg:auto-cols-[calc((100%/5))] 
        max-md:auto-cols-[calc((100%/4))] 
        max-sm:auto-cols-[calc((100%/3))]
        max-400:auto-cols-[calc((100%/2))]"
      >
        {aboutCard.map((category) => (
          <CardCategory
            type="about"
            key={category.text}
            icon={category.icon}
            text={category.text}
            value={category.value}
          />
        ))}
      </div>
      <HomeIcons />
    </div>
  );
};

export default page;
