"use client";

import OrderResult from "@/components/result/OrderResult";
import { useCheckoutStore } from "@/store/checkout.store";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const router = useRouter();
  const {
    cartItems,
    stage,
    updateStage,
    availablePaymentMethods,
    selectedPaymentMethod,
    paymentState,
    orderResult,
  } = useCheckoutStore();

  if (!cartItems.length || !availablePaymentMethods.length) {
    router.push("/");
  }

  if (
    !selectedPaymentMethod ||
    !paymentState[selectedPaymentMethod].isVerified
  ) {
    router.push("/payment");
  }

  React.useEffect(() => {
    if (stage !== "result") {
      updateStage("result");
      return;
    }
  }, []);

  return <OrderResult />;
}
