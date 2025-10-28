import AdminNavbar from "./AdminNavbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-[250px_1fr] gap-4">
      <AdminNavbar />
      <div>{children}</div>
    </div>
  );
}
