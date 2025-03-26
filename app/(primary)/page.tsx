import MarkedText from "@/components/MarkedText";
import { MarkedTextElements } from "@/components/MarkedText/types";

export default function Home() {
  return (
    <div>
      <MarkedText text="Welcome to Ecommerce" element={MarkedTextElements.h1} />
    </div>
  );
}
