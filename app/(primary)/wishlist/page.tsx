import MarkedText from "@/components/MarkedText";
import { MarkedTextElements } from "@/components/MarkedText/types";
import Wishlist from "@/components/Wishlist";

export default async function WishlistPage() {
  return (
    <>
      <MarkedText text={"Your Wishlist"} element={MarkedTextElements.h1} />
      <Wishlist />
    </>
  );
}
