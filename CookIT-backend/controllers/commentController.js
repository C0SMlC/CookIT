const Comment = require('../models/commentsModel');

const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/AppError');

const createComment = catchAsync(async (req, res, next) => {
  const newComment = await Comment.create({
    text: req.body.commentText,
    recipeId: req.body.recipeId,
    userId: req.body.userId,
  });
  res.status(201).json({
    status: 'success',
    data: {
      newComment,
    },
  });
});

// const deleteIngredient = catchAsync(async (req, res, next) => {
//   const { recipeId } = req.body;

//   if (!recipeId) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Please provide a recipeId to delete ingredients.',
//     });
//   }

//   const result = await Ingredient.deleteMany({ recipeId: recipeId });

//   if (result.deletedCount > 0) {
//     return res.status(200).json({
//       status: 'success',
//       message: 'Ingredients deleted successfully.',
//     });
//   }
//   return res.status(404).json({
//     status: 'fail',
//     message: 'No ingredients found for the provided recipeId.',
//   });
// });

// const getAllIngredients = catchAsync(async (req, res, next) => {
//   const ingredients = await Ingredient.find();
//   res.status(200).json({
//     status: 'success',
//     data: {
//       ingredients,
//     },
//   });
// });

// Get specific recipe's ingredients based on provided recipeId
const getCommentsByRecipeId = catchAsync(async (req, res, next) => {
  const comments = await Comment.find({
    recipeId: req.params.recipeId,
  });

  res.locals.comments = comments;

  res.status(200).json({
    status: 'success',
    data: {
      comments,
    },
  });
});

module.exports = {
  createComment,
  //   deleteIngredient,
  getCommentsByRecipeId,
  //   getAllIngredients,
};
