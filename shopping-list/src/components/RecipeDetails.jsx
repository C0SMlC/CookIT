import { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Heading, Stack } from "@chakra-ui/react";
import RecipeComponent from "./RecipeComponent";
import PageTitle from "./PageTitle";
import Navigation from "./NavBar";

function RecipeDetails() {
  const [recipes, setRecipes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);

  const fetchRecipes = () => {
    const apiUrl = "http://localhost:3000/ingredients/getUniqueRecipes";

    // Create an Axios instance with withCredentials set to true
    const axiosInstance = axios.create({
      withCredentials: true, // Allow sending cookies with the request
    });

    setErrorMessage(null);

    axiosInstance
      .get(apiUrl)
      .then((response) => {
        setErrorMessage(null);

        setRecipes(response.data);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setErrorMessage("Ahem Ahem Ahem! Who are you? Please log in.");
        } else {
          console.error("Error fetching data:", error);
        }
        setIsLoggedIn(false);
      });
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <>
      <Navigation isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Stack spacing={"5rem"} mt={"10rem"} ml={"10rem"} mr={"10rem"}>
        <PageTitle />
        {errorMessage ? (
          <Heading as="h3" size="2xl" noOfLines={2} color={"#b71c1c"} py={5}>
            {errorMessage}
          </Heading>
        ) : recipes.length > 0 ? (
          <Grid templateColumns="repeat(4, 1fr)" gap={10} rowGap={100}>
            <RecipeComponent recipes={recipes} fetchRecipes={fetchRecipes} />
          </Grid>
        ) : (
          <Heading as="h3" size="2xl" noOfLines={2} color={"#b71c1c"} py={5}>
            {isLoggedIn
              ? "No recipes found."
              : "Ahem Ahem Ahem! Who are you? Please log in."}
          </Heading>
        )}
      </Stack>
    </>
  );
}

export default RecipeDetails;
