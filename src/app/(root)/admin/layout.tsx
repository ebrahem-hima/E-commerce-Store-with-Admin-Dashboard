import Footer from "../../../../components/Footer";
import AdminNavbar from "./AdminNavbar";
// import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <ProductProvider>
    <div className="grid grid-cols-[250px_1fr] gap-4">
      <AdminNavbar />
      {/* <div>a</div> */}
      <div>{children}</div>
      {/* <Footer /> */}
    </div>
    // </ProductProvider>
  );
}
