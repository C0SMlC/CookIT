const Like = require('../models/likeModel');
const catchAsync = require('../utils/catchAsync');

const likeRecipe = catchAsync(async (req, res) => {
  const { recipeId, userId } = req.body;

  const existingLike = await Like.findOne({ recipeId, userId });
  if (existingLike) {
    return res
      .status(400)
      .json({ message: 'You have already liked this recipe' });
  }
  const newLike = new Like({ recipeId, userId });
  await newLike.save();
  res.status(200).json({ message: 'Recipe liked successfully' });
});

// Route for unliking a recipe
const deleteLike = catchAsync(async (req, res) => {
  const { recipeId, userId } = req.body;

  const deletedLike = await Like.findOneAndDelete({ recipeId, userId });
  if (!deletedLike) {
    return res.status(400).json({ message: 'You have not liked this recipe' });
  }
  res.status(200).json({ message: 'Recipe unliked successfully' });
});

module.exports = { likeRecipe, deleteLike };
