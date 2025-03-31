import { Cart, Product } from "@/types";
import { renderHook, act } from "@testing-library/react";
import useCart from ".";
import {
  jest,
  expect,
  describe,
  beforeEach,
  afterEach,
  it,
} from "@jest/globals";

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

// @ts-expect-error - fetch is not available in global type definitions for tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockCart),
  })
);

beforeEach(() => {
  jest.clearAllMocks();
});
afterEach(() => {
  jest.clearAllMocks();
});

describe("useCart", () => {
  it("should make API call and update cart", async () => {
    const { result } = renderHook(() => useCart());
    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.isProductInCart(1)).toBe(true);
    expect(result.current.isProductInCart(2)).toBe(false);
  });
});
