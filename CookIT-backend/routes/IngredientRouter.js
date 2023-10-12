const express = require('express');

const ingredientController = require('../controller/ingredientController');

const router = express.Router();

router.route('/').post(ingredientController.addIngredient);

router.route('/').get(ingredientController.getAllIngredients);

router
  .route('/recipe/:recipeId')
  .get(ingredientController.getRecipeIngredients);

router.route('/getUniqueRecipes').get(ingredientController.getUniqueRecipes);

module.exports = router;
