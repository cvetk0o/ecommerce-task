"use client";

import CartContextProvider from "@/contexts/CartContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ToastProvider } from "@/contexts/ToastContext";
import WhishlistContextProvider from "@/contexts/Wishlist";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <CartContextProvider>
          <WhishlistContextProvider>{children}</WhishlistContextProvider>
        </CartContextProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
