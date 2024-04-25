const express = require('express');

const bookmarkController = require('../controllers/bookmarkController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/:userId').get(bookmarkController.getBookmarks);

router.use(authController.protect);

router.route('/:recipeId').post(bookmarkController.addToBookmark);
router.route('/:recipeId').delete(bookmarkController.deleteBookmark);
router.route('/user/:userId').get(bookmarkController.getUserBookmarks);

module.exports = router;
