const mongoose = require('mongoose');

const mealPlannerSchema = new mongoose.Schema({
  recipeId: { type: String, required: true },
  recipeName: { type: String, required: true },
  userId: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ['breakfast', 'lunch', 'dinner'],
  },
  date: { type: Date, required: true },
});

const Meal = mongoose.model('Meal', mealPlannerSchema);
module.exports = Meal;
