"use client";

import { useTheme } from "@/hooks/useTheme";
import Image from "next/image";
import promoCodeIcon from "../../public/promoCodeIcon.svg";
import promoCodeWhiteIcon from "../../public/promoCodeWhite.svg";

const PromoCodeIcon = () => {
  const theme = useTheme();
  return (
    <Image
      alt="discount"
      src={theme?.theme === "dark" ? promoCodeWhiteIcon : promoCodeIcon}
      width={24}
      height={24}
    />
  );
};

export default PromoCodeIcon;
