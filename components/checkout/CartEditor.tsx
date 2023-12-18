import { useCheckoutStore } from "@/store/checkout.store";
import { getPrimaryColorWithOpacity } from "@/utils/colors.helper";
import {
  ActionIcon,
  Flex,
  Grid,
  NumberFormatter,
  Text,
  Title,
} from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import Image from "next/image";
import styles from "./CartEditor.module.css";

function CartEditor() {
  const { cartItems, updateCartItems } = useCheckoutStore((state) => state);

  const increaseQuantity = (index: number) => {
    if (cartItems[index].quantity === 10) {
      return;
    }
    const newCartItems = [...cartItems];
    newCartItems[index].quantity += 1;
    updateCartItems(newCartItems);
  };

  const decreaseQuantity = (index: number) => {
    if (cartItems[index].quantity === 1) {
      // remove item
      const newCartItems = [...cartItems];
      newCartItems.splice(index, 1);
      updateCartItems(newCartItems);
      return;
    }
    const newCartItems = [...cartItems];
    newCartItems[index].quantity -= 1;
    updateCartItems(newCartItems);
  };
  return (
    <Flex direction="column" gap={24} w="100%">
      {cartItems.map((item, index) => {
        return (
          <Grid gutter={20} w="100%" key={item.id}>
            <Grid.Col span={"content"}>
              <Image
                src={item.image}
                alt={item.title}
                width={120}
                height={120}
                objectFit="cover"
                className={styles.image}
                style={
                  {
                    "--shadow-color": getPrimaryColorWithOpacity(0.15),
                  } as React.CSSProperties
                }
              />
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <Flex direction="column" gap={2} h={120} py={4}>
                <Title order={5} lineClamp={2}>
                  {item.title}
                </Title>
                <Text
                  c="dimmed"
                  className={styles.cost}
                  key={item.id + "/" + (item.price * item.quantity).toFixed(2)}
                >
                  <NumberFormatter
                    prefix="$ "
                    value={(item.price * item.quantity).toFixed(2)}
                    thousandSeparator
                  />
                </Text>
                <Flex
                  direction="row"
                  gap={12}
                  mt="auto"
                  w="fit-content"
                  style={{
                    borderRadius: 12,
                  }}
                >
                  <ActionIcon
                    aria-label="Decrease quantity"
                    onClick={() => decreaseQuantity(index)}
                    c="brand"
                    bg={getPrimaryColorWithOpacity(0.15)}
                  >
                    <IconMinus size={14} />
                  </ActionIcon>
                  <Text
                    className={styles.quantity}
                    key={item.id + "/" + item.quantity}
                  >
                    {item.quantity}
                  </Text>
                  <ActionIcon
                    aria-label="Increase quantity"
                    disabled={item.quantity >= 10}
                    onClick={() => increaseQuantity(index)}
                    c={item.quantity >= 10 ? "dimmed" : "brand"}
                    bg={
                      item.quantity >= 10
                        ? getPrimaryColorWithOpacity(0.05)
                        : getPrimaryColorWithOpacity(0.15)
                    }
                  >
                    <IconPlus size={14} />
                  </ActionIcon>
                </Flex>
              </Flex>
            </Grid.Col>
          </Grid>
        );
      })}
    </Flex>
  );
}

export default CartEditor;
