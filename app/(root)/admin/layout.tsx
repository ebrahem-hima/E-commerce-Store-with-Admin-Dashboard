"use client";

import { useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import IsAdminFn from "@/components/FetchData/IsAdminFn";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { push } = useRouter();
  const { isAdmin, Loading } = IsAdminFn();
  useEffect(() => {
    if (!Loading && !isAdmin) {
      push(`/`);
    }
  }, [push, isAdmin, Loading]);
  return (
    <div className="grid grid-cols-[calc(100%-264px)] max-lg:grid-cols-1 self-end justify-end gap-4 min-h-screen">
      <AdminNavbar />
      <div className="bg-[f4f6fc] px-2">{children}</div>
    </div>
  );
}
