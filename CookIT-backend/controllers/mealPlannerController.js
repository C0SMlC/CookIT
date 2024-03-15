const MealPlanner = require('../models/mealPlannerModel');
const catchAsync = require('../utils/catchAsync');

const addToMealPlanner = catchAsync(async (req, res) => {
  const { recipeId, recipeName, userId, type, date } = req.body;
  if (!recipeId || !recipeName || !userId || !type || !date) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const newMeal = await MealPlanner.create({
    recipeId,
    recipeName,
    userId,
    type,
    date,
  });
  res.status(200).json({
    message: 'Recipe added to meal planner successfully',
    data: newMeal,
  });
});

const getMealPlanner = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const mealPlanner = await MealPlanner.find({
    userId: userId,
  });

  res.status(200).json({
    message: 'Meal planner retrieved successfully',
    data: mealPlanner,
  });
});

module.exports = { addToMealPlanner, getMealPlanner };
