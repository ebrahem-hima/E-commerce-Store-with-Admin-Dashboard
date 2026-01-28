"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IoClose } from "react-icons/io5";
import { couponDetailType, userType } from "@/types/adminType";
import { Dispatch, SetStateAction, useState } from "react";
import { Label } from "@/components/ui/label";

interface Props {
  users: userType[];
  selectedUsers: userType[];
  setSelectedUsers: Dispatch<SetStateAction<couponDetailType>>;
  setInputSearch: Dispatch<SetStateAction<string>>;
  Loading: boolean;
  setDeletedUsers: Dispatch<SetStateAction<string[]>>;
}

export default function UsersList({
  users,
  selectedUsers,
  setSelectedUsers,
  setInputSearch,
  setDeletedUsers,
}: Props) {
  const [open, setOpen] = useState(false);
  const toggleSelectUser = (user: userType) => {
    setSelectedUsers((prev) => ({
      ...prev,
      appliesTo: prev.appliesTo.some((u) => u.id === user.id)
        ? prev.appliesTo
        : [...prev.appliesTo, user],
    }));
  };

  const removeUser = (id: string) => {
    setSelectedUsers((prev) => ({
      ...prev,
      appliesTo: prev.appliesTo.filter((u) => u.id !== id),
    }));
    setDeletedUsers((prev) => [...prev, id]);
  };

  return (
    <div>
      <Label>Specific User</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="h-8 px-3 text-[#777] hover:text-[#777] border border-[#646363a4] w-full justify-between"
          >
            Select users...
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-(--radix-popover-trigger-width) p-0 border-[#7777777a]">
          <Command>
            <CommandInput
              placeholder="Search users..."
              className="h-9"
              onValueChange={(val) => setInputSearch(val)}
            />
            <CommandList>
              <CommandEmpty>No users found.</CommandEmpty>
              <CommandGroup>
                {users.map((user) => (
                  <CommandItem
                    key={user.id}
                    value={user.email}
                    onSelect={() => {
                      toggleSelectUser(user);
                      setOpen(false);
                    }}
                  >
                    {user.first_name} {user.last_name}
                    <span className="ml-auto text-sm text-gray-500">
                      {user.email}
                    </span>
                    <Check
                      className={cn(
                        "ml-2",
                        selectedUsers.some((u) => u.id === user.id)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>

        <div className="flex flex-wrap gap-2 mt-2">
          {selectedUsers.map((user) => (
            <div
              key={user.id}
              className="relative group flex items-center bg-gray-100 px-3 py-1 rounded"
            >
              <span>
                {user.first_name} {user.last_name}
              </span>
              <IoClose
                size={18}
                className="ml-2 cursor-pointer"
                onClick={() => removeUser(user.id)}
              />

              <div className="absolute top-full left-0 transform mb-2 w-max bg-white border border-gray-300 rounded shadow-lg p-2 text-sm opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50">
                <p className="font-medium">
                  {user.first_name} {user.last_name}
                </p>
                <p className="text-gray-500">{user.email}</p>
              </div>
            </div>
          ))}
        </div>
      </Popover>
    </div>
  );
}
