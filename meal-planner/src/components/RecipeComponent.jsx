import { GridItem, Box, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios"; // Import Axios

function RecipeComponent() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Define the URL for your local API endpoint
    const apiUrl = "http://localhost:3000/ingredients/getUniqueRecipes";

    // Make an HTTP GET request to your API
    axios
      .get(apiUrl)
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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
              <Image
                src={recipe.imageUrl}
                alt={recipe.recipeName}
                objectFit="cover"
                width="100%"
                height="100%"
                position="absolute"
              />
            </Box>

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
          </Box>
        </GridItem>
      ))}
    </>
  );
}

export default RecipeComponent;
