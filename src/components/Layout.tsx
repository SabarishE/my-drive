import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box maxW="1600px" px={[4, null, 10]} mx="auto" pb={20}>
      <Text
        borderBottom="1px solid #cfcfcf"
        py={4}
        fontSize={["20px", "24px"]}
        fontWeight="semibold"
        pos="sticky"
        top="0"
        left="0"
        bg="white"
        zIndex="100"
      >
        My Drive
      </Text>
      {children}
    </Box>
  );
};

// styling for custom scroll bar in simple grid

export const StyledGrid = styled(SimpleGrid)`
  ::-webkit-scrollbar {
    width: 7px;
    height: 8px;
    border-radius: 25px;
  }

  ::-webkit-scrollbar-track {
    border: 10px solid transparent;
    border-radius: 25px;
    margin-top: 25px;
  }

  ::-webkit-scrollbar-thumb {
    background: #d8d8d8;
    height: "25px";
    border-radius: 50px;
  }
`;
