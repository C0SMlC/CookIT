import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Ingredient from "../components/Ingredient";

function IngredientDetails() {
  const { recipeId } = useParams();
  const [ingredient, setIngredient] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchIngredient = () => {
    const apiUrl = `http://127.0.0.1:3000/ingredients/recipe/${recipeId}`;

    axios
      .get(apiUrl)
      .then((response) => {
        setIngredient(response.data.data.recipe);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setErrorMessage("Ahem Ahem Ahem! Who are you? Please log in.");
        } else {
          console.error("Error fetching data:", error);
        }
      });
  };

  useEffect(() => {
    fetchIngredient();
  }, [recipeId]);

  return (
    <div>
      <Ingredient ingredient={ingredient} />
    </div>
  );
}

export default IngredientDetails;
