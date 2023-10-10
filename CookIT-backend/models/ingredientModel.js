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
  ingredientName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
  },
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;
