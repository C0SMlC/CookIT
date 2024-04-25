const mongoose = require('mongoose');
const Bookmark = require('../models/bookmarkModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

const addToBookmark = catchAsync(async (req, res) => {
  const { recipeId } = req.params;
  const { url, title, userId } = req.body;

  // const parsedUserId = new mongoose.Types.ObjectId(userId);

  if (!url || !userId) {
    return res.status(400).json({ message: 'URL and user ID are required' });
  }

  const existingBookmark = await Bookmark.findOne({ url, userId });

  if (existingBookmark) {
    await Bookmark.findByIdAndDelete(existingBookmark._id);
    return res.status(200).json({
      message: 'Bookmark removed from your bookmarks',
      data: existingBookmark,
    });
  }

  const newBookmark = await Bookmark.create({
    url,
    title,
    userId,
    recipeId,
  });

  res.status(201).json({
    message: 'Recipe added to your bookmarks successfully',
    data: newBookmark,
  });
});

const deleteBookmark = catchAsync(async (req, res, next) => {
  const { recipeId } = req.params;
  const { userId } = req.body;

  if (!recipeId || !userId) {
    return next(new AppError('Please provide both the URL and user ID', 400));
  }

  const bookmark = await Bookmark.findOne({ recipeId, userId });
  if (!bookmark) {
    return next(
      new AppError('Bookmark not found or does not belong to you', 404)
    );
  }
  await bookmark.remove();

  res.status(200).json({
    status: 'success',
    message: 'Bookmark deleted successfully',
  });
});

const getUserBookmarks = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  if (!userId) {
    return next(new AppError('Please provide the user ID', 400));
  }

  const bookmarks = await Bookmark.find({ userId });

  const bookmarkRecipeId = bookmarks.map((bookmark) => bookmark.recipeId);

  res.status(200).json({
    status: 'success',
    data: { bookmarkRecipeId },
  });
});

const getBookmarks = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  if (!userId) {
    return next(new AppError('Please provide the user ID', 400));
  }

  const bookmarks = await Bookmark.find({ userId });

  console.log(JSON.stringify(bookmarks));

  res.status(200).json({
    status: 'success',
    data: { bookmarks },
  });
});

module.exports = {
  addToBookmark,
  deleteBookmark,
  getUserBookmarks,
  getBookmarks,
};
