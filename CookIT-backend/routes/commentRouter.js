const express = require('express');

const commentController = require('../controllers/commentController');
const authController = require('../controllers/authController');

const router = express.Router();

// Public routes (no authentication required)
router.use(authController.protect);

router.route('/recipe/:recipeId').get(commentController.getCommentsByRecipeId); // GET all ingredients
router.route('/recipe/:recipeId').post(commentController.createComment); // POST to create a new ingredient

// Protected routes (authentication required)

module.exports = router;
