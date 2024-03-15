import axios from 'axios';

export const addToMealPlanner = async (recipe) => {
  const addToDbButton = document.querySelector('.btn-add-meal-db');

  addToDbButton.textContent = 'Processing...';
  addToDbButton.disabled = true;

  try {
    const recipeName = recipe.title;
    const recipeId = recipe.id;
    const userId = localStorage.getItem('uid');
    const type = document.querySelector('#meal-type').value;
    const date = document.querySelector('#meal-date').value;

    console.log(recipeName, recipeId, userId, type, date);

    await axios({
      method: 'POST',
      url: '/mealplanner',
      data: {
        recipeName,
        recipeId,
        userId,
        type,
        date,
      },
    });

    addToDbButton.textContent = 'Done 👍';
    addToDbButton.classList.add('disabled');

    document.querySelector('.container').style.display = 'none';
    document.querySelector('.container').classList.remove('modal-overlay');
  } catch (error) {
    addToDbButton.classList.add('disabled');
    console.error(error);
  }
};

export const getMealPlanner = async () => {
  const userId = localStorage.getItem('uid');
  try {
    const response = await axios({
      method: 'GET',
      url: `/mealplanner/${userId}`,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
