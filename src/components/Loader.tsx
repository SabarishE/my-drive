import { Center, Spinner } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Center py={10}>
      <Spinner thickness="4px" color="blue.500" size="xl" />
    </Center>
  );
};

export default Loader;
