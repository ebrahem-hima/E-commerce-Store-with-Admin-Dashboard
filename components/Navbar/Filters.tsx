"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { categoriesLinks, filter } from "../../constant/filterNavbar";
import Link from "next/link";

function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-[820px] p-2 grid grid-cols-5 gap-x-4 gap-y-2">
              {categoriesLinks.map((category) => (
                <li key={category.name}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={`/search?query=${category.value}`}
                      className="font-bold cursor-pointer hover:opacity-75"
                    >
                      {category.name}
                    </Link>
                  </NavigationMenuLink>
                  <div className="flex flex-col text-sm">
                    {category.values.map((value) => (
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
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const Filters = () => {
  return (
    <div className="max-lg:hidden flex flex-col">
      <NavigationMenuDemo />
      {filter.map((filter) => (
        <Link
          className="w-fit"
          href={`/search?query=${filter.value}`}
          key={filter.text}
        >
          {filter.text}
        </Link>
      ))}
    </div>
  );
};

export default Filters;
