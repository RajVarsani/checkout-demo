import { useCheckoutStore } from "@/store/checkout.store";
import { getSubtotal } from "@/utils/checkout.helper";
import { getPrimaryColorWithOpacity } from "@/utils/colors.helper";
import {
  Collapse,
  Divider,
  Flex,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { IconChevronRight, IconX } from "@tabler/icons-react";
import styles from "./BillSummary.module.css";

const STATIC_CONTENT = {
  offers: {
    title: "Offers & Benefits",
    apply: "Apply Promo Code",
    applied: " Applied",
    savings: " Coupon Savings",
  },
  summary: {
    Title: "Order Summary",
    subtotal: "Subtotal",
    delivery: "Delivery",
    discount: "Discount",
    total: "Total",
  },
};

function BillSummary() {
  const {
    cartItems,
    promoCode: promoCodeApplied,
    getDiscount,
    applyPromoCode,
    removePromoCode,
  } = useCheckoutStore((state) => state);
  return (
    <Flex direction="column" gap={16} w="100%">
      <Title order={4} fw={700}>
        {STATIC_CONTENT.offers.title}
      </Title>
      <UnstyledButton
        bg={getPrimaryColorWithOpacity(0.1)}
        color={"brand"}
        style={{
          borderRadius: 12,
          transition: "all 0.2s ease-out",
          cursor: "pointer",
        }}
        w="100%"
        onClick={
          promoCodeApplied ? () => removePromoCode() : () => applyPromoCode()
        }
      >
        <Flex py={12} px={20} align="center" justify="space-between" w="100%">
          <Flex direction="column" gap={2}>
            <Text ta="start" w={"100%"} size={"md"}>
              {promoCodeApplied ? (
                <>
                  <Text span fw={700}>
                    {promoCodeApplied || ""}
                  </Text>
                  {STATIC_CONTENT.offers.applied}
                </>
              ) : (
                <>{STATIC_CONTENT.offers.apply}</>
              )}
            </Text>

            <Text ta="start" w={"100%"}></Text>
            <Collapse in={!!promoCodeApplied}>
              <Text c={"dimmed"}>
                <Text span fw={700}>
                  ${getDiscount(getSubtotal(cartItems)).toFixed(2)}
                </Text>
                {STATIC_CONTENT.offers.savings}
              </Text>
            </Collapse>
          </Flex>

          {promoCodeApplied ? (
            <IconX size={18} />
          ) : (
            <IconChevronRight size={22} />
          )}
        </Flex>
      </UnstyledButton>
      <Divider color={getPrimaryColorWithOpacity(0.1)} />
      <Title order={4} fw={700}>
        {STATIC_CONTENT.summary.Title} ({cartItems.length})
      </Title>
      <Flex direction="column" gap={4}>
        <Flex justify="space-between" align="center">
          <Text c="dimmed">{STATIC_CONTENT.summary.subtotal}</Text>
          <Text
            fw={600}
            className={styles.value}
            key={"subtotal/" + getSubtotal(cartItems)}
          >
            {"$"}
            {getSubtotal(cartItems).toFixed(2)}
          </Text>
        </Flex>
        <Flex justify="space-between" align="center">
          <Text c="dimmed">{STATIC_CONTENT.summary.delivery}</Text>
          <Text fw={600}>FREE</Text>
        </Flex>
        {/* <Collapse in={!!promoCodeApplied}> */}
        {promoCodeApplied && (
          <Flex justify="space-between" align="center">
            <Text c="dimmed">{STATIC_CONTENT.summary.discount}</Text>
            <Text fw={600}>
              {promoCodeApplied
                ? "-$" + getDiscount(getSubtotal(cartItems)).toFixed(2)
                : ""}
            </Text>
          </Flex>
        )}
        {/* </Collapse> */}
        <Flex justify="space-between" align="center">
          <Text c="dimmed" size="lg" fw={500}>
            {STATIC_CONTENT.summary.total}
          </Text>
          <Text
            fw={700}
            size="lg"
            className={styles.value}
            key={"total/" + getSubtotal(cartItems) + "/" + promoCodeApplied}
          >
            {"$"}
            {promoCodeApplied
              ? (
                  getSubtotal(cartItems) - getDiscount(getSubtotal(cartItems))
                ).toFixed(2)
              : getSubtotal(cartItems).toFixed(2)}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default BillSummary;
