const express = require('express');

const {
  getRecipe,
  getLandingPage,
  getMealPlannerPage,
  getRecipePage,
  getLoginForm,
  getBookmarksPage,
  // getCategorieWiseRecipes,
} = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/mealPlanner', authController.isLoggedIn, getMealPlannerPage);
router.get('/bookmarks', authController.isLoggedIn, getBookmarksPage);
router.get('/', authController.isLoggedIn, getLandingPage);
router.get('/login', getLoginForm);

router.use(authController.protect);

// router.get('/categories/recipes/:slug', getCategorieWiseRecipes);
router.get('/recipes/:slug', getRecipePage);
router.get('/recipe/:slug', getRecipe);

module.exports = router;
