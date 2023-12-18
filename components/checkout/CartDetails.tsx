import { Button, Flex, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import AddressInfo from "./AddressInfo";
import BillSummary from "./BillSummary";
import CartEditor from "./CartEditor";
import { useCheckoutStore } from "@/store/checkout.store";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";

const STATIC_CONTENT = {
  title: "Your Cart",
  checkout: "Proceed to Payment ->",
};

function CartDetails() {
  const isLargeScreen = useMediaQuery("(min-width: 48rem)");
  const updateStage = useCheckoutStore((state) => state.updateStage);
  const router = useRouter();

  return (
    <Flex direction="column" gap={24} mih="100%" py={12} pb={20}>
      <Title order={3} fw={800}>
        {STATIC_CONTENT.title}
      </Title>
      <Flex gap={24} direction={isLargeScreen ? "row" : "column"}>
        <Flex direction="column" gap={32} w={isLargeScreen ? "70%" : "100%"}>
          <CartEditor />
          <AddressInfo />
        </Flex>
        <Flex direction="column" gap={32} w={isLargeScreen ? "30%" : "100%"}>
          <BillSummary />
          <Button
            size="md"
            mt={isLargeScreen ? 0 : 20}
            onClick={() => {
              updateStage("payment");
              router.push("/payment");

              notifications.clean();
              notifications.show({
                message: "Redirecting to payment page",
              });
            }}
          >
            {STATIC_CONTENT.checkout}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default CartDetails;
