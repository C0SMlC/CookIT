import axios from 'axios';

export const addIngredients = async (recipe) => {
  const ingredientButton = document.querySelector('.recipe__ingredient-btn');

  if (!ingredientButton) {
    console.error('Button not found.');
    return;
  }

  ingredientButton.textContent = 'Processing...';
  ingredientButton.disabled = true;

  try {
    const recipeName = recipe.title;
    const recipeId = recipe.id;

    for (const ingredient of recipe.ingredients) {
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
    }

    ingredientButton.textContent = 'Done 👍';
    // ingredientButton.classList.add('disabled');
    // localStorage.setItem('recipeInShoppingList', 'recipeId');
  } catch (error) {
    console.error(error.response.data.message);
  }
};
