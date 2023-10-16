const express = require('express');

const {
  getRecipe,
  getLandingPage,
  getRecipePage,
  getLoginForm,
} = require('../controller/viewController');
const authController = require('../controller/authController');

const router = express.Router();

router.get('/', getLandingPage);
router.get('/login', getLoginForm);

router.use(authController.protect);

router.get('/recipes/:slug', getRecipePage);
router.get('/recipe/:slug', getRecipe);

module.exports = router;
