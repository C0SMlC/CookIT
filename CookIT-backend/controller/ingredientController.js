const Ingredient = require('../models/ingredientModel');

const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/AppError');

const addIngredient = catchAsync(async (req, res, next) => {
  const newIngredient = await Ingredient.create({
    recipeName: req.body.recipeName,
    recipeId: req.body.recipeId,
    ingredientName: req.body.ingredientName,
    quantity: req.body.quantity,
  });
  res.status(201).json({
    status: 'success',
    data: {
      newIngredient,
    },
  });
});

module.exports = {
  addIngredient,
};
