"use client";

import Image from "next/image";
import { TableBody, TableRow, TableCell } from "@/components/ui/table";
import { SelectCheckBox } from "@/types/typeAliases";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import PriceDisplay from "../../priceDisplay";

interface Product {
  id: string;
  img: string;
  name: string;
  stock: number;
  price: number;
  discount: number;
  discount_type: string;
  categories?: { name: string };
  created_at: string;
}

interface Props {
  dataBody: Product[];
  selectCheckBox: SelectCheckBox[];
  handleCheckboxChange: (id: string, checked: boolean) => void;
}

const TableBodyProduct = ({
  dataBody,
  selectCheckBox,
  handleCheckboxChange,
}: Props) => {
  const { push } = useRouter();

  return (
    <TableBody>
      {dataBody.map((p) => (
        <TableRow
          onClick={() => push(`/admin/products/updateProduct/${p.id}`)}
          key={p.id}
          className="cursor-pointer hover:bg-[#f1f1f196] h-10 font-medium"
        >
          <TableCell>
            <Checkbox
              checked={selectCheckBox.some(
                (check) => check.ID === p.id && check.value,
              )}
              onClick={(e) => e.stopPropagation()}
              onCheckedChange={(checked) =>
                handleCheckboxChange(p.id, checked as boolean)
              }
            />
          </TableCell>
          <TableCell className="flex items-center gap-2">
            <Image
              src={p.img}
              alt="product-img"
              width={55}
              height={55}
              className="rounded-md"
            />
            <span className="line-clamp-2 max-w-42.5">{p.name}</span>
          </TableCell>
          <TableCell>
            {p.stock > 0 ? (
              <span>{p.stock} in stock</span>
            ) : (
              <span className="bg-[#E6E9F4] text-[#5A607F] rounded-sm px-2 py-1">
                Out of Stock
              </span>
            )}
          </TableCell>
          <TableCell>
            <PriceDisplay
              isProduct={true}
              price={p.price}
              discount={p.discount}
              discountType={p.discount_type}
            />
          </TableCell>
          <TableCell>{p.categories?.name}</TableCell>
          <TableCell>{p.created_at}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableBodyProduct;
