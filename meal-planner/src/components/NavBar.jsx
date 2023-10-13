import { Flex, Button, ButtonGroup } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <Flex justify="center" align="center" h="60px" bg="blue.500" color="white">
      <ButtonGroup spacing={4}>
        <a to="/">
          <Button variant="outline">Home</Button>
        </a>
        <a to="/meal-planner">
          <Button variant="outline">Meal Planner</Button>
        </a>
      </ButtonGroup>
    </Flex>
  );
}

export default Navigation;
