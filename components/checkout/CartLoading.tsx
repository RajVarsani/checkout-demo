import { Flex, Skeleton } from "@mantine/core";

function CartLoading() {
  return (
    <Flex direction="column" h={"100%"} py={16}>
      <Skeleton h="100%" radius={16} />
    </Flex>
  );
}

export default CartLoading;
