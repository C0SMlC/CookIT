const express = require('express');
const mealPlannerController = require('../controllers/mealPlannerController');
const authController = require('../controllers/authController');

const router = express.Router();
router.use(authController.protect);

router.route('/').post(mealPlannerController.addToMealPlanner);
router.route('/:userId').get(mealPlannerController.getMealPlanner);

module.exports = router;
