import axios from 'axios';
import Cookies from 'js-cookie';

export const addIngredients = async (recipe) => {
  const ingredientButton = document.querySelector('.recipe__ingredient-btn');
  const token = Cookies.get('jwt');
  console.log('Token:', token);

  console.log('Adding ingredients...');

  if (!ingredientButton) {
    console.error('Button not found.');
    return;
  }

  ingredientButton.textContent = 'Processing...';
  ingredientButton.disabled = true;

  console.log(recipe);
  console.log('Token:', token);

  console.log('Adding ingredients...');

  try {
    const recipeName = recipe.title;
    const recipeId = recipe.id;
    const imageUrl = recipe.image_url;

    for (const ingredient of recipe.ingredients) {
      await axios({
        method: 'POST',
        url: '/ingredients',
        data: {
          recipeName,
          recipeId,
          imageUrl,
          ingredientName: ingredient.description,
          quantity: ingredient.quantity,
        },
      });
    }

    ingredientButton.textContent = 'Done 👍';
    ingredientButton.classList.add('disabled');
    // localStorage.setItem('recipeInShoppingList', 'recipeId');
  } catch (error) {
    ingredientButton.textContent = 'Ingredients already in shopping list';
    ingredientButton.classList.add('disabled');
    console.error(error);
  }
};
