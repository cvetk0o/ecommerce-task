"use client";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import Button from "../Button";
import TextInput from "../TextInput";
import styles from "./ApplyPromoCode.module.css";
import PromoCodeIcon from "../SVGIcons/PromoCodeIcon";
import { CartContextType } from "@/types";
import { CartContext } from "@/contexts/CartContext";

const ApplyPromoCode: React.FC = () => {
  const { applyPromoCode, cart } = useContext(CartContext) as CartContextType;
  const [promoCode, setPromoCode] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState(false);

  const isPromoCodeApplied = !!cart?.promoCode;

  const handleApplyPromoCode = () => {
    if (isPromoCodeApplied) {
      setPromoCode("");
      applyPromoCode("");
      return;
    }

    applyPromoCode(promoCode);
  };

  useEffect(() => {
    if (isPromoCodeApplied) {
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 500);
    }
  }, [isPromoCodeApplied, isSuccess]);
  return (
    <div
      className={`${styles.applyDiscount} ${isSuccess ? styles.success : ""}`}
    >
      <TextInput
        type="text"
        value={isPromoCodeApplied ? cart.promoCode : promoCode}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setPromoCode(event.target.value);
        }}
        icon={<PromoCodeIcon />}
        placeholder="Enter Promo code"
        disabled={isPromoCodeApplied}
        inputClassName={isPromoCodeApplied ? styles.inputSuccess : ""}
      />
      <Button onClick={handleApplyPromoCode}>
        {isPromoCodeApplied ? "Cancel" : "Apply"}
      </Button>
    </div>
  );
};

export default ApplyPromoCode;
