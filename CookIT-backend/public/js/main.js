/*eslint-disable */
'use strict';

document
  .querySelector('.navigation__search-btn')
  .addEventListener('click', (e) => {
    const inputField = document.getElementById('searchInput');
    const searchTerm = inputField.value.trim();
    if (searchTerm === '') {
      alert('Please enter a search term.');
    } else {
      window.setTimeout(() => {
        location.assign('/recipes/' + searchTerm);
      }, 500);
    }
  });

// const parentElement = document.querySelector('.main__container');

// parentElement.addEventListener('click', (event) => {
//   if (event.target.classList.contains('main__content')) {
//     const clickedContainer = event.target;
//     const recipeId = clickedContainer.dataset.recipeId;

//   }
// });

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
        location.assign('/recipe/' + recipeId);
      }, 500);
    }
  });
