"use client";

import CartDetails from "@/components/checkout/CartDetails";
import CartEditor from "@/components/checkout/CartEditor";
import CartLoading from "@/components/checkout/CartLoading";
import CheckoutFrame from "@/components/checkout/CheckoutFrame";
import EmptyCart from "@/components/checkout/EmptyCart";
import { useCheckoutStore } from "@/store/checkout.store";
import React from "react";

const STATIC_CONTENT = {
  errorLog: "Error loading order details: ",
};
export default function HomePage() {
  // const meta = useBrandStore((state) => state.metadata);
  const { refreshOrderDetails, cartItems, loading, error } = useCheckoutStore();

  React.useEffect(() => {
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
