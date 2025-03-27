"use client";

import CartContextProvider from "@/contexts/CartContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <CartContextProvider>{children}</CartContextProvider>
    </ThemeProvider>
  );
}
