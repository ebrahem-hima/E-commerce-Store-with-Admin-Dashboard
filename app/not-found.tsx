import { Button } from "@/components/ui/button";
import React from "react";

const notFound = () => {
  return (
    <div className="flex-center flex-col mt-14">
      <h1 className="font-inter font-medium text-[80px] max-md:text-[60px] max-sm:text-[40px] max-2xl leading-[80px] tracking-[0.03em]">
        404 Not Found
      </h1>
      <p className="font-poppins font-normal text-[12px] leading-[24px]">
        Your visited page not found. You may go home page.
      </p>
      <Button className="mt-6 max-md:mt-3 px-4">Back to home page</Button>
    </div>
  );
};

export default notFound;
