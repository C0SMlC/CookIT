import { Box, Flex, Link, HStack, Image } from "@chakra-ui/react";

const Navigation = () => {
  return (
    <Box as="nav" p="3" boxShadow="lg" pl={"10rem"} pr={"10rem"}>
      <Flex justify="space-between" align="center">
        <Box>
          <a href="/index.html">
            <Image
              src="./src/assets/logo.png"
              alt="CookIT Logo"
              width="100px"
            />
          </a>
        </Box>

        <Box as="nav">
          <HStack spacing={"50px"} fontWeight={"bold"} fontSize={"2xl"}>
            <Link>Search Recipes</Link>
            <Link>Meal Planner</Link>
          </HStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navigation;
