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
    const imageUrl = recipe.image_url;
    const uId = localStorage.getItem('uid');

    console.log(uId);
    console.log(localStorage.getItem('uid'));

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
          uId,
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
