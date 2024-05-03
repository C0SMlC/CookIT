/*eslint-disable */
'use strict';

// import flatpickr from 'flatpickr';
import { addIngredients } from './addIngredients.js';
import { addToMealPlanner, getMealPlanner } from './addToMealPlanner.js';
import { login, logout } from './login.js';
import { addComment, loadComments } from './comment.js';
import { generateAIResponse, sendMessage } from './ai.js';
import { addBookmark, getUserBookmarks } from './addBookmark.js';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css'; // Import Flatpickr CSS

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
  const searchButton = document.querySelector('.navigation__search-btn');
  const searchInput = document.getElementById('searchInput');

  searchButton.addEventListener('click', function () {
    searchInput.focus();
  });
});

if (document.querySelector('#searchButton'))
  document
    .getElementById('searchButton')
    .addEventListener('click', function () {
      const searchInput = document.getElementById('searchInput');
      searchInput.focus();
    });

document.addEventListener('DOMContentLoaded', () => {
  const heart = document.querySelector('.like-image');
  const likeCount = document.querySelector('.like-count');

  if (!heart) {
    return;
  }

  heart.addEventListener('click', () => {
    const recipe = JSON.parse(document.querySelector('.recipe').dataset.recipe);
    const userId = localStorage.getItem('uid');

    fetch(`/recipe/like/${recipe.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, recipeId: recipe.id }),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) likeCount.textContent = +likeCount.textContent + 1;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
});

if (document.querySelector('.btn-add-comment'))
  document.querySelector('.btn-add-comment').addEventListener('click', (e) => {
    e.preventDefault();
    let commentText = document.querySelector('.form-text-input').value;
    if (commentText === '') {
      alert('Please enter a comment.');
    }
    const recipe = JSON.parse(document.querySelector('.recipe').dataset.recipe);
    addComment(recipe, commentText);
    loadComments(recipe.id);
  });

if (document.querySelector('.recipe__comments')) {
  const recipe = JSON.parse(document.querySelector('.recipe').dataset.recipe);
  loadComments(recipe.id);
}

const mealPlannerBtn = document.querySelector('.navigation__mealplanner-btn');

function renderCalendar() {
  const calendarGrid = document.querySelector('.calendar-grid');
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  daysOfWeek.forEach((day) => {
    const dayContainer = document.createElement('div');
    dayContainer.classList.add('day');

    const dayHeading = document.createElement('h3');
    dayHeading.textContent = day;
    dayContainer.appendChild(dayHeading);

    const breakfast = document.createElement('div');
    breakfast.classList.add('meal');
    const breakfastIcon = document.createElement('i');
    breakfastIcon.classList.add('fas', 'fa-utensils');
    const breakfastSpan = document.createElement('span');
    breakfastSpan.textContent = 'Breakfast';
    breakfast.appendChild(breakfastIcon);
    breakfast.appendChild(breakfastSpan);
    dayContainer.appendChild(breakfast);

    const lunch = document.createElement('div');
    lunch.classList.add('meal');
    const lunchIcon = document.createElement('i');
    lunchIcon.classList.add('fas', 'fa-utensils');
    const lunchSpan = document.createElement('span');
    lunchSpan.textContent = 'Lunch';
    lunch.appendChild(lunchIcon);
    lunch.appendChild(lunchSpan);
    dayContainer.appendChild(lunch);

    const dinner = document.createElement('div');
    dinner.classList.add('meal');
    const dinnerIcon = document.createElement('i');
    dinnerIcon.classList.add('fas', 'fa-utensils');
    const dinnerSpan = document.createElement('span');
    dinnerSpan.textContent = 'Dinner';
    dinner.appendChild(dinnerIcon);
    dinner.appendChild(dinnerSpan);
    dayContainer.appendChild(dinner);

    const dayMeal = meals.find((meal) => meal.day === day);
    if (dayMeal) {
      breakfast.innerHTML += `<span>${dayMeal.breakfast || ''}</span>`;
      lunch.innerHTML += `<span>${dayMeal.lunch || ''}</span>`;
      dinner.innerHTML += `<span>${dayMeal.dinner || ''}</span>`;
    } else {
      const noRecipes = document.createElement('div');
      noRecipes.classList.add('no-recipes');
      noRecipes.textContent = 'No recipes added for this day';
      dayContainer.appendChild(noRecipes);
    }

    calendarGrid.appendChild(dayContainer);
  });
}

document.addEventListener('DOMContentLoaded', async (e) => {
  const calendarPlaceholder = document.querySelector('.placeholder');
  if (!calendarPlaceholder) {
    return;
  }

  console.log();
  const { data } = await getMealPlanner();

  // e.preventDefault();
  const eventDates = [];

  data.forEach((meal) => {
    const eventInfo = {};
    const date = formatDate(new Date(meal.date));

    eventInfo.info = `${meal.recipeName}, ${meal.type}`;
    eventInfo.date = date;
    eventDates.push(eventInfo);
  });

  // let day1 = formatDate(
  //   new Date(new Date().setMonth(new Date().getMonth() + 1))
  // );

  // eventDates[day1] = ['Event 1, Location', 'Event 2, Location 2'];

  // let day2 = formatDate(
  //   new Date(new Date().setDate(new Date().getDate() + 40))
  // );

  // eventDates[day2] = ['Event 2, Location 3'];

  // set maxDates
  const maxDate = {
    1: new Date(new Date().setMonth(new Date().getMonth() + 11)),
    2: new Date(new Date().setMonth(new Date().getMonth() + 10)),
    3: new Date(new Date().setMonth(new Date().getMonth() + 9)),
  };

  const flatpickr = calendarPlaceholder.flatpickr({
    inline: true,
    minDate: 'today',
    maxDate: maxDate[3],
    showMonths: 1,
    enable: eventDates.map((event) => event.date),
    disableMobile: 'true',
    onChange: (date, str, inst) => {
      let contents = '';
      if (date.length) {
        for (let i = 0; i < eventDates.length; i++) {
          if (formatDateInnerDate(date) === eventDates[i].date)
            contents += `<div class="event"><div class="date">${eventDates[i].date}</div><div class="location">${eventDates[i].info}</div></div>`;
        }
      }
      const calendarEvents = document.querySelector(
        '#calendar .calendar-events'
      );
      calendarEvents.innerHTML = contents;
    },
    locale: {
      weekdays: {
        shorthand: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        longhand: [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
      },
    },
  });

  eventCaledarResize(window);

  window.addEventListener('resize', () => {
    eventCaledarResize(window);
  });

  function eventCaledarResize(el) {
    const width = el.innerWidth;
    if (flatpickr.selectedDates.length) {
      flatpickr.clear();
    }

    if (width >= 992 && flatpickr.config.showMonths !== 3) {
      flatpickr.set('showMonths', 3);
      flatpickr.set('maxDate', maxDate[3]);
    }

    if (width < 992 && width >= 768 && flatpickr.config.showMonths !== 2) {
      flatpickr.set('showMonths', 2);
      flatpickr.set('maxDate', maxDate[2]);
    }

    if (width < 768 && flatpickr.config.showMonths !== 1) {
      flatpickr.set('showMonths', 1);
      flatpickr.set('maxDate', maxDate[1]);
      const flatpickrCalendar = document.querySelector('.flatpickr-calendar');
      flatpickrCalendar.style.width = '';
    }
  }

  function formatDate(date) {
    let d = date.getDate();
    let m = date.getMonth() + 1; // Month from 0 to 11
    let y = date.getFullYear();
    return `${y}-${m <= 9 ? '0' + m : m}-${d <= 9 ? '0' + d : d}`;
  }

  function formatDateInnerDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because month is 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
});

document.addEventListener('DOMContentLoaded', function () {
  if (!document.querySelector('.btn-add-to-meal')) {
    return;
  }

  const modalOverlay = document.querySelector('.modal-overlay');
  const openModalBtn = document.querySelector('.btn-add-to-meal');
  const container = document.querySelector('.container');

  openModalBtn.addEventListener('click', () => {
    container.style.display = 'block';
    container.classList.add('modal-overlay');
  });

  container.addEventListener('click', (event) => {
    if (!event.target.closest('.card')) {
      container.style.display = 'none';
      container.classList.remove('modal-overlay');
    }
  });
});

if (document.querySelector('.btn-add-meal-db')) {
  const recipe = JSON.parse(document.querySelector('.recipe').dataset.recipe);

  document
    .querySelector('.btn-add-meal-db')
    .addEventListener('click', () => addToMealPlanner(recipe));
}

//chatbot

if (document.getElementById('send-button')) {
  document.getElementById('send-button').addEventListener('click', sendMessage);

  document.getElementById('chat-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
}
//open chatbot

if (document.querySelector('#chatbot-button')) {
  document.querySelector('#chatbot-button').addEventListener('click', () => {
    document.querySelector('#chatbot').style.display = 'block';
    document.querySelector('#chatbot-button').style.display = 'none';
    // document.querySelector('#close-chatbot').style.display = 'block';
  });
}

if (document.querySelector('.chatbot__close-btn')) {
  document
    .querySelector('.chatbot__close-btn')
    .addEventListener('click', () => {
      document.querySelector('#chatbot').style.display = 0;
      document.querySelector('#chatbot').style.display = 'none';
      document.querySelector('#chatbot-button').style.display = 'block';
    });
}

if (document.querySelector('.recipe__bookmark-btn')) {
  const recipe = JSON.parse(document.querySelector('.recipe').dataset.recipe);
  const { bookmarkRecipeId } = (await getUserBookmarks()).data;

  console.log(bookmarkRecipeId);

  if (bookmarkRecipeId.includes(recipe.id))
    document.querySelector('.recipe__bookmark-btn').textContent =
      'Bookmarked 👍';

  document
    .querySelector('.recipe__bookmark-btn')
    .addEventListener('click', () => {
      addBookmark(recipe);
    });
}

// document
//   .querySelector('.navigation__mealplanner-btn')
//   .addEventListener('click', (e) => {
//     // Get elements
//     const calendarGrid = document.querySelector('.calendar-grid');

//     // Sample meal data (replace with your own data)
//     const meals = [
//       {
//         day: 'Monday',
//         breakfast: 'Oatmeal with Berries',
//         lunch: 'Grilled Chicken Salad',
//         dinner: 'Vegetable Stir-fry',
//       },
//       {
//         day: 'Tuesday',
//         breakfast: 'Scrambled Eggs',
//         lunch: 'Quinoa and Black Bean Salad',
//         dinner: 'Baked Salmon with Asparagus',
//       },
//       // Add more meal data here
//     ];

//     const daysOfWeek = [
//       'Sunday',
//       'Monday',
//       'Tuesday',
//       'Wednesday',
//       'Thursday',
//       'Friday',
//       'Saturday',
//     ];

//     console.log('Herereereer');

//     daysOfWeek.forEach((day) => {
//       const dayContainer = document.createElement('div');
//       dayContainer.classList.add('day');

//       const dayHeading = document.createElement('h3');
//       dayHeading.textContent = day;
//       dayContainer.appendChild(dayHeading);

//       const breakfast = document.createElement('div');
//       breakfast.classList.add('meal');
//       const breakfastIcon = document.createElement('i');
//       breakfastIcon.classList.add('fas', 'fa-utensils');
//       const breakfastSpan = document.createElement('span');
//       breakfastSpan.textContent = 'Breakfast';
//       breakfast.appendChild(breakfastIcon);
//       breakfast.appendChild(breakfastSpan);
//       dayContainer.appendChild(breakfast);

//       const lunch = document.createElement('div');
//       lunch.classList.add('meal');
//       const lunchIcon = document.createElement('i');
//       lunchIcon.classList.add('fas', 'fa-utensils');
//       const lunchSpan = document.createElement('span');
//       lunchSpan.textContent = 'Lunch';
//       lunch.appendChild(lunchIcon);
//       lunch.appendChild(lunchSpan);
//       dayContainer.appendChild(lunch);

//       const dinner = document.createElement('div');
//       dinner.classList.add('meal');
//       const dinnerIcon = document.createElement('i');
//       dinnerIcon.classList.add('fas', 'fa-utensils');
//       const dinnerSpan = document.createElement('span');
//       dinnerSpan.textContent = 'Dinner';
//       dinner.appendChild(dinnerIcon);
//       dinner.appendChild(dinnerSpan);
//       dayContainer.appendChild(dinner);

//       const dayMeal = meals.find((meal) => meal.day === day);
//       if (dayMeal) {
//         breakfast.innerHTML += `<span>${dayMeal.breakfast || ''}</span>`;
//         lunch.innerHTML += `<span>${dayMeal.lunch || ''}</span>`;
//         dinner.innerHTML += `<span>${dayMeal.dinner || ''}</span>`;
//       } else {
//         const noRecipes = document.createElement('div');
//         noRecipes.classList.add('no-recipes');
//         noRecipes.textContent = 'No recipes added for this day';
//         dayContainer.appendChild(noRecipes);
//       }

//       calendarGrid.appendChild(dayContainer);
//     });

//     console.log('Doneeeeee');
//   });
