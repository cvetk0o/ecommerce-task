import { renderHook, act } from "@testing-library/react";
import useCart from "../useCart";
import * as cartServices from "@/services/cart";
import { Cart, Product } from "@/types";

jest.mock("@/services/cart", () => ({
  getCart: jest.fn(),
  addItemToCart: jest.fn(),
  removeCartItem: jest.fn(),
  updateCartItemQuantity: jest.fn(),
  applyPromoCodeService: jest.fn(),
}));

const mockProduct: Product = {
  id: 1,
  title: "Test Product",
  price: 99.99,
  image: "test.jpg",
  category: "test",
  rating: { rate: 4.5, count: 100 },
  description: "Test description",
};

const mockCart: Cart = {
  cartId: "test-cart-id",
  items: [
    {
      id: "item-1",
      product: mockProduct,
      quantity: 1,
    },
  ],
  dateCreated: new Date(),
  numberOfItems: 1,
  subTotalPrice: 99.99,
  totalPrice: 99.99,
  discount: {
    percentage: 0,
    amount: 0,
  },
  deliveryFee: 0,
};

describe("useCart", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (cartServices.getCart as jest.Mock).mockResolvedValue(mockCart);
  });

  it("should initialize with null cart and fetch cart details", async () => {
    const { result } = renderHook(() => useCart());

    expect(result.current.cart).toBeNull();
    expect(cartServices.getCart).toHaveBeenCalled();

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.cart).toEqual(mockCart);
  });

  it("should add product to cart successfully", async () => {
    (cartServices.addItemToCart as jest.Mock).mockResolvedValue(mockCart);

    const { result } = renderHook(() => useCart());

    let response;
    await act(async () => {
      response = await result.current.addProductToCart(mockProduct);
    });

    expect(cartServices.addItemToCart).toHaveBeenCalledWith(mockProduct);
    expect(response).toEqual([null, mockCart]);
    expect(result.current.cart).toEqual(mockCart);
  });

  it("should handle add product error", async () => {
    const error = new Error("Failed to add");
    (cartServices.addItemToCart as jest.Mock).mockRejectedValue(error);

    const { result } = renderHook(() => useCart());

    let response;
    await act(async () => {
      response = await result.current.addProductToCart(mockProduct);
    });

    expect(response).toEqual([error.message, null]);
  });

  it("should remove cart item successfully", async () => {
    (cartServices.removeCartItem as jest.Mock).mockResolvedValue(mockCart);

    const { result } = renderHook(() => useCart());

    let response;
    await act(async () => {
      response = await result.current.removeCartItem("item-1");
    });

    expect(cartServices.removeCartItem).toHaveBeenCalledWith("item-1");
    expect(response).toEqual([null, mockCart]);
  });

  it("should check if product is in cart", async () => {
    const { result } = renderHook(() => useCart());

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.isProductInCart(1)).toBe(true);
    expect(result.current.isProductInCart(2)).toBe(false);
  });

  it("should update item quantity successfully", async () => {
    const updatedCart = {
      ...mockCart,
      items: [{ ...mockCart.items[0], quantity: 2 }],
    };
    (cartServices.updateCartItemQuantity as jest.Mock).mockResolvedValue(
      updatedCart
    );

    const { result } = renderHook(() => useCart());

    let response;
    await act(async () => {
      response = await result.current.updateItemQuantity("item-1", 2);
    });

    expect(cartServices.updateCartItemQuantity).toHaveBeenCalledWith(
      "item-1",
      2
    );
    expect(response).toEqual([null, updatedCart]);
  });

  it("should handle invalid quantity", async () => {
    const { result } = renderHook(() => useCart());

    let response;
    await act(async () => {
      response = await result.current.updateItemQuantity("item-1", 0);
    });

    expect(response).toEqual(["Quantity must be at least 1", null]);
  });

  it("should apply promo code successfully", async () => {
    const updatedCart = { ...mockCart, promoCode: "TEST123" };
    (cartServices.applyPromoCodeService as jest.Mock).mockResolvedValue(
      updatedCart
    );

    const { result } = renderHook(() => useCart());

    await act(async () => {
      await Promise.resolve();
    });

    let response;
    await act(async () => {
      response = await result.current.applyPromoCode("TEST123");
    });

    expect(cartServices.applyPromoCodeService).toHaveBeenCalledWith(
      "test-cart-id",
      "TEST123"
    );
    expect(response).toEqual([null, updatedCart]);
  });

  it("should handle promo code error when cart is null", async () => {
    (cartServices.getCart as jest.Mock).mockResolvedValue(null);

    const { result } = renderHook(() => useCart());

    let response;
    await act(async () => {
      response = await result.current.applyPromoCode("TEST123");
    });

    expect(response).toEqual(["No Cart found", null]);
  });
});
