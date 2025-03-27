import CartSummary from "@/components/CartSummary";
import MarkedText from "@/components/MarkedText";
import { MarkedTextElements } from "@/components/MarkedText/types";

export default async function CartPage() {
  return (
    <>
      <MarkedText text={"Your Cart"} element={MarkedTextElements.h1} />
      <CartSummary />
    </>
  );
}
