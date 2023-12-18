"use client";

import CartDetails from "@/components/checkout/CartDetails";
import CartLoading from "@/components/checkout/CartLoading";
import CheckoutFrame from "@/components/checkout/CheckoutFrame";
import EmptyCart from "@/components/checkout/EmptyCart";
import { useCheckoutStore } from "@/store/checkout.store";
import React from "react";

const STATIC_CONTENT = {
  errorLog: "Error loading order details: ",
};
export default function Page() {
  const { refreshOrderDetails, cartItems, loading, error, stage, updateStage } =
    useCheckoutStore();

  React.useEffect(() => {
    if (cartItems.length > 0) {
      if (stage !== "cart") {
        updateStage("cart");
      }
      return;
    }
    refreshOrderDetails();
  }, []);

  const decideComponent = () => {
    if (loading) {
      return <CartLoading />;
    }

    if (error) {
      throw new Error(STATIC_CONTENT.errorLog + error);
    }

    if (!cartItems.length) {
      return <EmptyCart />;
    }

    return <CartDetails />;
  };
  return <CheckoutFrame>{decideComponent()}</CheckoutFrame>;
}
