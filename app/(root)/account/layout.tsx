"use client";

import { useProductContext } from "@/context/productContext";
import AccountLinks from "./AccountLinks";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = useProductContext();
  const { push } = useRouter();
  if (!userId) push(`/log-in`);
  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-4">
      <AccountLinks />
      <div>{children}</div>
    </div>
  );
}
