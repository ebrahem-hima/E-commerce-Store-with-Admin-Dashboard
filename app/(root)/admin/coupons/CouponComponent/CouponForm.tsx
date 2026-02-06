"use client";

import { MouseEvent, useState } from "react";
import HeaderSaveActions from "../../shared/HeaderSaveActions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useParams, useRouter } from "next/navigation";
import useUserSearchFn from "../../adminHooks/useUserSearch";
import {
  categorySelectType,
  categoryType,
  couponDetailType,
} from "@/types/adminType";
import UsersList from "./UsersList";
import { SelectOptions } from "../../shared/selectOptions";
import {
  handleCreateCoupon,
  handleEditCoupon,
  handleValidation,
} from "../../adminFn/couponFn";
import { couponTypes } from "@/constant/admin/couponConstant";
import { Checkbox } from "@/components/ui/checkbox";
import useGetAllCategories from "../../adminHooks/useGetAllCategories";

interface Props {
  mode: string;
  couponDetail?: couponDetailType;
  categorySelected?: categoryType[];
}

const CouponForm = ({ mode, couponDetail, categorySelected }: Props) => {
  const params = useParams<{ id: string }>();
  const { id } = params;
  const { push } = useRouter();

  const defaultCoupon: couponDetailType = {
    id: 0,
    couponName: "",
    couponCode: "",
    couponType: "",
    discountValue: 0,
    appliesTo: [],
    expired_at: "",
    usage_limit_per_user: 0,
    max_uses_total: 0,
    isPublic: true,
  };

  const [couponDetails, setCouponDetails] = useState<couponDetailType>(
    couponDetail || defaultCoupon,
  );

  const [selectedCategory, setSelectedCategory] = useState<categorySelectType>({
    categorySelected: categorySelected || [],
    categoryDeleted: [],
  });
  const [deletedUsers, setDeletedUsers] = useState<string[]>([]);
  const [inputSearch, setInputSearch] = useState("");

  const { userSearch, Loading } = useUserSearchFn({
    searchText: inputSearch,
  });
  const { categories } = useGetAllCategories();

  const createCoupon = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const validation = await handleValidation(couponDetails);
    if (!validation) return;
    if (mode === "edit") {
      await handleEditCoupon({
        couponDetails,
        id,
        deletedUsers,
        selectedCategory,
      });
    } else if (mode === "create") {
      await handleCreateCoupon(couponDetails, selectedCategory);
    }
    push(`/admin/coupons`);
  };

  const couponFields = [
    {
      id: "discountValue",
      label: "Discount Value",
      type: "number",
      placeholder: "Amount",
      value: couponDetails.discountValue,
    },
    {
      id: "expired_at",
      label: "Expiration Date",
      type: "date",
      value: couponDetails.expired_at,
    },
    {
      id: "usage_limit_per_user",
      label: "Usage Limit Per User",
      type: "number",
      placeholder: "Choose",
      value: couponDetails.usage_limit_per_user,
    },
    {
      id: "max_uses_total",
      label: "Max Uses Total",
      type: "number",
      placeholder: "add max times ",
      value: couponDetails.max_uses_total,
    },
  ];

  // call categories Name
  const category = categories.map((category) => ({
    name: category?.name,
    id: category?.id,
  }));
  return (
    <div>
      <HeaderSaveActions
        onClick={createCoupon}
        title="Create Coupon"
        link="/admin/coupons"
      />
      <div>
        <div className="space-y-6">
          {/* Coupon Information */}
          <div className="space-y-3">
            <p className="text-xl font-semibold">Coupon Information</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="code">Coupon Code</Label>
                <Input
                  id="code"
                  value={couponDetails.couponCode}
                  onChange={(e) =>
                    setCouponDetails((prev) => ({
                      ...prev,
                      couponCode: e.target.value,
                    }))
                  }
                  placeholder="Coupon Code"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="name">Coupon Name</Label>
                <Input
                  id="name"
                  value={couponDetails.couponName}
                  onChange={(e) =>
                    setCouponDetails((prev) => ({
                      ...prev,
                      couponName: e.target.value,
                    }))
                  }
                  placeholder="Free Shipping"
                />
              </div>
            </div>
          </div>

          {/* Coupon Type */}
          <div>
            <p className="text-xl font-semibold">Coupon Type</p>
            <span className="text-sm text-gray-500">
              Type of coupon you want to create
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
              {couponTypes.map((item, i) => (
                <Card
                  onClick={() =>
                    setCouponDetails((prev) => ({
                      ...prev,
                      couponType: item.value,
                    }))
                  }
                  key={i}
                  className={`cursor-pointer rounded-2xl p-2 border ${
                    couponDetails.couponType === item.value
                      ? "border-primary"
                      : "border-white"
                  }`}
                >
                  <CardContent className="flex flex-col items-center justify-center p-6 space-y-3">
                    <item.icon className="w-8 h-8" />
                    <p className="font-medium text-center">{item.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
            {couponFields.map((field) => (
              <div key={field.id} className="relative space-y-1">
                <Label htmlFor={field.id}>{field.label}</Label>
                <Input
                  id={field.id}
                  type={field.type}
                  value={field.value === 0 ? "" : field.value}
                  placeholder={field.placeholder}
                  onChange={(e) =>
                    setCouponDetails((prev) => ({
                      ...prev,
                      [field.id]:
                        field.type === "number"
                          ? Number(e.target.value)
                          : e.target.value,
                    }))
                  }
                />
              </div>
            ))}
            <SelectOptions
              selectedCategory={selectedCategory.categorySelected}
              setSelectedCategory={setSelectedCategory}
              options={category}
            />
          </div>
          {/* public & custom checkbox */}
          <div className="flex items-center gap-2">
            <Checkbox
              onCheckedChange={() => {
                setCouponDetails((prev) => ({
                  ...prev,
                  isPublic: true,
                }));
              }}
              checked={couponDetails.isPublic}
              id="public"
            />
            <Label htmlFor="public">Public</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              onCheckedChange={() => {
                setCouponDetails((prev) => ({
                  ...prev,
                  isPublic: false,
                }));
              }}
              checked={!couponDetails.isPublic}
              id="custom"
            />
            <Label htmlFor="custom">Custom</Label>
          </div>
          {!couponDetails.isPublic && (
            <UsersList
              selectedUsers={couponDetails.appliesTo}
              users={userSearch}
              setSelectedUsers={setCouponDetails}
              Loading={Loading}
              setInputSearch={setInputSearch}
              setDeletedUsers={setDeletedUsers}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CouponForm;
