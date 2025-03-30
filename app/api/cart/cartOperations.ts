import { Cart, Product } from "@/types";
import { generateMockId } from "@/utils/uuid";

const DISCOUNT_CODES = ["DISCOUNT20", "TEST_DISCOUNT"];

export function initializeCart(sessionId: string): Cart {
  return {
    cartId: sessionId,
    items: [],
    dateCreated: new Date(),
    numberOfItems: 0,
    subTotalPrice: 0,
    totalPrice: 0,
    discount: {
      percentage: 0,
      amount: 0,
    },
    deliveryFee: 0,
  };
}

export function addProductToCart(cart: Cart, product: Product): Cart {
  const existingItem = cart.items.find(
    (item) => item.product.id === product.id
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({ id: generateMockId(), product, quantity: 1 });
  }
  cart.numberOfItems += 1;
  return calculateCartTotals(cart);
}

export function removeProductFromCart(cart: Cart, cartItemId: string): Cart {
  const itemIndex = cart.items.findIndex((item) => item.id === cartItemId);
  if (itemIndex === -1) throw new Error("Item not found");

  const removedItem = cart.items[itemIndex];
  cart.numberOfItems -= removedItem.quantity;
  cart.items.splice(itemIndex, 1);

  return calculateCartTotals(cart);
}

export function updateProductQuantity(
  cart: Cart,
  cartItemId: string,
  quantity: number
): Cart {
  const cartItem = cart.items.find((item) => item.id === cartItemId);
  if (!cartItem) throw new Error("Item not found");

  const quantityDiff = quantity - cartItem.quantity;
  cart.numberOfItems += quantityDiff;
  cartItem.quantity = quantity;

  return calculateCartTotals(cart);
}

export function applyPromoCode(cart: Cart, promoCode: string): Cart {
  try {
    if (promoCode === "") {
      cart.discount = {
        percentage: 0,
        amount: 0,
      };
      cart.promoCode = undefined;

      return calculateCartTotals(cart);
    }

    if (DISCOUNT_CODES.includes(promoCode)) {
      cart.discount = {
        percentage: 20,
        amount: 0,
      };
      cart.promoCode = promoCode;
    } else {
      throw new Error("Invalid promo code");
    }

    return calculateCartTotals(cart);
  } catch (error) {
    throw error;
  }
}

function calculateCartTotals(cart: Cart): Cart {
  const subTotalPrice = Number(
    cart.items
      .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      .toFixed(2)
  );

  const discountAmount = Number(
    (subTotalPrice * (cart.discount.percentage / 100)).toFixed(2)
  );
  const totalPrice = Number(
    (subTotalPrice - discountAmount + cart.deliveryFee).toFixed(2)
  );

  return {
    ...cart,
    subTotalPrice,
    discount: {
      percentage: cart.discount.percentage,
      amount: discountAmount,
    },
    totalPrice,
  };
}
