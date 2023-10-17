import PropTypes from "prop-types";
import { Checkbox } from "@chakra-ui/react";

function Ingredient({ ingredient }) {
  return (
    <div>
      {ingredient.map((ingredientItem) => (
        <div key={ingredientItem._id}>
          <Checkbox colorScheme="green">
            {ingredientItem.ingredientName}
          </Checkbox>
        </div>
      ))}
    </div>
  );
}

Ingredient.propTypes = {
  ingredient: PropTypes.array.isRequired,
};

export default Ingredient;
