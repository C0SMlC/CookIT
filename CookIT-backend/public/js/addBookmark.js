import axios from 'axios';

export const addBookmark = async (recipe) => {
  const bookmarkButton = document.querySelector('.recipe__bookmark-btn');
  bookmarkButton.textContent = 'Processing...';

  try {
    const title = recipe.title;
    const recipeId = recipe.id;
    const url = recipe.image_url;
    const description = recipe.description;
    const userId = localStorage.getItem('uid');

    console.log(title, recipeId, url, description, userId);

    await axios({
      method: 'POST',
      url: `/bookmark/${recipeId}`,
      data: {
        title,
        recipeId,
        url,
        description,
        userId,
      },
    });

    bookmarkButton.textContent = 'Done 👍';
    bookmarkButton.classList.add('disabled');
  } catch (error) {
    console.error(error);
  }
};

export const getUserBookmarks = async () => {
  const userId = localStorage.getItem('uid');
  try {
    const response = await axios({
      method: 'GET',
      url: `/bookmark/user/${userId}`,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
