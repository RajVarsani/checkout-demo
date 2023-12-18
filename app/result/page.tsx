"use client";

import OrderResult from "@/components/result/OrderResult";
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
    selectedPaymentMethod,
    paymentState,
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

    if (
      !selectedPaymentMethod ||
      !paymentState[selectedPaymentMethod].isVerified
    ) {
      notifications.clean();
      notifications.show({
        message: "Please verify payment before proceeding",
      });
      return router.push("/payment");
    }

    if (stage !== "result") {
      updateStage("result");
      return;
    }
  }, []);

  return <OrderResult />;
}
