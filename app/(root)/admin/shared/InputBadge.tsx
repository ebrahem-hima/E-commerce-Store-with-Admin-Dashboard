"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const InputBadge = () => {
  const [addMore, setAddMore] = useState(false);
  const [Inputs, setInputs] = useState<string[]>([]);
  const InputValue = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (addMore && InputValue.current) {
      InputValue.current.focus();
    }
  }, [addMore]);

  const handleAddMore = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = InputValue.current;
    if (!input || input.value === "") {
      return toast.info("Please enter option name");
    }
    setInputs((prev) => [...prev, input.value || ""]);
    setAddMore(false);
  };

  const DeleteOption = (ID: number) => {
    setInputs((prev) => prev.filter((_, index) => index !== ID - 1));
  };
  return (
    <>
      <div className="flex flex-col gap-4">
        {Inputs.map((input, index) => (
          <div key={index}>
            <div className="flex-between mb-3">
              <Label>Option {index + 1}</Label>
              <Trash2
                className="cursor-pointer"
                size={20}
                onClick={() => DeleteOption(index + 1)}
              />
            </div>
            <Input placeholder={input} />
          </div>
        ))}
      </div>

      {addMore && (
        <form onSubmit={handleAddMore}>
          <Label>Option Name</Label>
          <Input ref={InputValue} placeholder="Enter Option Name" />
          <Button type="submit" variant="default" size="sm" className="mt-2">
            Apply Option
          </Button>
        </form>
      )}

      <span
        onClick={() => setAddMore(true)}
        className="text-sm cursor-pointer text-blue font-inter font-medium w-fit"
      >
        Add More
      </span>
    </>
  );
};

export default InputBadge;
