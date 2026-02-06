"use client";

import { Button } from "@/components/ui/button";
import { typeMode } from "@/types/adminType";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { MouseEvent } from "react";
import { HiArrowSmLeft } from "react-icons/hi";

interface Props {
  title?: string;
  link: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => Promise<void | false>;
  hideSave?: boolean;
  mode?: typeMode;
  Loading?: boolean;
}

const HeaderSaveActions = ({
  title,
  link,
  onClick,
  hideSave = false,
  mode,
  Loading,
}: Props) => {
  return (
    <div className="flex-between mb-6">
      <div>
        <Link href={link} className="flex items-center text-sm text-[#777]">
          <HiArrowSmLeft className="mr-1 h-5 w-5" />
          Back
        </Link>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      {!hideSave && (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="default" asChild>
            <Link href={link}>Cancel</Link>
          </Button>

          <Button
            disabled={Loading}
            onClick={onClick}
            variant="default"
            size="default"
          >
            {Loading ? <Loader2 className=" h-4 w-4 animate-spin" /> : ""}
            {mode === "edit" ? "Update" : "Add"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default HeaderSaveActions;
