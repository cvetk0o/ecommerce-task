"use client";
import { ChangeEvent, useContext, useState } from "react";
import Button from "../Button";
import TextInput from "../TextInput";
import styles from "./ApplyDiscount.module.css";
import PromoCodeIcon from "../SVGIcons/PromoCodeIcon";
import { CartContextType } from "@/types";
import { CartContext } from "@/contexts/CartContext";

const ApplyDiscount: React.FC = () => {
  const { applyPromoCode } = useContext(CartContext) as CartContextType;
  const [discountCode, setDiscountCode] = useState<string>("");
  return (
    <div className={styles.applyDiscount}>
      <TextInput
        type="text"
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setDiscountCode(event.target.value);
        }}
        icon={<PromoCodeIcon />}
        placeholder="Enter discount code"
      />
      <Button
        onClick={() => {
          applyPromoCode(discountCode);
        }}
      >
        Apply
      </Button>
    </div>
  );
};

export default ApplyDiscount;
