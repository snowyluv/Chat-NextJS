import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "chat",
  description: "chat",
  openGraph: {
    title: "chat",
  description: "chat",
    type: "website",
    siteName: "chat",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("bg-background text-foreground dark", inter.className)} >
        {children}
        </body>
    </html>
  );
}