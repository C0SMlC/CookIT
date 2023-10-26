const express = require('express');

const {
  getRecipe,
  getLandingPage,
  getRecipePage,
  getLoginForm,
} = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.isLoggedIn, getLandingPage);
router.get('/login', getLoginForm);

router.use(authController.protect);

router.get('/recipes/:slug', getRecipePage);
router.get('/recipe/:slug', getRecipe);

module.exports = router;
