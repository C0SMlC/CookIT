const express = require('express');

const ingredientController = require('../controller/ingredientController');

const router = express.Router();

router.route('/').post(ingredientController.addIngredient);

module.exports = router;
