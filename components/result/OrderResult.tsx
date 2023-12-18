import OrderFailureAnimation from "@/assets/order-failed.json";
import OrderPendingAnimation from "@/assets/order-pending.json";
import OrderSuccessAnimation from "@/assets/order-success.json";
import { OrderResult } from "@/interfaces/ICheckout";
import { useCheckoutStore } from "@/store/checkout.store";
import {
  ActionIcon,
  Button,
  Container,
  Flex,
  Text,
  Title,
} from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import Lottie from "lottie-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./OrderResult.module.css";

const STATIC_CONTENT = {
  [OrderResult.SUCCESS]: {
    title: "Order Placed Successfully",
    subtitle:
      "Your order has been placed successfully. You will receive a confirmation email shortly.",
    animation: OrderSuccessAnimation,
    cta: "Continue Shopping",
  },
  [OrderResult.FAILURE]: {
    title: "Order Failed",
    subtitle: "Your order has failed. Please try again.",
    animation: OrderFailureAnimation,
    cta: "Try Again",
  },
  [OrderResult.PENDING]: {
    title: "Order Pending",
    subtitle: "Your order is pending. Please wait for confirmation.",
    animation: OrderPendingAnimation,
    cta: "Continue Shopping",
  },
};

function Payment() {
  const router = useRouter();
  const { loading, orderResult, refreshOrderDetails } = useCheckoutStore(
    (state) => state
  );

  const handleCTAClick = async () => {
    switch (orderResult) {
      case OrderResult.SUCCESS:
        await refreshOrderDetails(true);
        router.push("/");
        break;
      case OrderResult.FAILURE:
        router.push("/payment");
        break;
      case OrderResult.PENDING:
        await refreshOrderDetails(true);
        router.push("/");
        break;
    }
  };

  return (
    <Container className={styles.checkoutFrame} px={20}>
      <Flex py={16} justify="space-between">
        <ActionIcon aria-label="Back" component={Link} href="/payment">
          <IconChevronLeft
            style={{ width: "70%", height: "70%" }}
            stroke={1.5}
          />
        </ActionIcon>
      </Flex>
      <Flex direction="column" gap={4} h="100%" justify="center" align="center">
        {orderResult && (
          <>
            <Lottie
              animationData={STATIC_CONTENT[orderResult].animation}
              style={{
                width: "200px",
                height: "200px",
              }}
            />
            <Title order={2} fw={700} ta="center">
              {STATIC_CONTENT[orderResult].title}
            </Title>
            <Text c="dimmed" ta="center">
              {STATIC_CONTENT[orderResult].subtitle}
            </Text>
            <Button
              size="md"
              onClick={handleCTAClick}
              mt={24}
              loading={loading}
            >
              {STATIC_CONTENT[orderResult].cta}
            </Button>
          </>
        )}
      </Flex>
    </Container>
  );
}

export default Payment;
