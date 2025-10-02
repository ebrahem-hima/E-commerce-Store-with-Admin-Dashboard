import React from "react";
import { footer } from "../constant/filterNavbar";
import Link from "next/link";

const Footer = () => {
  const register = "Register";
  return (
    <div className="mt-10 py-10 bg-black text-white grid grid-cols-1 max-md:text-center md:grid-cols-2 lg:grid-cols-4 gap-4 !px-10 max-md:!px-1 max-sm:px-0">
      {footer.map((foot) => (
        <div key={foot.title}>
          <p className="font-inter text-[18px] mb-3">{foot.title}</p>
          <div className="flex flex-col gap-1">
            {foot.textArr.map((text) => (
              <div key={text.text}>
                {text.link ? (
                  <span className="text-[10px] cursor-pointer">
                    {text.text === "Login" ? (
                      <>
                        <Link href={text.link}>{text.text}</Link>
                        <span className="mx-1">/</span>
                        <Link href={`/sign-up`}>{register}</Link>
                      </>
                    ) : (
                      <Link href={text.link}>{text.text}</Link>
                    )}
                  </span>
                ) : (
                  <span className="text-[12px]">{text.text}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Footer;
