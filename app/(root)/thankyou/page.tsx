"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Page() {
  const name = "EbrahemAhmed";
  const { push } = useRouter();
  return (
    <div className="flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-primary mb-4">
          🎉 Thank you, {name}!
        </h1>
        <p className="text-gray-600 mb-6">
          Your order has been successfully completed! We appreciate your
          purchase and will process your order as soon as possible.
        </p>
        <Button
          onClick={() => push("/")}
          className="px-6 py-2 bg-primary hover:bg-hover text-white rounded-lg transition"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}
