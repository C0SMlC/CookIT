import { Heading } from "@chakra-ui/react";

function PageTitle() {
  return (
    <Heading as="h1" size="4xl" noOfLines={2} color={"#37474F"} py={5}>
      Shopping List
    </Heading>
  );
}

export default PageTitle;
