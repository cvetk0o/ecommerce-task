import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import ApplyPromoCode from "..";
import { useCartContext } from "@/contexts/CartContext";
import { useToast } from "@/contexts/ToastContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

jest.mock("@/contexts/CartContext");
jest.mock("@/contexts/ToastContext");

const renderWithProviders = (component: React.ReactNode) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe("ApplyPromoCode", () => {
  const mockApplyPromoCode = jest.fn();
  const mockShowToast = jest.fn();

  beforeEach(() => {
    (useCartContext as jest.Mock).mockReturnValue({
      cart: { promoCode: "" },
      applyPromoCode: mockApplyPromoCode,
    });

    (useToast as jest.Mock).mockReturnValue({
      showToast: mockShowToast,
    });

    jest.clearAllMocks();
  });

  it("renders promo code input and apply button", () => {
    renderWithProviders(<ApplyPromoCode />);

    expect(screen.getByPlaceholderText("Enter Promo code")).toBeInTheDocument();
    expect(screen.getByText("Apply")).toBeInTheDocument();
  });

  it("handles successful promo code application", async () => {
    mockApplyPromoCode.mockResolvedValue([null, { promoCode: "TEST123" }]);

    renderWithProviders(<ApplyPromoCode />);

    const input = screen.getByPlaceholderText("Enter Promo code");
    const applyButton = screen.getByText("Apply");

    fireEvent.change(input, { target: { value: "TEST123" } });

    await act(async () => {
      fireEvent.click(applyButton);
    });

    expect(mockApplyPromoCode).toHaveBeenCalledWith("TEST123");
  });

  it("handles failed promo code application", async () => {
    mockApplyPromoCode.mockResolvedValue(["Invalid code", null]);

    renderWithProviders(<ApplyPromoCode />);

    const input = screen.getByPlaceholderText("Enter Promo code");
    const applyButton = screen.getByText("Apply");

    fireEvent.change(input, { target: { value: "INVALID" } });

    await act(async () => {
      fireEvent.click(applyButton);
    });

    expect(mockShowToast).toHaveBeenCalledWith("Wrong promo code", "error");
    expect(input).toHaveValue("");
  });

  it("shows cancel button when promo code is applied", () => {
    (useCartContext as jest.Mock).mockReturnValue({
      cart: { promoCode: "TEST123" },
      applyPromoCode: mockApplyPromoCode,
    });

    renderWithProviders(<ApplyPromoCode />);

    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByDisplayValue("TEST123")).toBeDisabled();
  });

  it("handles promo code cancellation", async () => {
    (useCartContext as jest.Mock).mockReturnValue({
      cart: { promoCode: "TEST123" },
      applyPromoCode: mockApplyPromoCode,
    });

    renderWithProviders(<ApplyPromoCode />);

    const cancelButton = screen.getByText("Cancel");

    await act(async () => {
      fireEvent.click(cancelButton);
    });

    expect(mockApplyPromoCode).toHaveBeenCalledWith("");
  });
});
