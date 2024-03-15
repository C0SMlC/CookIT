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

module.exports = {
  getLandingPage,
  getRecipe,
  getRecipePage,
  getMealPlannerPage,
  getLoginForm,
};
