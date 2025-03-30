"use client";
import { ChangeEvent, useEffect, useState } from "react";
import Button from "../Button";
import TextInput from "../TextInput";
import styles from "./ApplyPromoCode.module.css";
import PromoCodeIcon from "../SVGIcons/PromoCodeIcon";
import { useCartContext } from "@/contexts/CartContext";
import { useToast } from "@/contexts/ToastContext";

const ApplyPromoCode: React.FC = () => {
  const { applyPromoCode, cart } = useCartContext();
  const { showToast } = useToast();
  const [promoCode, setPromoCode] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState(false);

  const isPromoCodeApplied = !!cart?.promoCode;

  const handleApplyPromoCode = async () => {
    if (isPromoCodeApplied) {
      setPromoCode("");
      applyPromoCode("");
      return;
    }

    const [error] = await applyPromoCode(promoCode);

    if (error) {
      setPromoCode("");
      applyPromoCode("");
      showToast("Failed to apply promo code", "error");
      return;
    }
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
