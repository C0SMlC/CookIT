const Ingredient = require('../models/ingredientModel');

const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/AppError');

const addIngredient = catchAsync(async (req, res, next) => {
  const newIngredient = await Ingredient.create({
    recipeName: req.body.recipeName,
    recipeId: req.body.recipeId,
    imageUrl: req.body.imageUrl,
    ingredientName: req.body.ingredientName,
    quantity: req.body.quantity,
    uId: req.body.uId,
  });
  res.status(201).json({
    status: 'success',
    data: {
      newIngredient,
    },
  });
});

const deleteIngredient = catchAsync(async (req, res, next) => {
  const { recipeId } = req.body;

  if (!recipeId) {
    return res.status(400).json({
      status: 'fail',
      message: 'Please provide a recipeId to delete ingredients.',
    });
  }

  const result = await Ingredient.deleteMany({ recipeId: recipeId });

  if (result.deletedCount > 0) {
    return res.status(200).json({
      status: 'success',
      message: 'Ingredients deleted successfully.',
    });
  }
  return res.status(404).json({
    status: 'fail',
    message: 'No ingredients found for the provided recipeId.',
  });
});

const getAllIngredients = catchAsync(async (req, res, next) => {
  const ingredients = await Ingredient.find();
  res.status(200).json({
    status: 'success',
    data: {
      ingredients,
    },
  });
});

// Get specific recipe's ingredients based on provided recipeId
const getRecipeIngredients = catchAsync(async (req, res, next) => {
  const recipe = await Ingredient.find({
    recipeId: req.params.recipeId,
  }).select('ingredientName quantity _id');
  res.status(200).json({
    status: 'success',
    data: {
      recipe,
    },
  });
});

// Get all unique recipe names and IDs
const getUniqueRecipes = catchAsync(async (req, res, next) => {
  const recipes = await Ingredient.aggregate([
    {
      $group: {
        _id: {
          recipeId: '$recipeId',
          recipeName: '$recipeName',
          imageUrl: '$imageUrl',
        },
      },
    },
    {
      $project: {
        _id: 0,
        recipeId: '$_id.recipeId',
        recipeName: '$_id.recipeName',
        imageUrl: '$_id.imageUrl',
      },
    },
  ]);
  res.status(200).json(recipes);
});

module.exports = {
  addIngredient,
  deleteIngredient,
  getRecipeIngredients,
  getAllIngredients,
  getUniqueRecipes,
};
