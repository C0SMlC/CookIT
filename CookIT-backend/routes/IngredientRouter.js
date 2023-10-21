// const express = require('express');

// const ingredientController = require('../controller/ingredientController');
// const authController = require('../controller/authController');

// const router = express.Router();
// router.route('/').delete(ingredientController.deleteIngredient);
// router.route('/').get(ingredientController.getAllIngredients);
// router
//   .route('/recipe/:recipeId')
//   .get(ingredientController.getRecipeIngredients);

// router.route('markShopped/:recipeId').post(ingredientController.markAsShopped);

// router.use(authController.protect);

// router.route('/').post(ingredientController.addIngredient);

// router.route('/getUniqueRecipes').get(ingredientController.getUniqueRecipes);

// module.exports = router;

const express = require('express');

const ingredientController = require('../controllers/ingredientController');
const authController = require('../controllers/authController');

const router = express.Router();

// Public routes (no authentication required)
router
  .route('/')
  .get(ingredientController.getAllIngredients) // GET all ingredients
  .post(ingredientController.createIngredient); // POST to create a new ingredient

router
  .route('/recipe/:recipeId')
  .get(ingredientController.getIngredientsByRecipeId); // GET ingredients by recipe ID

router
  .route('/markShopped/:ingredientId')
  .put(ingredientController.markAsShopped); // POST to mark ingredients as shopped

// Protected routes (authentication required)
router.use(authController.protect);

router.route('/getUniqueRecipes').get(ingredientController.getUniqueRecipes); // GET unique recipes
router.route('/').delete(ingredientController.deleteIngredient); // DELETE ingredient by ID

module.exports = router;
