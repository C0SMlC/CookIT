const express = require('express');

const {
  getRecipe,
  getLandingPage,
  getRecipePage,
} = require('../controller/viewController');

const router = express.Router();

router.get('/', getLandingPage);
router.get('/recipes/:slug', getRecipePage);
router.get('/recipe/:slug', getRecipe);

module.exports = router;
