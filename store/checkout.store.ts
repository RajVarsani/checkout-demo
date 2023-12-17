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
  refreshOrderDetails: (forced?: boolean) => void;
  updateCartItems: (cartItems: ICartProduct[]) => void;
  updatePaymentMethod: (paymentMethod: PaymentMethod) => void;
  promoCode: {
    name: string;
    getDiscount: (total: number) => number;
  } | null;
  applyPromoCode: () => void;
  removePromoCode: () => void;
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
          promoCode: {
            name: "GROWW",
            getDiscount: (total: number) => Math.min(total * 0.1, 10),
          },
        });
      },
      removePromoCode: () => {
        set({ promoCode: null });
      },
    }),
    {
      name: "cart-store",
    }
  )
);
