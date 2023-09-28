import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

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
    <body className={cn(inter.className, "bg-gray-50")}>{children}</body>
    </html>
  );
}
