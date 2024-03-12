/*eslint-disable */
'use strict';

import { addIngredients } from './addIngredients.js';
import { login, logout } from './login.js';
import { addComment, loadComments } from './comment.js';

// window.addEventListener('load', () => {
//   const ingredientButton = document.querySelector('.recipe__ingredient-btn');

//   if (!ingredientButton) {
//     console.error('Button not found.');
//     return;
//   }

//   const isInShoppingList = localStorage.getItem('recipeInShoppingList');

//   if (isInShoppingList === 'true') {
//     ingredientButton.textContent = 'Already in Shopping List';
//     ingredientButton.classList.add('disabled');
//     ingredientButton.disabled = true;
//   }
// });

if (document.querySelector('.form--login')) {
  const loginBtn = document
    .querySelector('.form--login')
    .addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;
      login(email, password);
    });
}

if (document.querySelector('.navigation__search-btn')) {
  const searchButton = document.querySelector('.navigation__search-btn');
  const inputField = document.getElementById('searchInput');

  // Function to handle the search action
  const performSearch = () => {
    const searchTerm = inputField.value.trim();
    if (searchTerm === '') {
      alert('Please enter a search term.');
    } else {
      window.setTimeout(() => {
        location.assign('/app/recipes/' + searchTerm);
      }, 500);
    }
  };

  // Add a click event listener to the search button
  searchButton.addEventListener('click', (e) => {
    performSearch();
  });

  // Add a keydown event listener to the input field to handle Enter key press
  inputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  });
}

if (document.querySelector('.main__container')) {
  document
    .querySelector('.main__container')
    .addEventListener('click', function (e) {
      let mainContent;
      if (e.target.classList.contains('main__content')) {
        mainContent = e.target;
      } else if (e.target.parentElement.classList.contains('main__content')) {
        mainContent = e.target.parentElement;
      }
      if (mainContent) {
        const recipeId = mainContent.dataset.recipeId;
        window.setTimeout(() => {
          location.assign('/app/recipe/' + recipeId);
        }, 500);
      }
    });
}

if (document.querySelector('.recipe__ingredient-btn'))
  document
    .querySelector('.recipe__ingredient-btn')
    .addEventListener('click', () => {
      document.querySelector('.recipe__ingredient-btn').textContent =
        'processing...';
      const recipe = JSON.parse(
        document.querySelector('.recipe').dataset.recipe
      );
      addIngredients(recipe);
    });

if (document.querySelector('.logout')) {
  document.querySelector('.logout').addEventListener('click', logout);
}

if (document.querySelector('#uploadRecipeButton')) {
  document
    .querySelector('#uploadRecipeButton')
    .addEventListener('click', () => {
      alert('The functionality is not yet implemented.');
    });
}

document.addEventListener('DOMContentLoaded', function () {
  const searchButton = document.getElementById('searchButton');
  const searchInput = document.getElementById('searchInput');

  searchButton.addEventListener('click', function () {
    searchInput.focus();
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const heart = document.querySelector('.like-image');

  heart.addEventListener('click', () => {
    console.log(heart.src.split('/').pop());
    // set the opacity to zero
    heart.style.opacity = 0;

    heart.src =
      `/img/heart/${heart.src.split('/').pop()}` ===
      '/img/heart/heart-empty.png'
        ? '/img/heart/heart-filled.png'
        : '/img/heart/heart-empty.png';

    // set the opacity back to 1
    setTimeout(() => {
      heart.style.opacity = 1;
    }, 500);
  });
});

document.querySelector('.btn-add-comment').addEventListener('click', (e) => {
  e.preventDefault();
  let commentText = document.querySelector('.form-text-input').value;
  if (commentText === '') {
    alert('Please enter a comment.');
  }
  const recipe = JSON.parse(document.querySelector('.recipe').dataset.recipe);
  console.log(recipe, commentText);
  addComment(recipe, commentText);
  loadComments(recipe.id);
});

document.querySelector('.load-comments-btn').addEventListener('click', (e) => {
  e.preventDefault();
  const recipe = JSON.parse(document.querySelector('.recipe').dataset.recipe);
  loadComments(recipe.id);
});
