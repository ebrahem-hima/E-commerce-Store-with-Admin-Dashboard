import React from "react";

interface Props {
  name: string;
  isPending: boolean;
}

const LoadingName = ({ name, isPending }: Props) => {
  return (
    <div className="w-full relative grid grid-cols-[auto_auto] items-center">
      {name}
      <span className="w-10 h-6 absolute top-1.5 left-[30%]">
        {isPending && (
          <span className="block w-6 h-6 rounded-full border-4 border-white border-t-[#DB4444] animate-spin "></span>
        )}
      </span>
    </div>
  );
};

export default LoadingName;
