import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

interface ConfirmActionDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onCancel?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isPending?: boolean;
}

export default function ConfirmationModal({
  open,
  setOpen,
  title,
  onConfirm,
  onCancel,
}: ConfirmActionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              onCancel?.(e);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              onConfirm(e);
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
