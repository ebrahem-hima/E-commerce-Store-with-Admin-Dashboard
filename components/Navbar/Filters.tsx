import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { categoriesLinks } from "../../constant/filterNavbar";
import Link from "next/link";

function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-205 p-2 grid grid-cols-5 gap-x-4 gap-y-2">
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

const Filters = ({ filter }: { filter: { name: string; id: number }[] }) => {
  return (
    <div className="max-lg:hidden flex flex-col">
      <NavigationMenuDemo />
      {filter.map((filter) => (
        <Link
          className="w-fit"
          href={`/search?query=${filter.name}`}
          key={filter.id}
        >
          {filter.name}
        </Link>
      ))}
    </div>
  );
};

export default Filters;
