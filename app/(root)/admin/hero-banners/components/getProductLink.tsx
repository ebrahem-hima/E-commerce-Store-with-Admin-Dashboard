import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import GetProductSearch from "../hooks/getProductSearch";
import { Product } from "@/types/adminType";

type Props = {
  setSelectedProduct: Dispatch<SetStateAction<Product | null>>;
  selectedProduct: Product | null;
};

const GetProductLink = ({ setSelectedProduct, selectedProduct }: Props) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { products, loading } = GetProductSearch({ search, open });

  return (
    <div className="w-full">
      <Label className="block text-sm font-medium text-gray-700 mb-1">
        Redirect Link (Optional)
      </Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="h-8 px-3 w-full text-[#777] justify-between border-gray-300"
          >
            {selectedProduct?.name || "Select Product..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
          <Command>
            <CommandInput
              placeholder="Search product..."
              value={search}
              onValueChange={setSearch}
            />

            {!loading && products.length === 0 && (
              <CommandEmpty>No results found.</CommandEmpty>
            )}

            {loading ? (
              <div className="flex items-center justify-center py-3 text-md text-muted-foreground">
                <Loader2 className="w-5.5 h-5.5 animate-spin mr-2" />
                Loading...
              </div>
            ) : (
              <CommandGroup className="overflow-y-auto max-h-62.5">
                <>
                  <p
                    onClick={() => {
                      setOpen(false);
                      setSelectedProduct({
                        productId: "",
                        name: "",
                      });
                    }}
                    className="pl-9 py-2 cursor-pointer hover:bg-gray-200!"
                  >
                    Select Product
                  </p>
                  {products.map((product) => (
                    <CommandList key={product.id}>
                      <CommandItem
                        value={product.name}
                        onSelect={() => {
                          setOpen(false);
                          setSelectedProduct({
                            productId: product.id,
                            name: product.name,
                          });
                        }}
                        className="px-0 cursor-pointer hover:bg-gray-200!"
                      >
                        <Check
                          className={cn(
                            "ml-1 mr-2 h-4 w-4",
                            selectedProduct?.productId === product.id
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        <div className="flex items-center gap-2">
                          <Image
                            src={product.img}
                            alt={product.name}
                            width={50}
                            height={50}
                            className="rounded object-cover"
                          />
                          <span>{product.name}</span>
                        </div>
                      </CommandItem>
                    </CommandList>
                  ))}
                </>
              </CommandGroup>
            )}
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default GetProductLink;
