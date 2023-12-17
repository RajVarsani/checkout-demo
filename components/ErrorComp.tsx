"use client";

import ErrorHero from "@/assets/error-hero.svg";
import { Flex, Text, Title } from "@mantine/core";
import Image from "next/image";

const STATIC_CONTENT = {
  image: {
    alt: "A confused robot with an error message",
  },
  title: "Oops! We hit a snag.",
  subtitle: "You can try reloading the page or try again later.",
};

function ErrorComp() {
  return (
    <Flex
      direction="column"
      gap={32}
      mih={"100%"}
      justify="center"
      align="center"
      px={24}
    >
      <Image src={ErrorHero} alt={STATIC_CONTENT.image.alt} width={250} />
      <Flex direction="column" gap={4} align="center">
        <Title order={2} ta="center">
          {STATIC_CONTENT.title}
        </Title>
        <Text ta="center">{STATIC_CONTENT.subtitle}</Text>
      </Flex>
    </Flex>
  );
}

export default ErrorComp;
