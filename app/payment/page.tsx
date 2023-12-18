"use client";

import Payment from "@/components/payment/Payment";
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
    orderResult,
  } = useCheckoutStore();

  if (!cartItems.length || !availablePaymentMethods.length) {
    router.push("/");
  }

  if (orderResult === "success" || orderResult === "pending") {
    router.push("/result");
  }

  React.useEffect(() => {
    if (stage !== "payment") {
      updateStage("payment");
      return;
    }
  }, []);

  return <Payment />;
}
