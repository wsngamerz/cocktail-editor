import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ModeToggle } from "@/components/ModeToggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cocktail Editor",
  description: "A cocktail editor"
};

export default function RootLayout({ children }: {
  children: ReactNode
}) {
  return (
    <html lang="en">
    <body className={cn(inter.className, "bg-gray-50 dark:bg-gray-900")}>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="absolute top-2 right-2">
        <ModeToggle />
      </div>
      {children}
    </ThemeProvider>
    </body>
    </html>
  );
}
