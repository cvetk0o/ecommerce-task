"use client";

import CartContextProvider from "@/contexts/CartContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ToastProvider } from "@/contexts/ToastContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <CartContextProvider>{children}</CartContextProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
