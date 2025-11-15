import { SheetClose } from "../ui/sheet";
import Link from "next/link";
import { categoriesLinks, navbar } from "@/constant/filterNavbar";

interface Props {
  click: boolean;
}

const MobileMenuLinks = ({ click }: Props) => {
  return (
    <div className="flex flex-col">
      {click ? (
        <div className="overflow-y-auto h-[500px]">
          {categoriesLinks.map((category) => (
            <div key={category.name}>
              <ul>
                <SheetClose asChild>
                  <Link
                    href={`/search?query=${category.value}`}
                    className="font-bold cursor-pointer hover:opacity-75"
                  >
                    {category.name}
                  </Link>
                </SheetClose>
                <li className="flex flex-col">
                  {category.values.map((value) => (
                    <SheetClose asChild key={value.value}>
                      <Link
                        href={{
                          pathname: "/search",
                          query: {
                            query: category.value,
                            category: value.value,
                          },
                        }}
                        className="cursor-pointer hover:opacity-75"
                        key={value.name}
                      >
                        {value.name}
                      </Link>
                    </SheetClose>
                  ))}
                </li>
              </ul>
            </div>
          ))}
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
