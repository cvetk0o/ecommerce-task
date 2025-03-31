import {
  getCart,
  addItemToCart,
  removeCartItem,
  updateCartItemQuantity,
  applyPromoCodeService,
} from "..";
import { Cart, Product } from "@/types";

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

describe("Cart Service", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    jest.clearAllMocks();
  });

  describe("getCart", () => {
    it("should fetch cart successfully", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCart),
      });

      const result = await getCart();

      expect(global.fetch).toHaveBeenCalledWith("/api/cart");
      expect(result).toEqual(mockCart);
    });

    it("should handle fetch error", async () => {
      const error = new Error("Network error");
      (global.fetch as jest.Mock).mockRejectedValueOnce(error);

      await expect(getCart()).rejects.toThrow("Network error");
    });
  });

  describe("addItemToCart", () => {
    it("should add item successfully", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCart),
      });

      const result = await addItemToCart(mockProduct);

      expect(global.fetch).toHaveBeenCalledWith("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mockProduct),
      });
      expect(result).toEqual(mockCart);
    });

    it("should handle api error response", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ error: "Failed to add item" }),
      });

      await expect(addItemToCart(mockProduct)).rejects.toThrow(
        "Failed to add item"
      );
    });
  });

  describe("removeCartItem", () => {
    it("should remove item successfully", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCart),
      });

      const result = await removeCartItem("item-1");

      expect(global.fetch).toHaveBeenCalledWith("/api/cart?itemId=item-1", {
        method: "DELETE",
      });
      expect(result).toEqual(mockCart);
    });
  });

  describe("updateCartItemQuantity", () => {
    it("should update quantity successfully", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCart),
      });

      const result = await updateCartItemQuantity("item-1", 2);

      expect(global.fetch).toHaveBeenCalledWith("/api/cart?itemId=item-1", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: 2 }),
      });
      expect(result).toEqual(mockCart);
    });
  });

  describe("applyPromoCodeService", () => {
    it("should apply promo code successfully", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCart),
      });

      const result = await applyPromoCodeService("test-cart-id", "PROMO123");

      expect(global.fetch).toHaveBeenCalledWith("/api/cart?applyPromoCode", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ promoCode: "PROMO123", cartId: "test-cart-id" }),
      });
      expect(result).toEqual(mockCart);
    });

    it("should handle invalid promo code", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ error: "Invalid promo code" }),
      });

      await expect(
        applyPromoCodeService("test-cart-id", "INVALID")
      ).rejects.toThrow("Invalid promo code");
    });
  });
});
