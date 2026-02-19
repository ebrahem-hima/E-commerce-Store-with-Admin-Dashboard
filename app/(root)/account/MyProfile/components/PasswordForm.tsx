"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction, ChangeEvent } from "react";

interface PasswordType {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface PasswordFormProps {
  password: PasswordType;
  setPassword: Dispatch<SetStateAction<PasswordType>>;
  setChangeInput: Dispatch<SetStateAction<boolean>>;
}

const PasswordForm = ({
  password,
  setPassword,
  setChangeInput,
}: PasswordFormProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
    setChangeInput(false);
  };

  return (
    <form className="grid mt-6 gap-4">
      {/* Current Password */}
      <div className="flex flex-col">
        <Label htmlFor="currentPassword" className="mb-1 text-sm font-medium">
          Password Changes (leave blank to leave unchanged)
        </Label>
        <Input
          id="currentPassword"
          type="password"
          name="currentPassword"
          value={password.currentPassword || ""}
          onChange={handleChange}
          placeholder="Current Password"
          className="border px-3 py-2 rounded"
        />
      </div>

      {/* New Password & Confirm */}
      <div className="flex md:items-center flex-col md:flex-row gap-4">
        <Input
          id="newPassword"
          type="password"
          name="newPassword"
          value={password.newPassword || ""}
          onChange={handleChange}
          placeholder="New Password"
          className="border px-3 py-2 rounded"
        />
        <Input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          value={password.confirmPassword || ""}
          onChange={handleChange}
          placeholder="Confirm Password"
          className="border px-3 py-2 rounded"
        />
      </div>
    </form>
  );
};

export default PasswordForm;
