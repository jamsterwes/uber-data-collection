import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Promenade Data Collection",
  description: "Internal development tool for speeding up rideshare data collection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="grid grid-rows-[72px_1fr]">
          <header className="h-full w-full flex items-center gap-2">
            <Image src="/promenade.svg" alt="logo" width={32} height={32} className="aspect-square mx-2" />
            <h1 className="text-3xl font-extrabold text-white">Promenade Team</h1>
          </header>
          <main className="h-full w-full">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
