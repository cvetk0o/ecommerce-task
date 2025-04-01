import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
