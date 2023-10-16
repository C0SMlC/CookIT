import { useState, useEffect } from "react";
import axios from "axios";

import { Grid, Heading, Stack } from "@chakra-ui/react";
import RecipeComponent from "./RecipeComponent";
import PageTitle from "./PageTitle";
import Navigation from "./NavBar";

function RecipeDetails() {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = () => {
    const apiUrl = "http://localhost:3000/ingredients/getUniqueRecipes";
    axios
      .get(apiUrl)
      .then((response) => {
        setRecipes(response.data); // Update state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    // Fetch recipes when the component mounts
    fetchRecipes();
  }, []);

  return (
    <>
      <Navigation />
      <Stack spacing={"5rem"} mt={"10rem"} ml={"10rem"} mr={"10rem"}>
        <PageTitle />
        {recipes.length > 0 ? (
          <Grid templateColumns="repeat(4, 1fr)" gap={10} rowGap={100}>
            <RecipeComponent recipes={recipes} fetchRecipes={fetchRecipes} />
          </Grid>
        ) : (
          <Heading as="h3" size="2xl" noOfLines={2} color={"#b71c1c"} py={5}>
            No Recipes Found :(
          </Heading>
        )}
      </Stack>
    </>
  );
}

export default RecipeDetails;
