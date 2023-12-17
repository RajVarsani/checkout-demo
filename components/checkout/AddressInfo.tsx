import { ActionIcon, Flex, Grid, Text, Title } from "@mantine/core";
import { IconEdit, IconHome } from "@tabler/icons-react";

const STATIC_CONTENT = {
  title: "Delivery Address",
  address: {
    type: "Home",
    location: "1234 Main St, San Francisco, CA 94123",
    name: "John Doe",
    phone: "415-555-5555",
  },
};

function AddressInfo() {
  return (
    <Flex direction="column" gap={12} w="100%" maw={500}>
      <Title order={4} fw={800}>
        {STATIC_CONTENT.title}
      </Title>
      <Grid gutter={12} align="center">
        <Grid.Col span={"content"}>
          <IconHome size={24} />
        </Grid.Col>
        <Grid.Col span={"auto"}>
          <Flex direction="column" gap={2}>
            <Title order={5}>{STATIC_CONTENT.address.type}</Title>
            <Text c="dimmed" lineClamp={1} size={"sm"}>
              {STATIC_CONTENT.address.location}
            </Text>
          </Flex>
        </Grid.Col>
        <Grid.Col span={"content"}>
          <ActionIcon variant="transparent">
            <IconEdit size={16} />
          </ActionIcon>
        </Grid.Col>
      </Grid>
    </Flex>
  );
}

export default AddressInfo;
