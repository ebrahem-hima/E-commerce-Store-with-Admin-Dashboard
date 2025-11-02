import FilterComponent from "./filterComponent";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface filterType {
  filterName: string;
  items: string[];
}

interface Props {
  handleReset: () => void;
  handleOpenFilter: (idx: number) => void;
  handleFilter: (name: string, item: string) => void;
  filter: filterType[];
  openFilter: { [key: string]: boolean };
  filters: filterType[];
  setFilters: React.Dispatch<React.SetStateAction<filterType[]>>;
  pathName: string;
}

const SearchFilterMobile = ({
  filter,
  handleFilter,
  handleOpenFilter,
  handleReset,
  openFilter,
  setFilters,
  pathName,
  filters,
}: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="lg:hidden hover:bg-hover hover:text-white fixed z-20 bg-primary text-white bottom-3 left-1/2 transform translate-x-[-50%]"
          variant="outline"
        >
          Open Filter
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-3">
        <SheetHeader>
          <VisuallyHidden>
            <SheetTitle>Filter Options</SheetTitle>
          </VisuallyHidden>
        </SheetHeader>

        <div className="flex flex-col">
          <FilterComponent
            filter={filter}
            handleReset={handleReset}
            handleFilter={handleFilter}
            handleOpenFilter={handleOpenFilter}
            openFilter={openFilter}
            setFilters={setFilters}
            pathName={pathName}
            filters={filters}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SearchFilterMobile;
