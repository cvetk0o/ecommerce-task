"use client";
import TrashIcon from "../../public/trashcan.svg";
import Image from "next/image";
import { useCartContext } from "@/contexts/CartContext";
import { CartItem } from "@/types";
import { useToast } from "@/contexts/ToastContext";

interface IDeleteProductButtonProps {
  cartItem: CartItem;
}

const DeleteProductButton: React.FC<IDeleteProductButtonProps> = ({
  cartItem,
}) => {
  const { removeCartItem } = useCartContext();
  const { showToast } = useToast();

  const handleRemoveCartItem = async () => {
    const [error] = await removeCartItem(cartItem.id);

    if (error) {
      showToast("Failed to remove cart item:", "error");
    }
  };
  return (
    <div className="cursorPointer" onClick={handleRemoveCartItem}>
      <Image alt="cart" src={TrashIcon} width={24} height={24} />
    </div>
  );
};

export default DeleteProductButton;
