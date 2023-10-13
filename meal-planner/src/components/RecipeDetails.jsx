import { Grid, Stack } from "@chakra-ui/react";
import RecipeComponent from "./RecipeComponent";
import PageTitle from "./PageTitle";

// import styles from "./RecipeDetails.module.css";

function RecipeDetails() {
  return (
    <Stack spacing={"5rem"} mt={"10rem"} ml={"10rem"} mr={"10rem"}>
      <PageTitle />
      <Grid templateColumns="repeat(4, 1fr)" gap={10} rowGap={100}>
        <RecipeComponent />
      </Grid>
    </Stack>
  );
}

export default RecipeDetails;
