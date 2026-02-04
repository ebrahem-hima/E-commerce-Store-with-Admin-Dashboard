"use client";

import { markMessageAsSeen } from "@/app/(root)/admin/inbox/InboxActions";
import InboxPopup from "@/app/(root)/admin/inbox/InboxPopup";
import { Checkbox } from "@/components/ui/checkbox";
import { TableBody, TableRow, TableCell } from "@/components/ui/table";
import { SelectCheckBox } from "@/types/typeAliases";
import { useState } from "react";

export interface InboxMessage {
  id: number;
  user_profile: { first_name: string; email: string; phone: string };
  message: string;
  status: "New" | "Seen" | "Reply" | string;
  created_at: string;
}

interface MessageType {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  status: string;
}

interface Props {
  dataBody: InboxMessage[];
  selectCheckBox: SelectCheckBox[];
  handleCheckboxChange: (ID: string | number, checked: boolean) => void;
}

const TableBodyInbox = ({
  dataBody,
  selectCheckBox,
  handleCheckboxChange,
}: Props) => {
  const [onOpenChange, setonOpenChange] = useState(false);
  const [MessageDetails, setMessageDetails] = useState<MessageType | null>(
    null,
  );
  return (
    <>
      <TableBody>
        {dataBody.map((c) => (
          <TableRow
            onClick={() => {
              setonOpenChange(true);
              setMessageDetails({
                id: c.id,
                name: c.user_profile.first_name,
                email: c.user_profile.email,
                phone: c.user_profile.phone,
                message: c.message,
                date: c.created_at,
                status: c.status,
              });
              markMessageAsSeen(c.id);
            }}
            key={c.id}
            className="h-10 cursor-pointer"
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
            <TableCell className="overflow-hidden">
              {c.user_profile.email}
            </TableCell>
            <TableCell>{c.message}</TableCell>
            <TableCell>
              <span
                className={`text-center px-3 py-1 rounded-md font-medium ${
                  c.status === "New"
                    ? "text-green-700 bg-green-100"
                    : c.status === "Seen"
                      ? "text-gray-600 bg-gray-200"
                      : c.status === "Reply"
                        ? "text-blue-700 bg-blue-100"
                        : "text-black bg-white"
                }`}
              >
                {c.status}
              </span>
            </TableCell>
            <TableCell>{c.created_at}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      {onOpenChange && (
        <InboxPopup
          onOpenChange={setonOpenChange}
          isOpen={onOpenChange}
          data={MessageDetails}
        />
      )}
    </>
  );
};

export default TableBodyInbox;
