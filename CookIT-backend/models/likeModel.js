const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  recipeId: { type: String, required: true },
  userId: { type: String, required: true },
});

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;
