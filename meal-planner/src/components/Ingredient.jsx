import { useEffect } from "react";
import PropTypes from "prop-types";

function Ingredient({ recipeId }) {
 // Include recipeId as a dependency

  // Add a conditional rendering based on the ingredient's length
  if (ingredient.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {ingredient.map((ingredientItem) => (
        <div key={ingredientItem._id}>{ingredientItem.ingredientName}</div>
      ))}
    </div>
  );
}

Ingredient.propTypes = {
  recipeId: PropTypes.string.isRequired,
};

export default Ingredient;
