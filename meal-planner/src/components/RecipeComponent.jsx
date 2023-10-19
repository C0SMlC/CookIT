import PropTypes from "prop-types";

import { GridItem, Box, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";

import CloseButtonComponent from "./CloseButtonComponent";

function RecipeComponent({ recipes, fetchRecipes }) {
  const handleRecipeDeletion = (recipeId) => {
    const apiUrl = `http://localhost:3000/ingredients`;
    axios
      .delete(apiUrl, { data: { recipeId } })
      .then(() => {
        console.log("Ingredients deleted successfully.");
        fetchRecipes();
      })
      .catch((error) => {
        console.error("Error deleting ingredients:", error);
      });
  };

  return (
    <>
      {recipes.map((recipe) => (
        <GridItem key={recipe.recipeId} w="100%">
          <Box
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            cursor="pointer"
          >
            <Box height="200px" overflow="hidden" position="relative">
              <Link to={`/app/${recipe.recipeId}`}>
                <Image
                  src={recipe.imageUrl}
                  alt={recipe.recipeName}
                  objectFit="cover"
                  width="100%"
                  height="100%"
                  position="absolute"
                />
              </Link>
              <CloseButtonComponent
                recipeId={recipe.recipeId}
                handleRecipeDeletion={handleRecipeDeletion}
              />
            </Box>

            <Link to={`/app/${recipe.recipeId}`}>
              <Box p="6" bg="#263238" border={"1px solid #37474F"}>
                <Box
                  mt="1"
                  fontWeight="bold"
                  as="h2"
                  color={"#D9CDC7"}
                  lineHeight="tight"
                  noOfLines={3}
                  height="75px"
                  fontSize={"xl"}
                  textAlign={"center"}
                >
                  {recipe.recipeName}
                </Box>
              </Box>
            </Link>
          </Box>
        </GridItem>
      ))}
    </>
  );
}

RecipeComponent.propTypes = {
  recipes: PropTypes.array.isRequired,
  fetchRecipes: PropTypes.func.isRequired,
};

export default RecipeComponent;
