"use client";
import TrashIcon from "../../public/trashcan.svg";
import Image from "next/image";
import { useCartContext } from "@/contexts/CartContext";
import { CartItem } from "@/types";

interface IDeleteProductButtonProps {
  cartItem: CartItem;
}

const DeleteProductButton: React.FC<IDeleteProductButtonProps> = ({
  cartItem,
}) => {
  const { removeCartItem } = useCartContext();
  return (
    <div
      className="cursorPointer"
      onClick={() => {
        removeCartItem(cartItem.id);
      }}
    >
      <Image alt="cart" src={TrashIcon} width={24} height={24} />
    </div>
  );
};

export default DeleteProductButton;
