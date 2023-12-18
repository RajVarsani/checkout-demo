import { PaymentMethod } from "@/interfaces/ICheckout";
import { useCheckoutStore } from "@/store/checkout.store";
import {
  ActionIcon,
  Button,
  Collapse,
  Container,
  Fieldset,
  Flex,
  PinInput,
  Radio,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconChevronLeft, IconCircleCheckFilled } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./Payment.module.css";
import { Calendar, DateInput, MonthPickerInput } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";

const STATIC_CONTENT = {
  title: "Payment",
  subtitle: "Select a payment method from the options below to continue.",
  continue: "Complete Order ->",
  paymentMethods: {
    upi: {
      input: {
        label: "UPI ID",
        placeholder: "Enter your UPI ID",
        error: "Invalid UPI ID",
      },
      button: "Verify",
      verified: "UPI ID verified",
    },
    cards: {
      input: {
        title: "Card information",
        name: {
          label: "Name on card",
          placeholder: "Enter your name",
          error: "Name cannot be empty",
        },
        number: {
          label: "Card Number",
          placeholder: "Enter your card number",
          error: "Invalid card number",
        },
        expiry: {
          label: "Expiry",
          placeholder: "MM/YY",
          error: "Invalid expiry",
        },
        cvv: {
          label: "CVV",
          placeholder: "Enter your CVV",
          error: "Invalid CVV",
        },
      },
      button: "Verify",
      verified: "Card verified",
    },
  },
};

