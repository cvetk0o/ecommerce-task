import MarkedText from "@/components/MarkedText";
import { MarkedTextElements } from "@/components/MarkedText/types";

export default async function CartPage() {
  return (
    <>
      <MarkedText text={"CART"} element={MarkedTextElements.h1} />
    </>
  );
}
