import { NavLink } from "react-router-dom";
import { Box, Flex, HStack, Image, Button } from "@chakra-ui/react";
import { handleLogoutFunction } from "./Logout";

import PropTypes from "prop-types";
// import { useNavigate } from "react-router-dom";

const Navigation = ({ isLoggedIn, setIsLoggedIn, isIngredientPage }) => {
  // let navigate = useNavigate();

  const handleLogout = (e) => {
    handleLogoutFunction(e);
    setIsLoggedIn(false);
    window.location.reload();
    // navigate("/app");
    // if (setErrorMessage) {
    //   setErrorMessage("Ahem Ahem Ahem! Who are you? Please log in.");
    // }
  };

  return (
    <Box as="nav" p="3" boxShadow="lg" pl={"10rem"} pr={"10rem"}>
      <Flex justify="space-between" align="center">
        <Box>
          <a href="/app">
            <Image src="/logo.png" alt="CookIT Logo" width="100px" />
          </a>
        </Box>

        <Box as="nav">
          <HStack spacing={"50px"} fontWeight={"bold"} fontSize={"2xl"}>
            <NavLink to={"http://127.0.0.1:3000/app"}>Search Recipes</NavLink>
            <NavLink to={"/meal-planner"}>Meal Planner</NavLink>
            {!isIngredientPage ? (
              !isLoggedIn ? (
                <NavLink to={"/app/login"}>Log In</NavLink>
              ) : (
                <Button onClick={(e) => handleLogout(e)}>Logout</Button>
              )
            ) : (
              ""
            )}
          </HStack>
        </Box>
      </Flex>
    </Box>
  );
};

Navigation.propTypes = {
  isLoggedIn: PropTypes.bool,
  setIsLoggedIn: PropTypes.func,
  isIngredientPage: PropTypes.bool,
};

export default Navigation;
