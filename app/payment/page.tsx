"use client";

import Payment from "@/components/payment/Payment";
import { useCheckoutStore } from "@/store/checkout.store";
import { notifications } from "@mantine/notifications";
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

  React.useEffect(() => {
    if (!cartItems.length || !availablePaymentMethods.length) {
      notifications.clean();
      notifications.show({
        message: "Fetching cart items before proceeding to payment",
      });
      return router.push("/");
    }

    if (orderResult === "success" || orderResult === "pending") {
      notifications.clean();
      notifications.show({
        message: "This order has already been placed",
      });
      return router.push("/result");
    }

    if (stage !== "payment") {
      updateStage("payment");
      return;
    }
  }, []);

  return <Payment />;
}
