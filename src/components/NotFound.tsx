import { Center, Text } from "@chakra-ui/react";

export const NotFound = ({ message }: { message: string }) => {
  return (
    <Center w="100%" h={["100px", null, "200px"]}>
      <Text fontSize={["16px", "24px"]} color="rgb(0,0,0,0.4)">
        {message}
      </Text>
    </Center>
  );
};
