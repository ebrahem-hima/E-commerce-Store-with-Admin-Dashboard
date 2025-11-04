import AdminNavbar from "./AdminNavbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-[250px_1fr] max-md:grid-cols-1 gap-4">
      <AdminNavbar />
      <div>{children}</div>
    </div>
  );
}
