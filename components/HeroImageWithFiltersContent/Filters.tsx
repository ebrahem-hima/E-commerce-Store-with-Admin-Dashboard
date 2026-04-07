import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import Link from "next/link";
import { createClient } from "@/app/utils/supabase/server";

async function NavigationMenuDemo() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("categories").select(`
    id,
    name
  `);
  if (error) {
    console.error(error);
    return null;
  }
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-100 gap-3 p-6 md:w-125 md:grid-cols-2 lg:w-150 bg-white border rounded-lg">
              {data.map((category) => (
                <li key={category.name}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={`/search?query=${category.name}`}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 hover:text-accent-foreground"
                    >
                      <div className="text-sm font-bold leading-none">
                        {category.name}
                      </div>
                      <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1">
                        Explore latest {category.name} items
                      </p>
                    </Link>
                  </NavigationMenuLink>
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

{
  /* <ul className="w-205 p-2 grid grid-cols-5 gap-x-4 gap-y-2">
  {data.map((category) => (
    <li key={category.name}>
      <NavigationMenuLink asChild>
        <Link
          href={`/search?query=${category.name}`}
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
</ul> */
}
