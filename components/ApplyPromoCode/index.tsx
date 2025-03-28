"use client";
import { ChangeEvent, useContext, useState } from "react";
import Button from "../Button";
import TextInput from "../TextInput";
import styles from "./ApplyPromoCode.module.css";
import PromoCodeIcon from "../SVGIcons/PromoCodeIcon";
import { CartContextType } from "@/types";
import { CartContext } from "@/contexts/CartContext";

const ApplyPromoCode: React.FC = () => {
  const { applyPromoCode, cart } = useContext(CartContext) as CartContextType;
  const [promoCode, setPromoCode] = useState<string>("");

  const isPromoCodeApplied = !!cart?.promoCode;
  return (
    <div className={styles.applyDiscount}>
      <TextInput
        type="text"
        value={isPromoCodeApplied ? cart.promoCode : promoCode}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setPromoCode(event.target.value);
        }}
        icon={<PromoCodeIcon />}
        placeholder="Enter Promo code"
        disabled={isPromoCodeApplied}
      />
      <Button
        onClick={() => {
          if (isPromoCodeApplied) {
            setPromoCode("");
          }
          applyPromoCode(isPromoCodeApplied ? "" : promoCode);
        }}
      >
        {isPromoCodeApplied ? "Cancel" : "Apply"}
      </Button>
    </div>
  );
};

export default ApplyPromoCode;
