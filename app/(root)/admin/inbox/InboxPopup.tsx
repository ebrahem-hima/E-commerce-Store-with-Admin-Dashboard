"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send } from "lucide-react";
import { createClient } from "@/app/utils/supabase/client";
import { sendEmailReply } from "./hooks/sendEmail";
import { toast } from "sonner";

export interface MessageType {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  status: string;
}

interface InboxPopupProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  data: MessageType | null;
}

const InboxPopup = ({ isOpen, onOpenChange, data }: InboxPopupProps) => {
  const [replyText, setReplyText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendReply = async () => {
    if (!replyText.trim()) return;

    setIsSending(true);
    const Resend = await sendEmailReply(
      data?.email || "",
      data?.name || "",
      replyText,
      data?.message || "",
    );
    if (Resend.success) {
      toast.success("Email has been sended");
      const changeMessageStatus = async () => {
        const supabase = createClient();
        const { error } = await supabase
          .from("inbox")
          .update({ status: "Reply" })
          .eq("id", data?.id)
          .maybeSingle();
        if (error) {
          console.log("error", error);
        }
      };
      if (data?.status === "Seen") changeMessageStatus();
    }
    if (!Resend.success) {
      toast.error("Something Went Wrong");
    }
    setIsSending(false);
    setReplyText("");
    onOpenChange(false);
  };

  if (!data) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-150 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Message Details</DialogTitle>
          <DialogDescription>
            Review the message sent by {data.name} and send a reply.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-muted-foreground">
                Name
              </Label>
              <Input
                id="name"
                value={data.name}
                readOnly
                className="bg-muted/50"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone" className="text-muted-foreground">
                Phone
              </Label>
              <Input
                id="phone"
                value={data.phone}
                readOnly
                className="bg-muted/50"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email" className="text-muted-foreground">
              Email
            </Label>
            <Input
              id="email"
              value={data.email}
              readOnly
              className="bg-muted/50"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="message" className="text-muted-foreground">
              Original Message
            </Label>
            <Textarea
              id="message"
              value={data.message}
              readOnly
              className="bg-muted/50 min-h-25 resize-none focus-visible:ring-0"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="reply" className="font-bold text-primary">
              Your Reply
            </Label>
            <Textarea
              id="reply"
              placeholder="Type your response here..."
              className="min-h-30"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSending}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSendReply}
            disabled={isSending || !replyText.trim()}
          >
            {isSending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Reply
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InboxPopup;
