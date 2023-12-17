import {
  ICartProduct,
  IOrderDetails,
  PaymentMethod,
} from "@/interfaces/ICheckout";
import { getOrderDetails } from "@/services/checkout.service";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Store = {
  cartItems: ICartProduct[];
  availablePaymentMethods: PaymentMethod[];
  selectedPaymentMethod: PaymentMethod | null;
  loading: boolean;
  error: string | null;
  promoCode: string | null;
  stage: "cart" | "payment" | "result";
  orderResult: "success" | "failure" | "pending";
  refreshOrderDetails: (forced?: boolean) => void;
  updateCartItems: (cartItems: ICartProduct[]) => void;
  updatePaymentMethod: (paymentMethod: PaymentMethod) => void;
  getDiscount: (total: number) => number;
  applyPromoCode: () => void;
  removePromoCode: () => void;
  updateStage: (stage: "cart" | "payment" | "result") => void;
  updateOrderResult: (result: "success" | "failure" | "pending") => void;
};

export const useCheckoutStore = create(
  persist<Store>(
    (set, get) => ({
      cartItems: [],
      availablePaymentMethods: [],
      selectedPaymentMethod: null,
      loading: true,
      error: null,
      promoCode: null,
      stage: "cart",
      orderResult: "pending",
      refreshOrderDetails: async (forced: boolean = false) => {
        if (!forced && get().cartItems.length > 0) return;
        set({ loading: true });
        try {
          const data: IOrderDetails = (await getOrderDetails()).data;
          set({
            cartItems: data.products,
            availablePaymentMethods: data.paymentMethods,
            selectedPaymentMethod: data.paymentMethods[0],
            loading: false,
          });
        } catch (e: any) {
          set({ error: e, loading: false });
        }
      },
      updateCartItems: (cartItems: ICartProduct[]) => {
        set({ cartItems });
      },
      updatePaymentMethod: (paymentMethod: PaymentMethod) => {
        set({ selectedPaymentMethod: paymentMethod });
      },
      applyPromoCode: () => {
        set({
          promoCode: "GROWW",
        });
      },
      getDiscount: (total: number) =>
        get().promoCode ? Math.min(total * 0.1, 10) : 0,
      removePromoCode: () => {
        set({ promoCode: null });
      },
      updateStage: (stage: "cart" | "payment" | "result") => {
        set({ stage });
      },
      updateOrderResult: (result: "success" | "failure" | "pending") => {
        set({ orderResult: result });
      },
    }),
    {
      name: "cart-store",
    }
  )
);
