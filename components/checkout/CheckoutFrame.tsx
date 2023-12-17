import { ActionIcon, Container, Flex } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import styles from "./CheckoutFrame.module.css";

function CheckoutFrame({ children }: { children: any }) {
  return (
    <Container className={styles.checkoutFrame} px={20}>
      <Flex py={16}>
        <ActionIcon aria-label="Back">
          <IconChevronLeft
            style={{ width: "70%", height: "70%" }}
            stroke={1.5}
          />
        </ActionIcon>
      </Flex>
      <Flex direction="column" h="100%">
        {children}
      </Flex>
    </Container>
  );
}

export default CheckoutFrame;
