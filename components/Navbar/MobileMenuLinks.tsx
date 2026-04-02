import { SheetClose } from "../ui/sheet";
import Link from "next/link";
import { navbar } from "@/constant/filterNavbar";
import LoadingSpinner from "../Loaders/LoadingSpinner";
import useGetFilters from "./Hooks/useGetFilters";

const MobileMenuLinks = ({ click }: { click: boolean }) => {
  const { filter, Loading } = useGetFilters();
  return (
    <div className="flex flex-col">
      {click ? (
        <div className="overflow-y-auto h-125">
          {Loading ? (
            <LoadingSpinner />
          ) : (
            filter.map((category) => (
              <div key={category.name}>
                <ul>
                  <SheetClose asChild>
                    <Link
                      href={`/search?query=${category.name}`}
                      className="font-bol cursor-pointer hover:opacity-75"
                    >
                      {category.name}
                    </Link>
                  </SheetClose>
                </ul>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="flex flex-col font-medium text-[17px] gap-1">
          {navbar.map((nav) => (
            <SheetClose asChild key={nav.text}>
              <Link
                className="action:ml-5 hover:ml-5 duration-300"
                href={nav.link}
              >
                {nav.text}
              </Link>
            </SheetClose>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileMenuLinks;