function Payment() {
  const isSmallScreen = useMediaQuery("(max-width: 30rem)");
  const router = useRouter();
  const {
    updatePaymentMethod,
    availablePaymentMethods,
    selectedPaymentMethod,
    paymentState,
    updatePaymentState,
  } = useCheckoutStore((state) => state);

  const handleUPIVerification = () => {
    // verify input using regex
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+$/;
    const isValid = regex.test(paymentState.UPI.upiID);
    if (!isValid) {
      updatePaymentState({
        upi: {
          error: true,
        },
      });
      return;
    }
    updatePaymentState({
      upi: {
        isVerified: true,
        error: false,
      },
    });
  };

  const handleCardVerification = (e: any) => {
    e.preventDefault();
    const errors: typeof paymentState.CARDS.error = [];
    if (paymentState.CARDS.name === "") {
      errors.push("name");
    }
    if (paymentState.CARDS.cardNumber.length !== 16) {
      errors.push("number");
    }
    if (new Date(paymentState.CARDS.expiry).getTime() < Date.now()) {
      errors.push("expiry");
    }
    if (paymentState.CARDS.cvv.length !== 3) {
      errors.push("cvv");
    }
    if (errors.length > 0) {
      updatePaymentState({
        card: {
          error: errors,
        },
      });
      return;
    } else {
      updatePaymentState({
        card: {
          isVerified: true,
          error: [],
        },
      });
    }
  };

  const PaymentMethodComponents = {
    [PaymentMethod.UPI]: (
      <Flex direction="column" gap={8} py={12}>
        <Flex align="center" gap={8}>
          <TextInput
            placeholder={STATIC_CONTENT.paymentMethods.upi.input.placeholder}
            value={paymentState.UPI.upiID}
            onChange={(event) =>
              updatePaymentState({
                upi: {
                  upiID: event.currentTarget.value,
                  isVerified: false,
                  error: false,
                },
              })
            }
            error={
              paymentState.UPI.error
                ? STATIC_CONTENT.paymentMethods.upi.input.error
                : false
            }
          />
          <Button
            onClick={handleUPIVerification}
            disabled={paymentState.UPI.isVerified}
          >
            {STATIC_CONTENT.paymentMethods.upi.button}
          </Button>
        </Flex>
        {paymentState.UPI.isVerified && (
          <Flex align="center" gap={4} c="green">
            <IconCircleCheckFilled size={16} />
            <Text size="sm">{STATIC_CONTENT.paymentMethods.upi.verified}</Text>
          </Flex>
        )}
      </Flex>
    ),
    [PaymentMethod.CARDS]: (
      <form onSubmit={handleCardVerification}>
        <Flex direction="column" gap={16} py={12}>
          <Fieldset
            legend={STATIC_CONTENT.paymentMethods.cards.input.title}
            variant="default"
            radius="lg"
            maw={300}
          >
            <Flex gap={12} direction="column">
              <TextInput
                required
                type="number"
                minLength={16}
                maxLength={16}
                label={STATIC_CONTENT.paymentMethods.cards.input.number.label}
                placeholder={
                  STATIC_CONTENT.paymentMethods.cards.input.number.placeholder
                }
                value={paymentState.CARDS.cardNumber}
                onChange={(event) =>
                  updatePaymentState({
                    card: {
                      cardNumber: event.currentTarget.value,
                      isVerified: false,
                      error: [],
                    },
                  })
                }
                error={
                  paymentState.CARDS.error.includes("number")
                    ? STATIC_CONTENT.paymentMethods.cards.input.number.error
                    : false
                }
              />
              <TextInput
                required
                label={STATIC_CONTENT.paymentMethods.cards.input.name.label}
                placeholder={
                  STATIC_CONTENT.paymentMethods.cards.input.name.placeholder
                }
                value={paymentState.CARDS.name}
                onChange={(event) =>
                  updatePaymentState({
                    card: {
                      name: event.currentTarget.value,
                      isVerified: false,
                      error: [],
                    },
                  })
                }
                error={
                  paymentState.CARDS.error.includes("name")
                    ? STATIC_CONTENT.paymentMethods.cards.input.name.error
                    : false
                }
              />
              <Flex gap={12}>
                <MonthPickerInput
                  w="50%"
                  required
                  label={STATIC_CONTENT.paymentMethods.cards.input.expiry.label}
                  value={new Date(paymentState.CARDS.expiry)}
                  onChange={(event) =>
                    updatePaymentState({
                      card: {
                        expiry: event as Date,
                        isVerified: false,
                        error: [],
                      },
                    })
                  }
                  valueFormat="MM/YY"
                  error={
                    paymentState.CARDS.error.includes("expiry")
                      ? STATIC_CONTENT.paymentMethods.cards.input.expiry.error
                      : false
                  }
                />
                <TextInput
                  w="50%"
                  type="number"
                  minLength={3}
                  maxLength={3}
                  required
                  label={STATIC_CONTENT.paymentMethods.cards.input.cvv.label}
                  placeholder={
                    STATIC_CONTENT.paymentMethods.cards.input.cvv.placeholder
                  }
                  value={paymentState.CARDS.cvv}
                  onChange={(event) =>
                    updatePaymentState({
                      card: {
                        cvv: event.currentTarget.value,
                        isVerified: false,
                        error: [],
                      },
                    })
                  }
                  error={
                    paymentState.CARDS.error.includes("cvv")
                      ? STATIC_CONTENT.paymentMethods.cards.input.cvv.error
                      : false
                  }
                />
              </Flex>
            </Flex>
          </Fieldset>
          {paymentState.CARDS.isVerified && (
            <Flex align="center" gap={4} c="green">
              <IconCircleCheckFilled size={16} />
              <Text size="sm">
                {STATIC_CONTENT.paymentMethods.cards.verified}
              </Text>
            </Flex>
          )}
          <Button
            type="submit"
            w={100}
            disabled={paymentState.CARDS.isVerified}
          >
            {STATIC_CONTENT.paymentMethods.cards.button}
          </Button>
        </Flex>
      </form>
    ),
  };

  return (
    <Container className={styles.checkoutFrame} px={20}>
      <Flex py={16} justify="space-between">
        <ActionIcon aria-label="Back" component={Link} href="/">
          <IconChevronLeft
            style={{ width: "70%", height: "70%" }}
            stroke={1.5}
          />
        </ActionIcon>
      </Flex>
      <Flex
        direction="column"
        gap={20}
        h="100%"
        justify="space-between"
        py={12}
      >
        <Flex direction="column" gap={0} w="100%">
          <Title order={2} fw={700}>
            {STATIC_CONTENT.title}
          </Title>
          <Text c="dimmed">{STATIC_CONTENT.subtitle}</Text>
          <Radio.Group
            value={selectedPaymentMethod?.toString()}
            onChange={(value) => {
              updatePaymentMethod(value as PaymentMethod);
            }}
            mt={16}
          >
            <Flex direction="column" gap={8}>
              {availablePaymentMethods.map((paymentMethod, index) => (
                <>
                  <Radio
                    key={index * 2}
                    value={paymentMethod.toString()}
                    label={paymentMethod}
                  />
                  <Flex direction="column">
                    <Collapse
                      key={index * 2 + 1}
                      in={selectedPaymentMethod === paymentMethod}
                    >
                      {PaymentMethodComponents[paymentMethod]}
                    </Collapse>
                  </Flex>
                </>
              ))}
            </Flex>
          </Radio.Group>
        </Flex>
        <Button
          size="md"
          disabled={!selectedPaymentMethod}
          onClick={() => router.push("/result")}
          maw={isSmallScreen ? undefined : 300}
        >
          {STATIC_CONTENT.continue}
        </Button>
      </Flex>
    </Container>
  );
}

export default Payment;
