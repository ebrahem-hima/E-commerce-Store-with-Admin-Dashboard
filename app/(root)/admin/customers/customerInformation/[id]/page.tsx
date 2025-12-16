"use client";

import { useParams, useRouter } from "next/navigation";
import { useCustomerData } from "../../../adminHooks/useCustomerData";
import CustomTable from "@/components/shared/table/customTable";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import HeaderSaveActions from "../../../shared/HeaderSaveActions";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { handleDeleteUsers } from "../../../adminFn/handleDeleteUsers";

export default function Page() {
  const params = useParams<{ id: string }>();
  const { id } = params;
  const { push } = useRouter();
  const { customer, loading, Orders } = useCustomerData(id);
  const [showDialog, setShowDialog] = useState(false);
  const titles = [
    { title: "Order_Code" },
    { title: "Status" },
    { title: "Total" },
    { title: "Date" },
  ];

  return (
    <div className="bg-gray-50">
      <HeaderSaveActions
        title="Customer Details"
        link={`/admin/customers`}
        hideSave={true}
      />
      <div className="max-w-7xl">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_auto] gap-4">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <div className="flex-1 space-y-8 rounded-xl bg-white p-6 shadow-sm">
                {/* Part A: Customer Header Details */}
                <div className="flex flex-row max-sm:flex-col items-center gap-6 border-b border-gray-100 pb-8">
                  {/* Circular Image */}
                  <div className="w-24 h-24 rounded-full bg-[#A1A7C4] text-white flex items-center justify-center text-5xl md:text-5xl">
                    {customer?.name.charAt(0).toUpperCase()}
                  </div>

                  {/* Text Info next to image */}
                  <div className="flex flex-col gap-1 max-sm:text-center">
                    <h1 className="text-md md:text-xl lg:text-2xl font-bold text-gray-900">
                      {customer?.name}
                    </h1>
                    <div className="flex flex-col text-sm text-gray-500">
                      <span>📍 {customer?.country}</span>
                      <span>📦 {Orders?.length} Orders</span>
                      <span>🕒 Member for {customer?.memberSince}</span>
                    </div>
                  </div>
                </div>

                {/* Part B: Simple Orders Table */}
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-gray-800">
                    Recent Orders
                  </h3>
                  <div className="overflow-x-auto">
                    <CustomTable
                      role="admin"
                      dataBody={Orders || []}
                      titles={titles}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full rounded-xl bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-bold text-gray-900">
                  Overview
                </h2>

                <div className="space-y-6">
                  {/* Address */}
                  <div>
                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-400">
                      Address
                    </label>
                    <p className="text-sm leading-relaxed text-gray-700">
                      {customer?.address1} {customer?.address2}
                    </p>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-400">
                      Email
                    </label>
                    <p className="text-sm leading-relaxed text-gray-700">
                      {customer?.email}
                    </p>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-400">
                      Phone
                    </label>
                    <p className="text-sm text-gray-700">{customer?.phone}</p>
                  </div>

                  <hr className="border-gray-100" />

                  {/* Delete Button */}
                  <div>
                    {showDialog && (
                      <Dialog open onOpenChange={setShowDialog}>
                        <DialogContent>
                          <DialogTitle>
                            Are you sure you want to delete this customer?
                          </DialogTitle>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={(e) => {
                                e.preventDefault();
                                setShowDialog(false);
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={(e) => {
                                e.preventDefault();
                                handleDeleteUsers([id]);
                                push(`/admin/customers`);
                              }}
                            >
                              Delete Customer
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                    <Button
                      variant="default"
                      type="button"
                      className="group mx-auto flex w-fit items-center justify-center rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-[#fae6e6] hover:text-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowDialog(true);
                      }}
                    >
                      <Trash2 />
                      Delete Customer
                    </Button>
                    <p className="mt-2 text-center text-xs text-gray-400">
                      This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
