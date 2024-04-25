import axios from 'axios';

export const addComment = async (recipe, commentText) => {
  const addCommentButton = document.querySelector('.btn-add-comment');

  addCommentButton.textContent = 'Processing...';
  addCommentButton.disabled = true;

  try {
    const recipeId = recipe.id;
    const userId = localStorage.getItem('uid');

    // console.log(uId);
    console.log(localStorage.getItem('uid'));

    await axios({
      method: 'POST',
      url: `/comments/recipe/${recipeId}`,
      data: {
        userId,
        recipeId,
        commentText,
      },
    });

    addCommentButton.textContent = 'Submit';
    addCommentButton.disabled = false;

    // localStorage.setItem('recipeInShoppingList', 'recipeId');
  } catch (error) {
    console.error(error);
  }
};

export const loadComments = async (recipeId) => {
  try {
    // console.log(uId);
    const response = await axios({
      method: 'GET',
      url: `/comments/recipe/${recipeId}`,
    });
    renderComments(response.data.data.comments);
  } catch (error) {
    console.error(error);
  }
};

// Function to render comments in the comments container
function renderComments(comments) {
  // Clear the existing comments
  const commentsContainer = document.querySelector('.comments');
  document.querySelector('.comments').innerHTML = '';

  // Loop through the comments and create HTML elements
  comments.forEach((comment) => {
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');

    const userPhotoElement = document.createElement('div');
    userPhotoElement.classList.add('user-photo');
    const photoImg = document.createElement('img');
    photoImg.src = `https://lorempokemon.fakerapi.it/pokemon`; // Use random faces from Unsplash
    photoImg.alt = `User Photo`;
    userPhotoElement.appendChild(photoImg);

    const commentBodyElement = document.createElement('div');
    commentBodyElement.classList.add('comment-body');
    const userNameElement = document.createElement('p');
    userNameElement.classList.add('user-name');
    userNameElement.textContent = comment.userName;
    const commentTextElement = document.createElement('p');
    commentTextElement.classList.add('comment-text');
    commentTextElement.textContent = comment.text;
    commentBodyElement.appendChild(userNameElement);
    commentBodyElement.appendChild(commentTextElement);

    commentElement.appendChild(userPhotoElement);
    commentElement.appendChild(commentBodyElement);

    commentsContainer.appendChild(commentElement);
  });

  // If there are no comments, display a message
  if (comments.length === 0) {
    const noCommentsElement = document.createElement('p');
    noCommentsElement.classList.add('no-comments');
    noCommentsElement.textContent = 'No comments added yet.';
    commentsContainer.appendChild(noCommentsElement);
  }
}
