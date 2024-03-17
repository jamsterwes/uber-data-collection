import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { ThemeProvider } from "@/components/theming/theme-provider";
import { ModeToggle } from "@/components/theming/mode-toggle";

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
      <body className={GeistSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

          <header className="grid grid-cols-[1fr_4rem] h-16 items-center">
            <section id="logo-area">

            </section>
            <section id="mode-switcher" className="flex items-center justify-center">
              <ModeToggle />
            </section>
          </header>

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
