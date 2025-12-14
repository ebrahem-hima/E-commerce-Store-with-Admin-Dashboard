"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MouseEvent } from "react";
import { HiArrowSmLeft } from "react-icons/hi";

interface Props {
  title?: string;
  link: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => Promise<void>;
  hideSave?: boolean;
}

const HeaderSaveActions = ({
  title,
  link,
  onClick,
  hideSave = false,
}: Props) => {
  return (
    <div className="flex-between mb-6">
      <div>
        <Link href={link} className="flex items-center text-sm text-[#777]">
          <HiArrowSmLeft className="mr-1 h-5 w-5" />
          Back
        </Link>
        <h3 className="text-xl font-semibold">{title || "Clothes"}</h3>
      </div>
      {!hideSave && (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="default" asChild>
            <Link href={link}>Cancel</Link>
          </Button>

          <Button onClick={onClick} variant="default" size="default">
            Save
          </Button>
        </div>
      )}
    </div>
  );
};

export default HeaderSaveActions;
