import AdminNavbar from "./AdminNavbar";
import { redirect } from "next/navigation";
import { IsAdmin } from "@/app/FetchData/IsAdminFn";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAdmin = await IsAdmin();

  if (!isAdmin) {
    redirect("/");
  }
  return (
    <div className="grid grid-cols-[calc(100%-264px)] max-lg:grid-cols-1 self-end justify-end gap-4 min-h-screen">
      <AdminNavbar />
      <div className="bg-[f4f6fc] px-2">{children}</div>
    </div>
  );
}
