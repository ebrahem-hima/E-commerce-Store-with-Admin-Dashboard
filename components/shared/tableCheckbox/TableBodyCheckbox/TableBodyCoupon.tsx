"use client";

import { TableBody, TableRow, TableCell } from "@/components/ui/table";
import { SelectCheckBox } from "@/types/typeAliases";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";

export interface CouponAssignment {
  user_profile: { first_name: string; last_name: string; id: string };
}

export interface Coupon {
  id: string;
  coupon_name: string;
  coupon_code: string;
  max_uses_total: number;
  times_used: number;
  usage_limit_per_user: number;
  usage_count: number;
  isPublic: boolean;
  coupon_assignments: CouponAssignment[];
  created_at: string;
  expired_at: string;
}

interface Props {
  dataBody: Coupon[];
  selectCheckBox: SelectCheckBox[];
  handleCheckboxChange: (id: string, checked: boolean) => void;
}

const TableBodyCoupon = ({
  dataBody,
  selectCheckBox,
  handleCheckboxChange,
}: Props) => {
  const { push } = useRouter();

  return (
    <TableBody>
      {dataBody.map((c) => {
        const toDay = new Date();
        const expired = new Date(c.expired_at);
        return (
          <TableRow
            onClick={() => push(`/admin/coupons/updateCoupon/${c.id}`)}
            key={c.id}
            className="h-10 cursor-pointer hover:bg-gray-50/50"
          >
            <TableCell>
              <Checkbox
                checked={selectCheckBox.some(
                  (check) => check.ID === c.id && check.value,
                )}
                onClick={(e) => e.stopPropagation()}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(c.id, checked as boolean)
                }
              />
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <span className="font-medium">{c.coupon_name}</span>
                <span className="text-[#5A607F]">
                  <span className="font-medium">Code:</span> {c.coupon_code}
                </span>
              </div>
            </TableCell>
            <TableCell>
              {c.max_uses_total} / {c.times_used}
            </TableCell>
            <TableCell>
              {expired >= toDay ? (
                c.max_uses_total === c.times_used ? (
                  <span className="px-2 py-1 rounded-sm bg-[#E6E9F4] text-[#5A607F] text-xs font-medium">
                    Expired
                  </span>
                ) : (
                  <span className="px-2 py-1 rounded-sm bg-[#C4F8E2] text-[#06A561] text-xs font-medium">
                    Active
                  </span>
                )
              ) : (
                <span className="px-2 py-1 rounded-sm bg-[#E6E9F4] text-[#5A607F] text-xs font-medium">
                  Expired
                </span>
              )}
            </TableCell>
            <TableCell onClick={(e) => e.stopPropagation()}>
              {!c.isPublic ? (
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <span className="px-2 py-1 rounded-sm bg-[#C4F8E2] text-[#06A561] text-xs font-medium cursor-help underline decoration-dotted underline-offset-2">
                      Specific
                    </span>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 p-0 overflow-hidden bg-white shadow-xl border-gray-200">
                    <div className="bg-gray-50 p-3 border-b">
                      <h4 className="text-sm font-semibold text-gray-700">
                        Assigned Users
                      </h4>
                    </div>
                    <div className="max-h-50 overflow-y-auto">
                      {c.coupon_assignments.map(
                        ({ user_profile: { first_name, last_name, id } }) => (
                          <Link
                            href={`/admin/customers/customerInformation/${id}`}
                            key={id}
                            className="flex items-center justify-between cursor-pointer p-3 border-b last:border-0 hover:bg-gray-50"
                          >
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                                  {(first_name + " " + last_name)
                                    .substring(0, 2)
                                    .toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-800 line-clamp-1">
                                  {first_name + " " + last_name}
                                </span>
                                <span className="text-[10px] text-gray-500">
                                  Remaining:{" "}
                                  {c.usage_limit_per_user - c.usage_count}
                                </span>
                              </div>
                            </div>
                            <div className="text-xs font-medium bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                              {c.usage_count} / {c.usage_limit_per_user}
                            </div>
                          </Link>
                        ),
                      )}
                    </div>
                  </HoverCardContent>
                </HoverCard>
              ) : (
                <span className="px-2 py-1 rounded-sm bg-[#E6E9F4] text-[#5A607F] text-xs font-medium">
                  All Users
                </span>
              )}
            </TableCell>
            <TableCell>
              <div className="text-xs text-gray-600">
                {c.created_at} <span className="mx-1 text-gray-400">/</span>{" "}
                {c.expired_at}
              </div>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default TableBodyCoupon;
