"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { handleDeleteUsers } from "../../adminFn/handleDeleteUsers";

const DeleteCustomerComponent = ({ customerId }: { customerId: string }) => {
  const [showDialog, setShowDialog] = useState(false);
  const { push } = useRouter();
  return (
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
                  handleDeleteUsers([customerId]);
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
  );
};

export default DeleteCustomerComponent;
