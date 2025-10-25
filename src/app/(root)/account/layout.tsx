import AccountLinks from "./AccountLinks";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-4">
      <AccountLinks />
      <div>{children}</div>
    </div>
  );
}

/*
${
                chooseComponent === "MyProfile" ? "text-primary" : "text-[#999]"
              }
*/
