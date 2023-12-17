import { Button, Flex, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import AddressInfo from "./AddressInfo";
import BillSummary from "./BillSummary";
import CartEditor from "./CartEditor";

const STATIC_CONTENT = {
  title: "Your Cart",
  checkout: "Checkout ->",
};

function CartDetails() {
  // breakpoint for tablet
  const matches = useMediaQuery("(min-width: 48rem)");

  return (
    <Flex direction="column" gap={24} mih="100%" py={12} pb={20}>
      <Title order={3} fw={800}>
        {STATIC_CONTENT.title}
      </Title>
      <Flex gap={24} direction={matches ? "row" : "column"}>
        <Flex direction="column" gap={32} w={matches ? "70%" : "100%"}>
          <CartEditor />
          <AddressInfo />
        </Flex>
        <Flex direction="column" gap={32} w={matches ? "30%" : "100%"}>
          <BillSummary />
          <Button size="md" mt={matches ? 0 : 20}>
            {STATIC_CONTENT.checkout}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default CartDetails;
