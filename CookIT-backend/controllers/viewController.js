const axios = require('axios');
const Like = require('../models/likeModel');
const catchAsync = require('../utils/catchAsync');

const getLandingPage = (req, res) => {
  res.status(200).render('LandingPage', {
    title: 'Home',
  });
};

const getRecipePage = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  const apiUrl = `https://forkify-api.herokuapp.com/api/v2/recipes?search=${slug}&key=${process.env.FORKIFY_API_KEY}`;

  try {
    const response = await axios.get(apiUrl);
    const parsedData = response.data;

    res.status(200).render('recipes', {
      title: 'Search For Recipes',
      countRecipes: parsedData.results,
      recipes: parsedData.data.recipes,
    });
  } catch (error) {
    next(error);
  }
});

const getRecipe = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  const apiUrl = `https://forkify-api.herokuapp.com/api/v2/recipes/${slug}`;

  try {
    const response = await axios.get(apiUrl);
    const parsedData = response.data;

    const likes = await Like.countDocuments({
      recipeId: parsedData.data.recipe.id,
    });

    parsedData.data.recipe[likes] = likes || 0;
    res.status(200).render('recipe', {
      title: parsedData.data.recipe.title,
      recipe: parsedData.data.recipe,
      likes,
    });
  } catch (error) {
    next(error);
  }
});

const getMealPlannerPage = catchAsync(async (req, res, next) => {
  res.status(200).render('mealPlanner', {
    title: 'Meal Planner',
  });
});

const getLoginForm = catchAsync(async (req, res, next) => {
  res.status(200).render('login', {
    title: 'Log In',
  });
});

const getBookmarksPage = async (req, res) => {
  const userId = req.body.uId;

  try {
    const apiUrl = `http://127.0.0.1:3000/bookmark/${userId}`;
    const response = await axios.get(apiUrl);

    console.log(JSON.stringify(response.data.data.bookmarks));

    const bookmarksData = response.data.data.bookmarks;

    res.status(200).render('bookmarks', {
      title: 'Bookmarks',
      bookmarks: bookmarksData,
    });
  } catch (error) {
    console.error('Error fetching bookmarks:', error.message); // Log only the error message
    res.status(500).send('Error fetching bookmarks'); // Send a generic error message to the client
  }
};

module.exports = {
  getLandingPage,
  getBookmarksPage,
  getRecipe,
  getRecipePage,
  getMealPlannerPage,
  getLoginForm,
};
