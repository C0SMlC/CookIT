const express = require('express');

const ingredientController = require('../controller/ingredientController');
const authController = require('../controller/authController');

const router = express.Router();
router.route('/').delete(ingredientController.deleteIngredient);
router.route('/').get(ingredientController.getAllIngredients);
router
  .route('/recipe/:recipeId')
  .get(ingredientController.getRecipeIngredients);

router.use(authController.protect);

router.route('/').post(ingredientController.addIngredient);

router.route('/getUniqueRecipes').get(ingredientController.getUniqueRecipes);

module.exports = router;
