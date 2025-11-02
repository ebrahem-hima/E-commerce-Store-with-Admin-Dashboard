import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main lang="en">
      <div className="grid grid-cols-[1fr_500px] max-lg:grid-cols-1 gap-4">
        <div className="relative h-[550px] gap-4 max-lg:hidden">
          <Image
            src={`/images/auth/Side Image.webp`}
            // aspect-[1/4]
            fill
            alt="sign-up Image"
            className="rounded-sm object-cover"
          />
        </div>
        <div className="flex-center">{children}</div>
      </div>
    </main>
  );
}
