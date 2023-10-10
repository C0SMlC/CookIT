import axios from 'axios';

export const addIngredients = (recipe) => {
  console.log(recipe);
  try {
    const recipeName = recipe.title;
    const recipeId = recipe.id;
    recipe.ingredients.forEach(async (ingredient) => {
      await axios({
        method: 'POST',
        url: '/ingredients',
        data: {
          recipeName,
          recipeId,
          ingredientName: ingredient.description,
          quantity: ingredient.quantity,
        },
      });
    });
  } catch (error) {
    console.log(error.response.data.message);
  }
};
