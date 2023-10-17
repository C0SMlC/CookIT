/*eslint-disable */
'use strict';

import { addIngredients } from './addIngredients.js';
import { login } from './login.js';

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
  document
    .querySelector('.navigation__search-btn')
    .addEventListener('click', (e) => {
      const inputField = document.getElementById('searchInput');
      const searchTerm = inputField.value.trim();
      if (searchTerm === '') {
        alert('Please enter a search term.');
      } else {
        window.setTimeout(() => {
          location.assign('/app/recipes/' + searchTerm);
        }, 500);
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
