import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HiArrowSmLeft } from "react-icons/hi";

interface Props {
  title?: string;
  link: string;
}

const HeaderSaveActions = ({ title, link }: Props) => {
  return (
    <div className="flex-between mb-6">
      <div>
        <Link href={link} className="flex items-center text-sm text-[#777]">
          <HiArrowSmLeft className="mr-1 h-5 w-5" />
          Back
        </Link>
        <h3 className="text-xl font-semibold">{title || "Clothes"}</h3>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="default" asChild>
          <Link href={link}>Cancel</Link>
        </Button>
        <Button variant="default" size="default">
          Save
        </Button>
      </div>
    </div>
  );
};

export default HeaderSaveActions;
