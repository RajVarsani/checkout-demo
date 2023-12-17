import EmptyCartHero from "@/assets/empty-cart-hero.svg";
import { Button, Flex, Text, Title } from "@mantine/core";
import Image from "next/image";
import { useCheckoutStore } from "@/store/checkout.store";
const STATIC_CONTENT = {
  image: {
    alt: "Empty cart hero",
  },
  title: "Your cart is empty!",
  subtitle: "But it doesn't have to be.",
  cta: "Start Shopping",
};

function EmptyCart() {
  const { refreshOrderDetails } = useCheckoutStore((state) => state);
  return (
    <Flex
      direction="column"
      gap={32}
      mih={"100%"}
      justify="center"
      align="center"
    >
      <Image src={EmptyCartHero} alt={STATIC_CONTENT.image.alt} width={250} />
      <Flex direction="column" gap={4} align="center">
        <Title order={2} ta="center">{STATIC_CONTENT.title}</Title>
        <Text ta="center">{STATIC_CONTENT.subtitle}</Text>
      </Flex>
      <Button onClick={() => refreshOrderDetails()} color="brand" size="md">
        {STATIC_CONTENT.cta}
      </Button>
    </Flex>
  );
}

export default EmptyCart;
