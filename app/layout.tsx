import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { ThemeProvider } from "@/components/theming/theme-provider";
import { ModeToggle } from "@/components/theming/mode-toggle";
import { WordMark } from "@/components/word-mark";
import { NavMenu } from "@/components/nav-menu";
import { cn } from "@/lib/utils";

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
      <body className={cn(
        GeistSans.className,
        "grid grid-rows-[4rem_1fr] h-screen"
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="grid grid-cols-[1fr_4rem] h-16 items-center border-b">
            <section id="logo-area" className="flex gap-4">
              <WordMark />
              <NavMenu />
            </section>
            <section id="mode-switcher" className="flex items-center justify-center">
              <ModeToggle />
            </section>
          </header>
          <main>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
