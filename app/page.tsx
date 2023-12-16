"use client";

import { useBrandStore } from "@/store/brand.store";
import { Button, Text, Title } from "@mantine/core";

const STATIC_CONTENT = {
  brand: {
    fallback: {
      log: "Failed to fetch brand metadata",
    },
  },
};
export default function HomePage() {
  const meta = useBrandStore((state) => state.metadata);

  return (
    <div>
      <Title>Title</Title>
      <Text>This is some text</Text>
      <Button color="brand">Button</Button>
      <Button>Button</Button>
    </div>
  );
}
