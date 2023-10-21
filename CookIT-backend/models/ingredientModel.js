const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  recipeName: {
    type: String,
    required: true,
  },
  recipeId: {
    type: String,
    required: true,
  },
  uId: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  ingredientName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
  },
  isShopped: {
    type: Boolean,
    default: false,
  },
});

ingredientSchema.index(
  { uId: 1, ingredientName: 1, recipeName: 1 },
  { unique: true }
);

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;
