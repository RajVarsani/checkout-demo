import {
  ICartProduct,
  IOrderDetails,
  OrderStatus,
  PaymentMethod,
} from "@/interfaces/ICheckout";
import { getOrderDetails } from "@/services/checkout.service";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  cartItems: ICartProduct[];
  loading: boolean;
  error: string | null;
  availablePaymentMethods: PaymentMethod[];
  selectedPaymentMethod: PaymentMethod | null;
  paymentState: {
    [PaymentMethod.UPI]: {
      upiID: string;
      isVerified: boolean;
      error?: boolean;
    };
    [PaymentMethod.CARDS]: {
      cardNumber: string;
      cvv: string;
      expiry: Date;
      name: string;
      isVerified: boolean;
      error: ("number" | "cvv" | "expiry" | "name")[];
    };
  };
  promoCode: string | null;
  stage: "cart" | "payment" | "result";
  orderResult: OrderStatus;
  refreshOrderDetails: (forced?: boolean) => void;
  updateCartItems: (cartItems: ICartProduct[]) => void;
  updatePaymentMethod: (paymentMethod: PaymentMethod) => void;
  getDiscount: (total: number) => number;
  applyPromoCode: () => void;
  removePromoCode: () => void;
  updateStage: (stage: "cart" | "payment" | "result") => void;
  updateOrderResult: (result: OrderStatus) => void;
  updatePaymentState: (state: {
    upi?: {
      upiID?: string;
      isVerified?: boolean;
      error?: boolean;
    };
    card?: {
      cardNumber?: string;
      cvv?: string;
      expiry?: Date;
      name?: string;
      isVerified?: boolean;
      error?: ("number" | "cvv" | "expiry" | "name")[];
    };
  }) => void;
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
      orderResult: OrderStatus.PENDING,
      paymentState: {
        UPI: {
          upiID: "",
          isVerified: false,
        },
        CARDS: {
          cardNumber: "",
          cvv: "",
          // new date of next year
          expiry: new Date(
            new Date().setFullYear(new Date().getFullYear() + 1)
          ),
          name: "",
          isVerified: false,
          error: [],
        },
      },
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
            // reset other states
            promoCode: null,
            stage: "cart",
            orderResult: OrderStatus.PENDING,
            paymentState: {
              UPI: {
                upiID: "",
                isVerified: false,
                error: false,
              },
              CARDS: {
                cardNumber: "",
                cvv: "",
                expiry: new Date(
                  new Date().setFullYear(new Date().getFullYear() + 1)
                ),
                name: "",
                isVerified: false,
                error: [],
              },
            },
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
      updateOrderResult: (result: OrderStatus) => {
        set({ orderResult: result });
      },
      updatePaymentState: (state: {
        upi?: {
          upiID?: string;
          isVerified?: boolean;
          error?: boolean;
        };
        card?: {
          cardNumber?: string;
          cvv?: string;
          expiry?: Date;
          name?: string;
          isVerified?: boolean;
          error?: ("number" | "cvv" | "expiry" | "name")[];
        };
      }) => {
        set({
          paymentState: {
            UPI: {
              ...get().paymentState.UPI,
              ...state.upi,
            },
            CARDS: {
              ...get().paymentState.CARDS,
              ...state.card,
            },
          },
        });
      },
    }),
    {
      name: "cart-store",
    }
  )
);
