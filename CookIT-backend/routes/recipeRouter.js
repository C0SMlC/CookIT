const express = require('express');

const likeController = require('../controllers/likeController');

const router = express.Router();

// Public routes (no authentication required)
router.route('/like/:recipeId').post(likeController.likeRecipe);
router.route('/unlike/:recipeId').post(likeController.deleteLike);

module.exports = router;
