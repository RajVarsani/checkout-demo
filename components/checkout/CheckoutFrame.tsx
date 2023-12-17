import { useCheckoutStore } from "@/store/checkout.store";
import { ActionIcon, Container, Flex, Tooltip } from "@mantine/core";
import { IconChevronLeft, IconRefresh } from "@tabler/icons-react";
import styles from "./CheckoutFrame.module.css";

function CheckoutFrame({ children }: { children: any }) {
  const refreshOrderDetails = useCheckoutStore(
    (state) => state.refreshOrderDetails
  );
  return (
    <Container className={styles.checkoutFrame} px={20}>
      <Flex py={16} justify="space-between">
        <ActionIcon aria-label="Back">
          <IconChevronLeft
            style={{ width: "70%", height: "70%" }}
            stroke={1.5}
          />
        </ActionIcon>
        <Tooltip label="Repopulate Order Data">
          <ActionIcon
            aria-label="Back"
            onClick={() => refreshOrderDetails(true)}
            variant="transparent"
          >
            <IconRefresh style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
        </Tooltip>
      </Flex>
      <Flex direction="column" h="100%">
        {children}
      </Flex>
    </Container>
  );
}

export default CheckoutFrame;
