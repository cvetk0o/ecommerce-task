import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-commerce Task",
  description: "",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${workSans.variable}`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
