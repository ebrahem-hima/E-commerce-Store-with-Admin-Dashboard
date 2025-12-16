import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  buttonText?: string;
  link?: string;
  onClick?: () => void;
}

const PageHeader = ({ title, buttonText, link, onClick }: Props) => {
  return (
    <div className="flex-between mb-5">
      <p className="font-medium font-inter text-[20px]">{title}</p>
      {buttonText &&
        (link ? (
          <Button variant="default" size="sm" className="text-sm" asChild>
            <Link href={link || ""}>
              <Plus className="h-5 w-5" /> {buttonText}
            </Link>
          </Button>
        ) : (
          <Button
            onClick={onClick}
            variant="default"
            size="sm"
            className="text-sm"
          >
            <Plus className="h-5 w-5" /> {buttonText}
          </Button>
        ))}
    </div>
  );
};

export default PageHeader;
