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
    <html lang="en" className="text-stone-950 dark:bg-black dark:text-white">
      <body className={inter.className}>
        <div className="grid grid-rows-[72px_1fr]">
          <header className="h-full w-full flex items-center gap-2">
            <span>
              <Image src="/promenade.svg" alt="logo-dark-theme" width={32} height={32} className="hidden dark:block aspect-square mx-2" />
              <Image src="/promenade-black.svg" alt="logo-light-theme" width={32} height={32} className="block dark:hidden aspect-square mx-2" />
            </span>
            <h1 className="text-3xl font-extrabold">Promenade Team</h1>
          </header>
          <main className="h-full w-full">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
